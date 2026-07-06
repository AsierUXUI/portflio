// SecondaryPills — chip selector that sits INSIDE a card container.
// Lower visual weight than the primary asset-header pills:
//   • Inactive — soft muted-grey tinted bg, body color
//   • Active   — action-blue tinted bg, action-blue text, no shadow
// Used by:
//   • Popular products card (Insurance / Electricity / Renovation / …)
//   • Loan card lender tabs ("Your car loan" / "Your mortgage")
//
// Items can be plain strings or { id, label, icon } objects. The `icon`
// key resolves against window.Icon[name] — see PRODUCT_ICON_BY_CAT for
// product mappings.

const PRODUCT_ICON_BY_CAT = {
  'Insurance':     'shieldLine',
  'Electricity':   'bolt',
  'Renovation':    'hammer',
  'Assistance':    'wrench',
  'Tire storage':  'tire',
};

function SecondaryPills({ items, active, onChange, withIcons = false, size = 'mobile', bleedRight }) {
  const isDesktop = size === 'desktop';
  // Default bleed matches the popular-products / loan-card horizontal padding
  // (16 mobile, 20 desktop), so both edges of the pill row scroll past the
  // container padding and hint "there's more" in either direction.
  const bleed = bleedRight != null ? bleedRight : (isDesktop ? 20 : 16);
  return (
    <div style={{
      display: 'flex',
      gap: 6,
      flexWrap: 'nowrap',
      overflowX: 'auto',
      paddingBottom: 2,
      marginLeft: -bleed,
      paddingLeft: bleed,
      marginRight: -bleed,
      paddingRight: bleed,
      scrollbarWidth: 'none',
    }}>
      {items.map(raw => {
        const item = typeof raw === 'string' ? { id: raw, label: raw } : raw;
        const selected = item.id === active;
        const iconKey = item.icon || (withIcons ? PRODUCT_ICON_BY_CAT[item.label] : null);
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-pressed={selected}
            style={{
              flexShrink: 0,
              height: 30,
              padding: iconKey ? '0 12px 0 9px' : '0 12px',
              borderRadius: 'var(--radius-pill)',
              border: 0,
              background: selected
                ? 'rgba(26,144,112,0.14)'        // tinted brand-green
                : 'rgba(107,124,146,0.12)',      // tinted muted-grey (badge)
              color: selected
                ? 'var(--color-info)'
                : 'var(--color-body)',
              fontFamily: 'Poppins',
              fontSize: 12.5,
              fontWeight: selected ? 700 : 600,
              letterSpacing: 0.1,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              transition:
                'background 160ms ease, color 160ms ease',
            }}
          >
            {iconKey && Icon[iconKey] && Icon[iconKey](
              selected ? 'var(--color-info)' : 'var(--color-body-muted)',
              14
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Back-compat: ProductPills used to render icons next to category names.
// Icons disabled for now per design — falls back to text-only chips.
function ProductPills({ categories, active, onChange, size = 'mobile' }) {
  return (
    <SecondaryPills
      items={categories.map(c => ({ id: c, label: c }))}
      active={active}
      onChange={onChange}
      size={size}
    />
  );
}

window.SecondaryPills = SecondaryPills;
window.ProductPills = ProductPills;
