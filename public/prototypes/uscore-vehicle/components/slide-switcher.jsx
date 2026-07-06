// Mode-swap transitions used by the house ↔ vehicle tab switch.
//
// Two components:
//
//   SlideSwitcher  — horizontal slide. Used on mobile, where house and car
//                    share the same phone-screen height. Outgoing slides
//                    one way, incoming slides in from the other.
//
//   ModeCrossFade  — height-aware crossfade. Used on desktop, where house
//                    and car shells have very different heights. Tweens
//                    the wrapper height while the two panes fade.
//
// IMPORTANT: previews run in throttled iframes — setTimeout and rAF can
// stall for hundreds of ms, which is why the earlier imperative
// `node.style.transform = ...` inside a setTimeout never animated.
// We use CSS @keyframes animations (and the Web Animations API for
// height) instead: those run on the compositor and are unaffected by
// JS throttling.

const { useState: useMSState, useEffect: useMSEffect, useRef: useMSRef, useLayoutEffect: useMSLayout } = React;

// Inject keyframes once into the document head.
(function injectKeyframes() {
  if (document.getElementById('__modeswap-keyframes')) return;
  const css = `
    @keyframes __ms_slide_in_right  { from { transform: translate3d(100%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
    @keyframes __ms_slide_in_left   { from { transform: translate3d(-100%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
    @keyframes __ms_slide_out_left  { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(-100%, 0, 0); } }
    @keyframes __ms_slide_out_right { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(100%, 0, 0); } }
    @keyframes __ms_fade_in         { from { opacity: 0; } to { opacity: 1; } }
    @keyframes __ms_fade_out        { from { opacity: 1; } to { opacity: 0; } }
  `;
  const s = document.createElement('style');
  s.id = '__modeswap-keyframes';
  s.textContent = css;
  document.head.appendChild(s);
})();

// ─── SlideSwitcher (mobile) ───────────────────────────────────────────
//
// Renders one pane in idle, two stacked absolute panes during transition.
// CSS keyframe animations on each pane drive the slide — robust to JS
// throttling. The cleanup timeout is the only JS-timed event, and it's
// purely a safety net (animation `forwards` fill keeps the visual state
// even if the cleanup fires late).
//
// Props:
//   trackKey   — string; changing this triggers the slide
//   direction  — 'left'  = outgoing exits left  (new enters from right)
//                'right' = outgoing exits right (new enters from left)
//   duration   — ms, default 380
//   fill       — if true, wrapper takes flex:1 / minHeight:0 to live inside
//                a column flex parent (the mobile phone-screen content)

