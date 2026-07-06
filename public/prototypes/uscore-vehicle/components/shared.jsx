// Shared components for both house-screen variations
// Expects PROPERTIES, CHART_DATA, Icon on window

// ─── Top app tab bar (sticky in scroll area) ──────────────────────────
function AppTabBar({ active = 'Home', onChange, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const tabs = [
    { id: 'Overview', label: tr('tabOverview', lang) },
    { id: 'Home',     label: tr('tabHome', lang) },
    { id: 'Vehicle',  label: tr('tabVehicle', lang) },
    { id: 'Debt',     label: tr('tabDebt', lang) },
    { id: 'Income',   label: tr('tabIncome', lang) },
  ];
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border-subtle)',
      boxShadow: '0 2px 8px rgba(30,37,47,0.06)',
      padding: '0 4px',
      display: 'flex',
    }}>
      {tabs.map(({ id, label }) => {
        const isActive = id === active;
        const c = isActive ? 'var(--color-info)' : 'var(--color-body-muted)';
        const clickable = false;
        return (
          <button
            key={id}
            onClick={() => clickable && onChange && onChange(id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '12px 2px 0', position: 'relative',
              background: 'transparent', border: 0,
              cursor: clickable ? 'pointer' : 'default',
              fontFamily: 'inherit',
            }}>
            <div style={{
              fontSize: 12.5, color: c, fontWeight: isActive ? 600 : 500,
              marginBottom: 9, letterSpacing: 0.1,
            }}>{label}</div>
            <div style={{
              height: 2.5, width: '100%', borderRadius: 2,
              background: isActive ? 'var(--color-action)' : 'transparent',
            }} />
          </button>
        );
      })}
    </div>
  );
}

