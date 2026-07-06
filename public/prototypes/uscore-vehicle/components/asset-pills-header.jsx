// AssetPillsHeader — page header for House + Car pages.
//
// Visual style (matches SecondaryPills used inside cards):
//   • Inactive pill — tinted muted-grey bg, body-color label.
//   • Active pill   — tinted action-blue bg, info-color label, no shadow.
//
// Overflow handling for many assets (e.g. fleet of 10 cars):
//   • Mobile  → horizontal scroll, snaps per pill. The active pill scrolls
//     into view automatically so the user never loses their place.
//   • Desktop → up to MAX_VISIBLE pills inline. If there are more, the
//     overflow collapses into a "+N more" chip that opens a dropdown sheet
//     with the full list (selectable). The currently-active item is
//     ALWAYS pinned in the inline row, even if it would have spilled to
//     the overflow, so the visible row always reflects the current state.

const PILL_MAX_VISIBLE_DESKTOP = 6;

function AssetTitleBlock({ kind, size = 'mobile', lang = 'en' }) {
  const isDesktop = size === 'desktop';
  const isCar = kind === 'car';
  const tr = window.tr || ((k) => k);
  const titleText = isCar ? tr('yourVehicles', lang) : tr('yourHomes', lang);
  const bodyText = isCar ? tr('vehiclesSubtitle', lang) : tr('homesSubtitle', lang);
  const titleSize = isDesktop ? 24 : 16;
  const bodySize  = isDesktop ? 14 : 13;
  const padX      = isDesktop ? 32 : 16;
  const padTop    = isDesktop ? 24 : 16;
  const padBottom = isDesktop ? 8  : 4;
  return (
    <div style={{ padding: `${padTop}px ${padX}px ${padBottom}px` }}>
      <div style={{
        fontSize: titleSize,
        fontWeight: 700,
        color: 'var(--color-heading)',
        letterSpacing: isDesktop ? -0.2 : 0,
        lineHeight: 1.2,
        marginBottom: isDesktop ? 6 : 2,
      }}>{titleText}</div>
      <div style={{
        fontSize: bodySize,
        color: 'var(--color-body-muted)',
        lineHeight: 1.45,
      }}>{bodyText}</div>
    </div>
  );
}

window.AssetTitleBlock = AssetTitleBlock;

