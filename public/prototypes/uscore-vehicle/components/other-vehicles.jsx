// Other vehicles — simple read-only cards for vehicles that aren't one of
// the user's primary tracked cars (boat, motorcycle, trailer, etc).
// Deliberately lighter than the main CarDetailCard: no loan, no insurance
// offer, no products — just the handful of facts shown in the reference.

function mkIconBadge(bg, glyph) {
  return (
    <div style={{
      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {glyph}
    </div>
  );
}

const otherVehicleIcons = {
  jetski: () => mkIconBadge('#0077B6', (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 16c2-3 5-5 8-5h5c2 0 3.5 1 4.3 2.7L22 16H4z" fill="#fff" fillOpacity="0.92"/>
      <path d="M14 10V7l3 1.5-3 1.5z" fill="#fff" fillOpacity="0.75"/>
    </svg>
  )),
  truck: () => mkIconBadge('#4A5568', (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="9" width="10" height="7" rx="1" fill="#fff" fillOpacity="0.92"/>
      <path d="M13 11h4l3 3v2h-7v-5z" fill="#fff" fillOpacity="0.7"/>
      <circle cx="8" cy="18" r="1.6" fill="#4A5568"/>
      <circle cx="8" cy="18" r="0.7" fill="#fff"/>
      <circle cx="17" cy="18" r="1.6" fill="#4A5568"/>
      <circle cx="17" cy="18" r="0.7" fill="#fff"/>
    </svg>
  )),
  boat: () => mkIconBadge('#023E8A', (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 15l1.5-5h11l1.5 5H5z" fill="#fff" fillOpacity="0.92"/>
      <path d="M13 9V4l4 5h-4z" fill="#fff" fillOpacity="0.7"/>
      <path d="M4 16h16l-1 2H5l-1-2z" fill="#fff" fillOpacity="0.5"/>
    </svg>
  )),
  motorcycle: () => mkIconBadge('#2D3748', (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="17" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6"/>
      <circle cx="18" cy="17" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6"/>
      <path d="M9 17l2.5-5h3l3 2.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M13 12l1.5-3h2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  )),
  caravan: () => mkIconBadge('#6A994E', (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="9" width="15" height="8" rx="1.2" fill="#fff" fillOpacity="0.92"/>
      <rect x="7" y="11" width="3.5" height="3" rx="0.4" fill="#6A994E" opacity="0.6"/>
      <rect x="12.5" y="11" width="3.5" height="3" rx="0.4" fill="#6A994E" opacity="0.6"/>
      <circle cx="17" cy="18" r="1.6" fill="#6A994E"/>
      <circle cx="17" cy="18" r="0.7" fill="#fff"/>
      <path d="M19 12h2v2.5h-2z" fill="#fff" fillOpacity="0.6"/>
    </svg>
  )),
};

// NO fixtures — simple secondary vehicles (not the primary tracked cars).
const OTHER_VEHICLES_NO = [
  { id: 'other-jetski',     name: 'Sea-Doo GTX 170',      year: 2022, regNr: 'JS 92104', fuel: 'Bensin', nextInspection: 'N/A',        purchaseDate: '2.6.2022',  estimated: '92 000 kr',  change: '−7 000 kr',  icon: 'jetski' },
  { id: 'other-truck',      name: 'Scania R450',          year: 2018, regNr: 'LR 60218', fuel: 'Diesel', nextInspection: '14.3.2026',  purchaseDate: '9.1.2018',  estimated: '860 000 kr', change: '−72 000 kr', icon: 'truck' },
  { id: 'other-boat',       name: 'Quicksilver Activ 555',year: 2021, regNr: 'BT 40871', fuel: 'Bensin', nextInspection: 'N/A',        purchaseDate: '18.5.2021', estimated: '345 000 kr', change: '−25 000 kr', icon: 'boat' },
  { id: 'other-motorcycle', name: 'Kawasaki Ninja 650',   year: 2022, regNr: 'MC 55871', fuel: 'Bensin', nextInspection: '5.8.2027',   purchaseDate: '11.4.2022', estimated: '78 000 kr',  change: '−9 000 kr',  icon: 'motorcycle' },
  { id: 'other-caravan',    name: 'Hobby De Luxe 460',    year: 2019, regNr: 'CV 30456', fuel: 'N/A',    nextInspection: '22.9.2025',  purchaseDate: '3.6.2019',  estimated: '285 000 kr', change: '−22 000 kr', icon: 'caravan' },
];

const OTHER_VEHICLES_SE = OTHER_VEHICLES_NO.map(v => {
  const swap = (s) => typeof s === 'string' ? s.replace(/\bkr\b/g, 'SEK') : s;
  return { ...v, estimated: swap(v.estimated), change: swap(v.change) };
});

function OtherVehicleCard({ vehicle }) {
  const iconFn = otherVehicleIcons[vehicle.icon];
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 16,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 12, marginBottom: 4,
        borderBottom: '1px solid var(--color-border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {iconFn && iconFn()}
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {vehicle.name}
          </div>
        </div>
        <div style={{ color: 'var(--color-body-muted)', flexShrink: 0 }}>{Icon.dots('currentColor', 18)}</div>
      </div>
      <DataRow label="Estimated value" value={vehicle.estimated} valueColor="var(--color-success)" dataSource="Data source not yet defined — pending other-vehicle valuation integration"/>
      <DataRow label="Change in value" value={vehicle.change} dataSource="Data source not yet defined — pending other-vehicle valuation integration"/>
      <DataRow label="Year" value={vehicle.year} dataSource="Self-report · vehicle.year"/>
      <DataRow label="Reg no" value={vehicle.regNr} dataSource="Self-report · vehicle.regNr"/>
      <DataRow label="Fuel type" value={vehicle.fuel} dataSource="Self-report · vehicle.fuel"/>
      <DataRow label="Next inspection" value={vehicle.nextInspection} dataSource="Self-report · vehicle.nextInspection"/>
      <DataRow label="Purchase date" value={vehicle.purchaseDate} dataSource="Self-report · vehicle.purchaseDate" last/>
    </div>
  );
}

function OtherVehiclesGrid({ vehicles, columns = 2 }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 14,
    }}>
      {vehicles.map(v => <OtherVehicleCard key={v.id} vehicle={v}/>)}
    </div>
  );
}

window.OTHER_VEHICLES_NO = OTHER_VEHICLES_NO;
window.OTHER_VEHICLES_SE = OTHER_VEHICLES_SE;
window.OtherVehicleCard = OtherVehicleCard;
window.OtherVehiclesGrid = OtherVehiclesGrid;