// ─── Property tabs (horizontal scroll, NOT sticky) ────────────────────
function PropertyTabs({ properties, activeId, onSelect, compact = false }) {
  return (
    <div style={{
      display: 'flex', gap: 0, overflowX: 'auto', padding: '0 16px',
      borderBottom: '1px solid var(--color-border-subtle)',
      scrollbarWidth: 'none',
    }}>
      {properties.map(p => {
        const isActive = p.id === activeId;
        return (
          <button key={p.id} onClick={() => onSelect(p.id)} style={{
            padding: compact ? '10px 16px 11px' : '12px 18px 13px',
            minWidth: 'fit-content',
            borderBottom: isActive ? '2px solid var(--color-action)' : '2px solid transparent',
            marginBottom: -1,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: 14, fontWeight: 600,
              color: isActive ? 'var(--color-info)' : 'var(--color-body)',
              whiteSpace: 'nowrap',
            }}>{p.street}</div>
            <div style={{ fontSize: 11, color: 'var(--color-body-muted)', whiteSpace: 'nowrap' }}>
              {p.postal} {p.city}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Sparkline chart with time-range tabs ─────────────────────────────
function Sparkline({ range, onRange, size = 'mobile', data: dataProp, tint }) {
  const source = dataProp || CHART_DATA;
  const data = source[range] || source['5 mo'];
  const isDesktop = size === 'desktop';
  // Larger viewBox on desktop keeps text+stroke sizing visually consistent
  // when the SVG scales to fill a ~760px wide container.
  const W = isDesktop ? 760 : 326;
  const H = isDesktop ? 260 : 160;
  const padL = isDesktop ? 36 : 28;
  const padR = isDesktop ? 8 : 4;
  const padT = isDesktop ? 10 : 6;
  const padB = isDesktop ? 26 : 20;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const fsAxis = isDesktop ? 13 : 10;
  const fsLabel = isDesktop ? 12 : 10;
  const strokeW = isDesktop ? 2.2 : 2;
  const dotR = isDesktop ? 4 : 3.5;
  const dotHaloR = isDesktop ? 8 : 6;

  const pts = data.pts.map(([x, y]) => [padL + (x / 100) * innerW, padT + (y / 100) * innerH]);
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  const fillPath = `${linePath} L ${pts[pts.length-1][0].toFixed(2)} ${padT + innerH} L ${pts[0][0].toFixed(2)} ${padT + innerH} Z`;

  const ranges = ['5 mo', '12 mo', '3 yr', 'Max'];

  return (
    <div>
      {/* Range selector — reuses SecondaryPills (same pill style as the
          mortgage lender selector) for visual consistency. */}
      <div style={{ marginBottom: isDesktop ? 14 : 10 }}>
        <window.SecondaryPills
          items={ranges.map(r => ({ id: r, label: r }))}
          active={range}
          onChange={onRange}
          size={isDesktop ? 'desktop' : 'mobile'}
        />
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {/* y gridlines */}
        {[0, 0.5, 1].map((t, i) => {
          const y = padT + t * innerH;
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="var(--color-border-subtle)" strokeWidth="1"/>
              <text x={padL - 8} y={y + fsAxis/3} textAnchor="end" fontSize={fsAxis} fill="var(--color-body-muted)" fontFamily="Poppins">
                {data.y[i]}
              </text>
            </g>
          );
        })}
        {/* fill */}
        <path d={fillPath} fill={tint || 'var(--color-chart-house)'} fillOpacity="0.15"/>
        {/* line */}
        <path d={linePath} fill="none" stroke={tint || 'var(--color-chart-house)'} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round"/>
        {/* last dot */}
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r={dotR} fill={tint || 'var(--color-chart-house)'}/>
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r={dotHaloR} fill={tint || 'var(--color-chart-house)'} fillOpacity="0.2"/>
        {/* x labels */}
        {data.x.map((lbl, i) => {
          const x = padL + (i / (data.x.length - 1)) * innerW;
          return (
            <text key={i} x={x} y={H - 6} textAnchor={i === 0 ? 'start' : i === data.x.length-1 ? 'end' : 'middle'}
              fontSize={fsLabel} fill="var(--color-body-muted)" fontFamily="Poppins">{lbl}</text>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Data row (label/value) ───────────────────────────────────────────
function DataRow({ label, value, valueColor, dataSource, last = false }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: last ? '10px 0 0' : '10px 0',
      borderBottom: last ? 'none' : '1px solid var(--color-border-subtle)',
    }}>
      <span style={{ fontSize: 13, color: 'var(--color-body-muted)' }}>{label}</span>
      <span
        data-source={dataSource}
        style={{
          fontSize: 13, fontWeight: 600,
          color: valueColor || 'var(--color-heading)',
        }}>{value}</span>
    </div>
  );
}

// ─── LTV row (with color-coded progress bar) ──────────────────────────
// LTV bands: low ≤50 (success green), normal 50–75 (warning orange),
// high 75–100 (red), underwater >100 (dark red — owes more than asset's worth).
function ltvBand(pct, lang = 'en') {
  const tr = window.tr || ((k) => k);
  if (pct <= 50)  return { color: 'var(--color-success)', label: tr('ltvLow', lang) };
  if (pct <= 75)  return { color: 'var(--color-warning)', label: tr('ltvNormal', lang) };
  if (pct <= 100) return { color: '#E53E3E',              label: tr('ltvHigh', lang) };
  return            { color: '#9B2C2C',              label: tr('ltvUnderwater', lang), warn: true };
}
function LTVRow({ pct, lang = 'en', dataSource }) {
  const tr = window.tr || ((k) => k);
  const band = ltvBand(pct, lang);
  return (
    <div
      data-source={dataSource}
      style={{
        padding: '10px 0',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 13, color: 'var(--color-body-muted)' }}>{tr('loanToValue', lang)}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase',
            color: band.color,
            background: `color-mix(in srgb, ${band.color} 14%, transparent)`,
            padding: '2px 7px', borderRadius: 'var(--radius-pill)',
          }}>{band.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-heading)' }}>{pct} %</span>
        </div>
      </div>
      <div style={{
        marginTop: 8, height: 6, background: 'var(--color-border-subtle)',
        borderRadius: 3, overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          width: `${Math.min(pct, 100)}%`, height: '100%',
          background: band.color, borderRadius: 3,
          transition: 'width 400ms cubic-bezier(.2,.7,.3,1), background 200ms',
        }}/>
        {/* tick marks at 50 and 75 */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.6)' }}/>
        <div style={{ position: 'absolute', left: '75%', top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.6)' }}/>
      </div>
      {band.warn && (
        <div style={{
          marginTop: 8, padding: '8px 10px',
          background: 'rgba(155,44,44,0.08)',
          border: '1px solid rgba(155,44,44,0.22)',
          borderRadius: 8,
          display: 'flex', gap: 8, alignItems: 'flex-start',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M12 9v4M12 16.5v.5M10.3 4.4l-7.4 13a2 2 0 001.7 3h14.8a2 2 0 001.7-3l-7.4-13a2 2 0 00-3.4 0z"
                  stroke="#9B2C2C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ fontSize: 11.5, lineHeight: 1.4, color: '#7A2222' }}>
            {tr('ltvUnderwaterWarn', lang)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Three-dot menu ───────────────────────────────────────────────────
// kind: 'loan' (car) or 'mortgage' (house). Both items always render —
// the irrelevant one is greyed out / non-interactive.
function LoanMenu({ hasActive, kind = 'mortgage', lang = 'en' }) {
  const [open, setOpen] = React.useState(false);
  const tr = window.tr || ((k) => k);
  const editLabel = kind === 'loan' ? tr('editCarLoan', lang) : tr('editMortgage', lang);
  const addLabel  = kind === 'loan' ? tr('addCarLoan', lang)  : tr('addMortgage', lang);
  // hasActive=true → Edit is enabled, Add is disabled.
  // hasActive=false → Edit is disabled, Add is enabled.
  const editDisabled = !hasActive;
  const addDisabled = !!hasActive;

  const itemStyle = (disabled, withDivider) => ({
    width: '100%', padding: '11px 14px', textAlign: 'left',
    fontSize: 13,
    color: disabled ? 'var(--color-body-muted)' : 'var(--color-body)',
    opacity: disabled ? 0.55 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    borderBottom: withDivider ? '1px solid var(--color-border-subtle)' : 'none',
    background: 'transparent',
    display: 'block',
  });

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: 32, height: 32, borderRadius: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-body)',
      }}>
        {Icon.dots('currentColor', 18)}
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 5 }}/>
          <div style={{
            position: 'absolute', right: 0, top: 34, zIndex: 6,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 10,
            boxShadow: '0 8px 24px rgba(30,37,47,0.12)',
            minWidth: 200, overflow: 'hidden',
          }}>
            <button
              onClick={editDisabled ? undefined : () => setOpen(false)}
              disabled={editDisabled}
              style={itemStyle(editDisabled, true)}
            >{editLabel}</button>
            <button
              onClick={addDisabled ? undefined : () => setOpen(false)}
              disabled={addDisabled}
              style={itemStyle(addDisabled, false)}
            >{addLabel}</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Shared mobile chrome (brand bar + tab bar) ───────────────────────
// Pulled above the mode SlideSwitcher so switching tabs slides only the
// body content below. Handles tab click routing for Home <-> Vehicle.
function MobileChrome({ isCar, lang = 'en' }) {
  return (
    <div style={{ background: 'var(--color-surface)', flexShrink: 0 }}>
      <div style={{
        background: 'var(--color-surface)',
        padding: '10px 16px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--color-border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {window.Icon.uscoreLogo(26)}
        </div>
        <button style={{
          width: 40, height: 40, borderRadius: 20,
          background: 'var(--color-surface-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-heading)', position: 'relative',
          border: 0, cursor: 'pointer',
        }}>
          {window.Icon.bellLine('currentColor', 20)}
          <span style={{
            position: 'absolute', top: 8, right: 10,
            width: 8, height: 8, borderRadius: 4,
            background: '#E53E3E', border: '2px solid var(--color-surface-page)',
          }}/>
        </button>
      </div>
      <AppTabBar active={isCar ? 'Vehicle' : 'Home'} lang={lang} onChange={(id) => {
        if (id === 'Vehicle' && !isCar) {
          window.location.href = 'Car Page Prototype.html';
        } else if (id === 'Home' && isCar) {
          window.location.href = 'House Card Prototype.html';
        }
      }}/>
    </div>
  );
}

// ─── CrossFade ─────────────────────────────────────────────────────────
// Swaps children smoothly on `keyId` change: old pane fades out while the
// new one fades in, both layered on top of each other. Used for the value
// hero + sparkline when switching between properties/vehicles.
function CrossFade({ keyId, duration = 300, children, style }) {
  const [cur, setCur] = React.useState({ k: keyId, n: children });
  const [prev, setPrev] = React.useState(null);
  const [animPhase, setAnimPhase] = React.useState('idle'); // 'idle' | 'enter'
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (keyId === cur.k) { setCur(c => ({ ...c, n: children })); return; }
    if (timerRef.current) clearTimeout(timerRef.current);
    setPrev(cur);
    setCur({ k: keyId, n: children });
    setAnimPhase('enter-start');
    // Next frame: kick the transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimPhase('enter-end'));
    });
    timerRef.current = setTimeout(() => {
      setPrev(null);
      setAnimPhase('idle');
      timerRef.current = null;
    }, duration + 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyId]);

  if (!prev) {
    // No animation in flight — render the current children prop directly.
    // (cur.n can be stale when keyId is unchanged but children rerender;
    // the keyId-only useEffect doesn't fire then.)
    return <div style={style}>{children}</div>;
  }

  const prevOpacity = animPhase === 'enter-end' ? 0 : 1;
  const curOpacity = animPhase === 'enter-end' ? 1 : 0;

  return (
    <div style={{ position: 'relative', ...style }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: prevOpacity,
        transition: `opacity ${duration}ms ease`,
        pointerEvents: 'none',
      }}>
        {prev.n}
      </div>
      <div style={{
        opacity: curOpacity,
        transition: `opacity ${duration}ms ease`,
      }}>
        {cur.n}
      </div>
    </div>
  );
}

// ─── AnimatedNumber ────────────────────────────────────────────────────
// Tweens between two formatted currency strings. Preserves the non-digit
// formatting (spaces, commas, currency suffix) from the target string and
// interpolates only the numeric magnitude. Handles "1 500 000 kr" or
// "1,500,000 SEK" shapes.
function parseFormatted(str) {
  if (!str) return { num: 0, template: str || '' };
  // Find the first contiguous numeric run (digits + separators)
  const m = String(str).match(/([\d][\d\s.,]*)/);
  if (!m) return { num: 0, template: str };
  const raw = m[1];
  // Strip separators (space, comma, period used as thousands sep)
  const digits = raw.replace(/[\s,.]/g, '');
  const num = parseInt(digits, 10) || 0;
  return { num, template: str, match: raw };
}

function formatLikeTemplate(num, template, originalMatch) {
  if (!originalMatch) return template;
  // Detect separator: look at the original match
  let sep = ' ';
  if (originalMatch.includes(',')) sep = ',';
  else if (originalMatch.includes('.') && originalMatch.length - originalMatch.lastIndexOf('.') - 1 === 3) sep = '.';
  else if (originalMatch.includes(' ')) sep = ' ';
  const formatted = Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return template.replace(originalMatch, formatted);
}

function AnimatedNumber({ value, duration = 500, style }) {
  const [display, setDisplay] = React.useState(value);
  const fromRef = React.useRef(value);
  const startRef = React.useRef(0);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    if (value === display) return;
    const from = parseFormatted(display);
    const to = parseFormatted(value);
    // If templates differ structurally, just snap.
    if (!from.match || !to.match) { setDisplay(value); return; }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startRef.current) / duration);
      // easeOutCubic
      const e = 1 - Math.pow(1 - t, 3);
      const cur = from.num + (to.num - from.num) * e;
      setDisplay(formatLikeTemplate(cur, to.template, to.match));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Split the trailing currency/unit suffix (e.g. " kr", " SEK") off the
  // numeric run so it can render smaller than the magnitude.
  const m = String(display).match(/^(.*?[\d])(\D+)$/);
  if (m) {
    return (
      <span style={style}>
        {m[1]}<span style={{ fontSize: '0.5em', fontWeight: 500 }}>{m[2]}</span>
      </span>
    );
  }
  return <span style={style}>{display}</span>;
}

// ─── FitToWidth ────────────────────────────────────────────────────────
// Auto-scales a fixed-width design (the 1280px desktop shell) down to fit
// the container. Uses ResizeObserver on the outer and inner so the height
// of the wrapper tracks scale * content height — keeps surrounding layout
// honest as the inside grows/shrinks (e.g. mode switch, tabs).
function FitToWidth({ designWidth, children, style }) {
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);
  const [innerH, setInnerH] = React.useState(null);

  React.useEffect(() => {
    let raf = 0;
    const measure = () => {
      clearTimeout(raf);
      // setTimeout instead of rAF — background iframes throttle rAF heavily,
      // which can leave the layout stuck at scale=1 for seconds at a time.
      raf = setTimeout(() => {
        const ow = outerRef.current?.clientWidth || designWidth;
        const ih = innerRef.current?.getBoundingClientRect().height || 0;
        const s = Math.min(1, ow / designWidth);
        setScale(prev => {
          // ih is scaled by the previous scale. Convert back to unscaled
          // height, then re-apply the new scale.
          const unscaledH = prev > 0 ? ih / prev : ih;
          setInnerH(unscaledH * s);
          return s;
        });
      }, 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    if (innerRef.current) ro.observe(innerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(raf);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designWidth]);

  return (
    <div ref={outerRef} style={{
      width: '100%',
      height: innerH != null ? innerH : undefined,
      ...style,
    }}>
      <div ref={innerRef} style={{
        width: designWidth,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  AppTabBar, PropertyTabs, Sparkline, DataRow, LTVRow, LoanMenu, MobileChrome,
  CrossFade, AnimatedNumber, FitToWidth,
});

// ─── Dev self-report modal ─────────────────────────────────────────────
// Yes-path placeholder for the existing prod self-report flow (Bank / Loan
// / Rate inputs). The prototype doesn't recreate the form — it just shows
// SelfReportModal — the real self-report bottom sheet (Bank / Loan / Interest
// rate) that appears after answering "Yes" to "Do you have a loan on this
// car/home?". Matches the production sheet 1:1: dim scrim, white sheet rising
// from the bottom, a bordered form card (title + Loan/Rate/Bank fields), and
// two full-width actions below the card (outline Undo, filled Save changes).
function DevSelfReportModal({ open, kind = 'mortgage', lang = 'en', assetName, assetCode, onClose, onConfirm }) {
  const [loanAmount, setLoanAmount] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [bank, setBank] = React.useState('');

  React.useEffect(() => {
    if (open) { setLoanAmount(''); setRate(''); setBank(''); }
  }, [open]);

  if (!open) return null;
  const tr = window.tr || ((k) => k);
  const loanWord = tr(kind === 'car' ? 'carLoanWord' : 'mortgageLoanWord', lang);
  const title = kind === 'car' && assetCode
    ? `${loanWord} – ${assetName} – ${assetCode}`
    : assetName ? `${loanWord} – ${assetName}` : loanWord;

  const fieldStyle = {
    width: '100%', height: 48, borderRadius: 10,
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface-page)',
    fontFamily: 'inherit', fontSize: 15, color: 'var(--color-heading)',
    padding: '0 14px', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 13, color: 'var(--color-body)', marginBottom: 6, display: 'block' };

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1500,
        background: 'rgba(20,28,40,0.45)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'fadeIn 160ms ease',
      }}
    >
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '20px 20px 0 0',
        width: '100%', maxWidth: 480,
        maxHeight: '92%', overflowY: 'auto',
        boxShadow: '0 -10px 40px rgba(20,28,40,0.25)',
        padding: '16px 20px 24px',
        fontFamily: 'var(--font)',
        display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            aria-label={tr('cancelAction', lang)}
            style={{
              width: 36, height: 36, borderRadius: 18, border: 0,
              background: 'var(--color-surface-page)', color: 'var(--color-heading)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M1.5 1.5l12 12M13.5 1.5l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          padding: '12px 14px',
          background: 'rgba(252,211,77,0.18)',
          border: '1px solid rgba(180,130,30,0.20)',
          borderRadius: 10,
        }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#8A6300', letterSpacing: 0.5, textTransform: 'uppercase', flexShrink: 0, paddingTop: 1 }}>Not part of design</span>
          <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--color-heading)' }}>
            Keep the loan input modal as we have it now in production
          </div>
        </div>

        <div style={{
          border: '1px solid var(--color-border)', borderRadius: 14,
          padding: 18,
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-heading)' }}>{title}</div>

          <div>
            <label style={labelStyle}>{tr('loanAmountLabel', lang)}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="text" inputMode="numeric" value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                style={{ ...fieldStyle, flex: 1 }}
              />
              <div style={{
                height: 48, minWidth: 44, borderRadius: 10,
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-page)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600, color: 'var(--color-body)',
              }}>kr</div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>{tr('interestRate', lang)}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                type="text" inputMode="decimal" value={rate}
                onChange={(e) => setRate(e.target.value)}
                style={{ ...fieldStyle, flex: 1 }}
              />
              <div style={{
                height: 48, minWidth: 44, borderRadius: 10,
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-page)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 600, color: 'var(--color-body)',
              }}>%</div>
            </div>
          </div>

          <div>
            <label style={labelStyle}>{tr('bankLabel', lang)}</label>
            <input
              type="text" value={bank}
              onChange={(e) => setBank(e.target.value)}
              style={fieldStyle}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              height: 52, borderRadius: 12,
              border: '1px solid var(--color-heading)',
              background: 'var(--color-surface)',
              color: 'var(--color-heading)', fontSize: 15, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>{tr('undoAction', lang)}</button>
          <button
            onClick={() => { onConfirm({ loanAmount, rate, bank }); onClose(); }}
            style={{
              height: 52, borderRadius: 12,
              background: 'var(--color-info)', color: '#fff', border: 0,
              fontSize: 15, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
            {tr('saveChangesAction', lang)}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

window.DevSelfReportModal = DevSelfReportModal;