function AssetPillsHeader({
  kind,            // 'house' | 'car'
  items,
  activeId,
  onSelect,
  country,
  size = 'mobile',
  lang = 'en',
  extraPill = null, // optional { id, label } trailing pill (e.g. "Other vehicles")
}) {
  const isDesktop = size === 'desktop';
  const isCar = kind === 'car';
  const tr = window.tr || ((k) => k);

  const titleText = isCar ? tr('yourVehicles', lang) : tr('yourHomes', lang);
  const bodyText = isCar
    ? tr('vehiclesSubtitle', lang)
    : tr('homesSubtitle', lang);

  const titleSize = isDesktop ? 24 : 16;
  const bodySize  = isDesktop ? 14 : 13;
  const padX      = isDesktop ? 32 : 16;
  const padTop    = isDesktop ? 24 : 16;
  const padBottom = isDesktop ? 8  : 4;

  // Auto-scroll the selected mobile pill into view when active changes.
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    if (isDesktop || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-pill-id="${activeId}"]`);
    if (!el) return;
    const container = scrollRef.current;
    const target = el.offsetLeft - 16;
    container.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeId, isDesktop]);

  // Desktop overflow: split items into inline + overflow.
  const overflowOpen = React.useState(false);
  const [moreOpen, setMoreOpen] = overflowOpen;
  let inlineItems = items;
  let overflowItems = [];
  if (isDesktop && items.length > PILL_MAX_VISIBLE_DESKTOP) {
    // Pin the active pill into the inline slice so the selected state is
    // always visible without needing to open the menu.
    const activeIdx = items.findIndex(i => i.id === activeId);
    const inline = items.slice(0, PILL_MAX_VISIBLE_DESKTOP - 1);
    let overflow = items.slice(PILL_MAX_VISIBLE_DESKTOP - 1);
    if (activeIdx >= PILL_MAX_VISIBLE_DESKTOP - 1) {
      // Swap active out of overflow into the inline tail.
      const active = items[activeIdx];
      overflow = overflow.filter(i => i.id !== active.id);
      // Drop the LAST inline pill into overflow to keep total inline pills
      // at MAX-1, then append active at the end of inline.
      const bumped = inline.pop();
      if (bumped) overflow.unshift(bumped);
      inline.push(active);
    }
    inlineItems = inline;
    overflowItems = overflow;
  }

  return (
    <div style={{
      background: 'transparent',
      padding: `${padTop}px ${padX}px ${padBottom}px`,
    }}>
      <div style={{
        fontSize: titleSize,
        fontWeight: 700,
        color: 'var(--color-heading)',
        letterSpacing: isDesktop ? -0.2 : 0,
        lineHeight: 1.2,
        marginBottom: isDesktop ? 6 : 2,
      }}>{titleText}</div>

      <div style={{
        fontSize: bodySize,
        color: 'var(--color-body-muted)',
        lineHeight: 1.45,
        marginBottom: isDesktop ? 16 : 12,
      }}>{bodyText}</div>

      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          flexWrap: isDesktop ? 'wrap' : 'nowrap',
          gap: 8,
          overflowX: isDesktop ? 'visible' : 'auto',
          overflowY: 'visible',
          // Bleed off BOTH edges on mobile — visual hint that the row
          // scrolls horizontally in either direction.
          marginLeft: isDesktop ? 0 : -padX,
          paddingLeft: isDesktop ? 0 : padX,
          marginRight: isDesktop ? 0 : -padX,
          paddingRight: isDesktop ? 0 : padX,
          paddingBottom: isDesktop ? 0 : 2,
          scrollbarWidth: 'none',
          position: 'relative',
        }}
      >
        {inlineItems.map(item => (
          <AssetPill
            key={item.id}
            kind={kind}
            item={item}
            selected={item.id === activeId}
            onClick={() => onSelect(item.id)}
          />
        ))}
        {extraPill && (
          <ExtraPill
            label={extraPill.label}
            selected={activeId === extraPill.id}
            onClick={() => onSelect(extraPill.id)}
          />
        )}
        {overflowItems.length > 0 && (
          <OverflowPill
            count={overflowItems.length}
            open={moreOpen}
            onToggle={() => setMoreOpen(o => !o)}
            items={overflowItems}
            activeId={activeId}
            kind={kind}
            lang={lang}
            onSelect={(id) => { onSelect(id); setMoreOpen(false); }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Pill ──────────────────────────────────────────────────────────────
// Matches SecondaryPills (used inside cards) so the visual vocabulary
// is consistent across the page.
//   Inactive — tinted muted-grey bg, body color.
//   Active   — tinted action-blue bg, info color, bold.
function AssetPill({ kind, item, selected, onClick }) {
  const isCar = kind === 'car';
  const label = isCar
    ? `${item.make} ${item.model.split(' ')[0]}`
    : `${item.street} · ${item.postal} ${item.city}`;

  return (
    <button
      type="button"
      data-pill-id={item.id}
      onClick={onClick}
      aria-pressed={selected}
      style={{
        flexShrink: 0,
        height: 32,
        padding: '0 14px',
        borderRadius: 'var(--radius-pill)',
        border: 0,
        background: selected
          ? 'rgba(26,144,112,0.14)'        // tinted brand-green
          : 'rgba(107,124,146,0.12)',      // tinted muted-grey
        color: selected
          ? 'var(--color-info)'
          : 'var(--color-body)',
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: selected ? 700 : 600,
        letterSpacing: 0.1,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 160ms ease, color 160ms ease',
      }}
    >
      <span data-source={isCar ? "GET /v1/{market}/vehicle/{regno} · data.make, data.model" : "Cadastre / address registry · property.street"}>{label}</span>
    </button>
  );
}

// ─── Overflow pill ─────────────────────────────────────────────────────
// "+N more" chip → opens a sheet listing all overflow items.
function OverflowPill({ count, open, onToggle, items, activeId, kind, onSelect, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const anchorRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!anchorRef.current) return;
      if (anchorRef.current.contains(e.target)) return;
      onToggle();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open, onToggle]);

  return (
    <div ref={anchorRef} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          height: 32,
          padding: '0 12px',
          borderRadius: 'var(--radius-pill)',
          border: 0,
          background: open
            ? 'rgba(26,144,112,0.14)'
            : 'rgba(107,124,146,0.12)',
          color: open ? 'var(--color-info)' : 'var(--color-body)',
          fontFamily: 'Poppins',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          whiteSpace: 'nowrap',
        }}
      >
        {tr('morePill', lang, { count })}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
             style={{ transition: 'transform 160ms', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          minWidth: 220,
          maxHeight: 320,
          overflowY: 'auto',
          background: 'var(--color-surface)',
          borderRadius: 10,
          boxShadow:
            '0 12px 32px rgba(30,37,47,0.18), 0 0 0 1px rgba(30,37,47,0.06)',
          padding: 6,
          zIndex: 20,
        }}>
          {items.map(item => {
            const isCar = kind === 'car';
            const label = isCar
              ? `${item.make} ${item.model.split(' ')[0]}`
              : `${item.street} · ${item.postal} ${item.city}`;
            const secondary = isCar
              ? `${item.year} · ${item.plate}`
              : '';
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 0,
                  background: isActive
                    ? 'rgba(26,144,112,0.10)'
                    : 'transparent',
                  color: isActive
                    ? 'var(--color-action)'
                    : 'var(--color-heading)',
                  fontFamily: 'Poppins',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  transition: 'background 120ms',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--color-surface-page)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span data-source={isCar ? "GET /v1/{market}/vehicle/{regno} · data.make, data.model" : "Cadastre / address registry · property.street"}>{label}</span>
                {secondary && (
                  <span style={{
                    fontSize: 11,
                    color: 'var(--color-body-muted)',
                    fontWeight: 400,
                  }}>{secondary}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Extra pill ──────────────────────────────────────────────────────
// Trailing pill for a synthetic entry that isn't a real asset (e.g.
// "Other vehicles"). Same visual language as AssetPill, plain label.
function ExtraPill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      data-pill-id="other"
      onClick={onClick}
      aria-pressed={selected}
      style={{
        flexShrink: 0,
        height: 32,
        padding: '0 14px',
        borderRadius: 'var(--radius-pill)',
        border: 0,
        background: selected
          ? 'rgba(26,144,112,0.14)'
          : 'rgba(107,124,146,0.12)',
        color: selected
          ? 'var(--color-info)'
          : 'var(--color-body)',
        fontFamily: 'Poppins',
        fontSize: 13,
        fontWeight: selected ? 700 : 600,
        letterSpacing: 0.1,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 160ms ease, color 160ms ease',
      }}
    >
      <span>{label}</span>
    </button>
  );
}

window.AssetPillsHeader = AssetPillsHeader;
window.AssetPill = AssetPill;
