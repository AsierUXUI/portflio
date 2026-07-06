// Swedish address component
// States exposed as tweaks:
//  'none'   — no address yet (empty state prompting to add)
//  'step1'  — owner/renter prompt (we see an address but don't know their relationship)
//  'step2'  — cadastre keys (owner confirmed, now pick the right key)
//  'step3'  — confirmed (plain address row, ••• menu gives options)

// Cadastre keys per-city — fallback to a generic pattern otherwise.
const CADASTRE_KEYS_BY_CITY = {
  'Umeå':      ['UMEÅ 1:25',     'UMEÅ 1:26',     'UMEÅ 2:14'],
  'Stockholm': ['STADSDEL 3:12', 'STADSDEL 3:13', 'STADSDEL 4:01'],
  'Göteborg':  ['GÖTEBORG 5:08', 'GÖTEBORG 5:09', 'GÖTEBORG 6:22'],
  'Malmö':     ['MALMÖ 2:44',    'MALMÖ 2:45',    'MALMÖ 3:17'],
};
const DEFAULT_CADASTRE_KEYS = ['FASTIGHET 1:01', 'FASTIGHET 1:02', 'FASTIGHET 2:05'];
const DEFAULT_ADDRESS = 'Björkvägen 12, 903 45 Umeå';

const cardStyle = {
  background: '#fff',
  borderRadius: 10,
  boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
  padding: 14,
};

const bodyCopy = {
  fontFamily: 'Poppins', fontSize: 13, color: 'rgb(56,71,91)',
  opacity: 0.85, lineHeight: 1.45,
};

function AddressPin() {
  return Icon.pin('#F68854', 22);
}

// Standard dropdown — closes on outside tap
function AddressMenu({ anchorRef, onClose, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const items = [
    { label: tr('addrMenuNotRented', lang), onClick: onClose },
  ];
  React.useEffect(() => {
    const onDown = (e) => {
      if (!anchorRef.current) return;
      if (anchorRef.current.contains(e.target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
    };
  }, [anchorRef, onClose]);

  return (
    <div style={{
      position: 'absolute', right: 0, top: 38, zIndex: 10,
      background: '#fff',
      borderRadius: 8,
      boxShadow: '0 0 24px rgba(30,37,47,0.2)',
      minWidth: 224, padding: 4,
    }}>
      {items.map((it, i) => (
        <button key={i} onClick={it.onClick} style={{
          width: '100%', textAlign: 'left',
          padding: '10px 10px',
          background: 'transparent',
          fontFamily: 'Poppins', fontSize: 13, color: 'rgb(56,71,91)',
          borderRadius: 6,
          display: 'block',
        }}>
          {it.label}
        </button>
      ))}
    </div>
  );
}

function AddressHeader({ address = DEFAULT_ADDRESS, showMenu = true, lang = 'en' }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        <div style={{ flexShrink: 0 }}><AddressPin/></div>
        <div style={{
          fontFamily: 'Poppins', fontWeight: 400, fontSize: 14,
          color: 'rgb(30,37,47)', lineHeight: 1.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{address}</div>
      </div>
      {showMenu && (
        <div ref={anchorRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
            style={{
              width: 32, height: 32, borderRadius: 16,
              background: open ? 'var(--color-surface-page)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgb(56,71,91)',
            }}>
            {Icon.dots('currentColor', 18)}
          </button>
          {open && <AddressMenu anchorRef={anchorRef} onClose={() => setOpen(false)} lang={lang}/>}
        </div>
      )}
    </div>
  );
}

// Light option button — white card, subtle shadow, selected = action ring
function OptionButton({ onClick, selected, children, icon }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', minHeight: 44, borderRadius: 8,
      background: '#fff',
      boxShadow: selected
        ? '0 0 0 2px var(--color-action), 0 1px 3px rgba(30,37,47,0.06)'
        : '0 1px 3px rgba(30,37,47,0.08), 0 0 0 1px rgba(30,37,47,0.06)',
      color: 'rgb(30,37,47)',
      fontFamily: 'Poppins', fontSize: 13, fontWeight: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, padding: '10px 12px',
      letterSpacing: 0.1,
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─── State: none ────────────────────────────────────────────────
function AddressNone({ lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ flexShrink: 0, opacity: 0.4 }}>{Icon.pin('#c5d0e0', 22)}</div>
        <div style={{
          fontFamily: 'Poppins', fontSize: 14, fontWeight: 600,
          color: 'rgb(30,37,47)',
        }}>{tr('noAddressOnFile', lang)}</div>
      </div>
      <div style={{ ...bodyCopy, marginBottom: 12 }}>
        {tr('noAddressBody', lang)}
      </div>
      <button style={{
        width: '100%', height: 42, borderRadius: 8,
        background: 'var(--color-cta)', color: '#fff',
        fontFamily: 'Poppins', fontSize: 13, fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      }}>
        {tr('addAddress', lang)} {Icon.arrowR('currentColor', 14)}
      </button>
    </div>
  );
}

// ─── State: step1 — owner or renter? ────────────────────────────
function AddressStep1({ address, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [sel, setSel] = React.useState(null);
  return (
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <AddressHeader address={address} lang={lang}/>
        <div style={bodyCopy}>
          {tr('addrRegisteredHere', lang)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <OptionButton onClick={() => setSel('owner')} selected={sel === 'owner'}>
          {tr('addrOwner', lang)}
        </OptionButton>
        <OptionButton
          onClick={() => setSel('renter')}
          selected={sel === 'renter'}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="12" cy="13" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          }
        >
          {tr('addrRenter', lang)}
        </OptionButton>
      </div>
    </div>
  );
}

// ─── State: step2 — cadastre keys ───────────────────────────────
function AddressStep2({ address, city, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [sel, setSel] = React.useState(null);
  const keys = CADASTRE_KEYS_BY_CITY[city] || DEFAULT_CADASTRE_KEYS;
  return (
    <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <AddressHeader address={address} lang={lang}/>
        <div style={bodyCopy}>
          {tr('addrCadastreMatch', lang)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {keys.map(k => (
          <OptionButton key={k} onClick={() => setSel(k)} selected={sel === k}>
            {k}
          </OptionButton>
        ))}
        <OptionButton onClick={() => setSel('none')} selected={sel === 'none'}>
          {tr('addrNoneMatch', lang)}
        </OptionButton>
      </div>
    </div>
  );
}

// ─── State: step3 — confirmed ──────────────────────────────────
function AddressStep3({ address, lang = 'en' }) {
  return (
    <div style={cardStyle}>
      <AddressHeader address={address} lang={lang}/>
    </div>
  );
}

function AddressCard({ state = 'step1', address, city, lang = 'en' }) {
  if (state === 'none')  return <AddressNone lang={lang}/>;
  if (state === 'step1') return <AddressStep1 address={address} lang={lang}/>;
  if (state === 'step2') return <AddressStep2 address={address} city={city} lang={lang}/>;
  if (state === 'step3') return <AddressStep3 address={address} lang={lang}/>;
  return <AddressStep1 address={address} lang={lang}/>;
}

window.AddressCard = AddressCard;