function SlideSwitcher({ trackKey, direction = 'left', duration = 380, children, className, style, fill = false }) {
  const [pair, setPair] = useMSState(() => ({
    cur:  { k: trackKey, n: children },
    prev: null,
    dir:  direction,
  }));

  const ease = 'cubic-bezier(0.32, 0.72, 0, 1)';
  const animatingRef = useMSRef(false);

  // Keep current node in sync when only `children` changes (not the key).
  useMSEffect(() => {
    if (!pair.prev && pair.cur.k === trackKey && pair.cur.n !== children) {
      setPair(p => ({ ...p, cur: { k: trackKey, n: children } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // Trigger transition when trackKey changes.
  useMSEffect(() => {
    if (trackKey === pair.cur.k) return;
    animatingRef.current = true;
    setPair(p => ({
      cur:  { k: trackKey, n: children },
      prev: p.cur,
      dir:  direction,
    }));
    // Safety-net cleanup: drop prev once the animation should be done.
    // CSS `fill-mode: forwards` keeps the final visual state intact even
    // if this timer is delayed by throttling.
    const t = setTimeout(() => {
      animatingRef.current = false;
      setPair(p => ({ ...p, prev: null }));
    }, duration + 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackKey]);

  const isLeft = pair.dir === 'left';

  const outerStyle = {
    position: 'relative',
    overflow: 'hidden',
    ...(fill ? { display: 'flex', flex: 1, minHeight: 0 } : {}),
    ...style,
  };

  // Idle: single pane filling the outer.
  if (!pair.prev) {
    const paneStyle = fill
      ? { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }
      : { width: '100%' };
    return (
      <div className={className} style={outerStyle}>
        <div style={paneStyle}>{pair.cur.n}</div>
      </div>
    );
  }

  // Active transition: two stacked absolute panes, each driven by a CSS
  // keyframe animation. forwards fill keeps the end state pinned.
  const prevAnim = isLeft ? '__ms_slide_out_left' : '__ms_slide_out_right';
  const curAnim  = isLeft ? '__ms_slide_in_right' : '__ms_slide_in_left';

  const paneBase = {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column', minHeight: 0,
    willChange: 'transform',
    animationDuration: `${duration}ms`,
    animationTimingFunction: ease,
    animationFillMode: 'forwards',
    animationIterationCount: 1,
  };

  return (
    <div className={className} style={outerStyle}>
      <div style={{ ...paneBase, animationName: prevAnim }}>
        {pair.prev.n}
      </div>
      <div style={{ ...paneBase, animationName: curAnim }}>
        {pair.cur.n}
      </div>
    </div>
  );
}

// ─── ModeCrossFade (desktop) ──────────────────────────────────────────
//
// Crossfades between two panes whose heights differ, tweening the
// wrapper height so the surrounding layout (FitToWidth) doesn't snap.
// Uses Web Animations API for height — runs reliably under throttling.
//
// Props:
//   keyId    — change triggers swap
//   duration — ms, default 340
//   children — current content

function ModeCrossFade({ keyId, duration = 340, children, style }) {
  const [pair, setPair] = useMSState(() => ({
    cur:  { k: keyId, n: children },
    prev: null,
  }));

  const wrapperRef = useMSRef(null);
  const curRef  = useMSRef(null);
  const prevRef = useMSRef(null);
  const animRef = useMSRef(null);
  const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';

  // Keep current node in sync when only `children` changes.
  useMSEffect(() => {
    if (!pair.prev && pair.cur.k === keyId && pair.cur.n !== children) {
      setPair(p => ({ ...p, cur: { k: keyId, n: children } }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // Trigger transition when keyId changes.
  useMSEffect(() => {
    if (keyId === pair.cur.k) return;
    setPair(p => ({
      cur:  { k: keyId, n: children },
      prev: p.cur,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyId]);

  // After the transition layout renders (prev + cur both mounted), kick
  // off a height animation on the wrapper. The fade itself is driven by
  // CSS keyframes on each pane.
  useMSLayout(() => {
    if (!pair.prev) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Measure both panes BEFORE setting wrapper height. The prev pane is
    // absolutely positioned (so doesn't push wrapper height); the cur
    // pane is in flow.
    const prevH = prevRef.current?.getBoundingClientRect().height || 0;
    const curH  = curRef.current?.getBoundingClientRect().height || 0;
    const startH = prevH || curH;
    const endH   = curH || prevH;

    // Cancel any in-flight animation.
    if (animRef.current) {
      try { animRef.current.cancel(); } catch (e) {}
      animRef.current = null;
    }

    // Pin wrapper height inline so it doesn't depend on flow.
    wrapper.style.height = `${startH}px`;

    if (startH !== endH && typeof wrapper.animate === 'function') {
      const anim = wrapper.animate(
        [{ height: `${startH}px` }, { height: `${endH}px` }],
        { duration, easing: ease, fill: 'forwards' },
      );
      animRef.current = anim;
      anim.onfinish = () => {
        animRef.current = null;
      };
    }

    // Safety-net: after duration, release height and drop prev.
    const t = setTimeout(() => {
      // Release height to auto so wrapper resizes naturally with cur.
      if (wrapperRef.current) wrapperRef.current.style.height = '';
      if (animRef.current) {
        try { animRef.current.cancel(); } catch (e) {}
        animRef.current = null;
      }
      setPair(p => ({ ...p, prev: null }));
    }, duration + 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair.prev?.k, pair.cur.k]);

  // Idle: render current children directly.
  if (!pair.prev) {
    return <div style={style}>{children}</div>;
  }

  const paneAnimBase = {
    animationDuration: `${duration}ms`,
    animationTimingFunction: ease,
    animationFillMode: 'forwards',
    animationIterationCount: 1,
  };

  return (
    <div ref={wrapperRef} style={{
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* prev — absolute so it doesn't drive wrapper height */}
      <div ref={prevRef} style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        pointerEvents: 'none',
        ...paneAnimBase,
        animationName: '__ms_fade_out',
      }}>
        {pair.prev.n}
      </div>
      {/* cur — in flow so it can be measured; opacity fades in via keyframes */}
      <div ref={curRef} style={{
        opacity: 0,
        ...paneAnimBase,
        animationName: '__ms_fade_in',
      }}>
        {pair.cur.n}
      </div>
    </div>
  );
}

Object.assign(window, { SlideSwitcher, ModeCrossFade });
