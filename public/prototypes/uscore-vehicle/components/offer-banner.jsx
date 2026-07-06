// Offer banner — shown in the "savings slot" when savings potential isn't available.
// 60/40 split: content on left, image on right.
// Dismiss animation: slide-right + fade, then height collapse (~300ms each).
//   The banner owns a local "leaving" state so the motion plays before
//   the caller removes it (we fire onDismiss when the collapse finishes).

function OfferBanner({ banner, onDismiss, variant, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [leaving, setLeaving] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const rootRef = React.useRef(null);
  const [measuredH, setMeasuredH] = React.useState(null);

  if (!banner) return null;

  // Resolve translated copy. Banners carry titleKey/subtitleKey; fall back to
  // the raw English title/subtitle for any banner that hasn't been keyed.
  const titleStr    = banner.titleKey    ? tr(banner.titleKey, lang)    : banner.title;
  const subtitleStr = banner.subtitleKey ? tr(banner.subtitleKey, lang) : banner.subtitle;

  const isDesktop = variant === 'desktop';
  const pad = isDesktop ? 20 : 16;
  const titleSize = isDesktop ? 16 : 14.5;
  const discountSize = isDesktop ? 22 : 20;
  const subSize = isDesktop ? 13 : 12.5;
  const minH = isDesktop ? 180 : 160;

  const handleDismiss = () => {
    if (leaving) return;
    // Measure current height so we can animate max-height → 0 cleanly.
    if (rootRef.current) setMeasuredH(rootRef.current.getBoundingClientRect().height);
    setLeaving(true);
    // After slide/fade finishes (~320ms), start the collapse.
    window.setTimeout(() => setCollapsed(true), 320);
    // After the collapse (~320ms more), tell the parent to remove us.
    window.setTimeout(() => onDismiss && onDismiss(), 640);
  };

  // Outer wrapper drives the height collapse; inner div drives slide/fade.
  const wrapStyle = {
    overflow: 'hidden',
    transition: 'max-height 320ms cubic-bezier(0.4, 0, 0.2, 1), margin 320ms cubic-bezier(0.4, 0, 0.2, 1)',
    maxHeight: collapsed ? 0 : (measuredH ? measuredH : 1000),
    marginTop: collapsed ? 0 : undefined,
    marginBottom: collapsed ? 0 : undefined,
  };

  const innerStyle = {
    position: 'relative',
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-card)',
    overflow: 'hidden',
    boxShadow: isDesktop
      ? '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)'
      : '0 2px 8px rgba(30,37,47,0.06), 0 1px 2px rgba(30,37,47,0.04)',
    border: isDesktop ? 'none' : '1px solid var(--color-border-subtle)',
    display: 'flex',
    alignItems: 'stretch',
    minHeight: minH,
    transform: leaving ? 'translateX(110%)' : 'translateX(0)',
    opacity: leaving ? 0 : 1,
    transition: 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1), opacity 260ms cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, opacity',
  };

  return (
    <div ref={rootRef} style={wrapStyle}>
      <div style={innerStyle}>
        {/* Left 60% — content */}
        <div style={{
          flex: '1 1 60%',
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minWidth: 0,
          gap: 10,
        }}>
          <div>
            <div style={{
              fontSize: titleSize,
              fontWeight: 700,
              color: 'var(--color-heading)',
              lineHeight: 1.25,
              marginBottom: 10,
              textWrap: 'pretty',
            }}>
              {titleStr}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
              <span style={{
                fontSize: discountSize,
                fontWeight: 700,
                color: 'var(--color-discount, #F2A93B)',
                lineHeight: 1,
              }}>
                {banner.discount}
              </span>
              <span style={{
                fontSize: isDesktop ? 14 : 13,
                fontWeight: 600,
                color: 'var(--color-discount, #F2A93B)',
                lineHeight: 1,
              }}>
                {tr('discountLabel', lang)}
              </span>
            </div>

            <div style={{
              fontSize: subSize,
              color: 'var(--color-body-muted)',
              lineHeight: 1.45,
            }}>
              {subtitleStr}
            </div>
          </div>

          <button style={{
            alignSelf: 'flex-start',
            background: 'var(--color-cta)',
            color: 'var(--color-on-cta, #FFFFFF)',
            fontWeight: 700,
            fontSize: isDesktop ? 14 : 13.5,
            padding: isDesktop ? '11px 18px' : '10px 16px',
            borderRadius: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 4,
          }}>
            {tr('readDetails', lang)}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Right 40% — image */}
        <div style={{
          flex: '0 0 40%',
          background: banner.image
            ? `${banner.bgColor || '#2a2a2a'} url("${banner.image}") ${banner.bgPosition || 'center'} / ${banner.bgFit || 'cover'} no-repeat`
            : 'linear-gradient(135deg, var(--color-surface-page), #D4DDEE)',
        }}/>

        {/* Dismiss × */}
        <button
          onClick={handleDismiss}
          aria-label={tr('dismissOffer', lang)}
          style={{
            position: 'absolute',
            top: 8, right: 8,
            width: 28, height: 28,
            borderRadius: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            background: 'rgba(30,37,47,0.35)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 2l10 10M12 2L2 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

window.OfferBanner = OfferBanner;
