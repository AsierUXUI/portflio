// Icon set — small inline SVGs matching Poppins weight
const Icon = {
  sparkle: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3z" fill={c}/>
      <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8L19 3z" fill={c} opacity="0.7"/>
    </svg>
  ),
  dots: (c = 'currentColor', s = 20) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.6" fill={c}/>
      <circle cx="10" cy="10" r="1.6" fill={c}/>
      <circle cx="10" cy="16" r="1.6" fill={c}/>
    </svg>
  ),
  chevR: (c = 'currentColor', s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowR: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12M11 5l5 5-5 5" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bell: (c = 'currentColor', s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 8a6 6 0 1112 0v4l1.5 3H4.5L6 12V8z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M10 18a2 2 0 004 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  bulb: (c = 'currentColor', s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5c.8.8 1.3 1.5 1.5 2.5h5c.2-1 .7-1.7 1.5-2.5A6 6 0 0012 3z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Product-category icons — used by ProductPills
  shieldLine: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V6l8-3z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 12.5l2 2 4-4.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bolt: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  hammer: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14 6l4-4 4 4-4 4-2-2-7 7-3-3 7-7-2-2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M9 14l-6 6 2 2 6-6" stroke={c} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  wrench: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M14.7 6.3a4 4 0 015 5l-2.5-2.5L15.5 11l-3-3 2.2-2.2-1.5-1.5a4 4 0 00-5 5L3 14.5V19h4.5l5.2-5.2 1.5 1.5 2.2-2.2-3-3 2.2-2.2-.9-.6z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  tire: (c = 'currentColor', s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="3.5" stroke={c} strokeWidth="1.6"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2"
            stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  // tab bar icons (nordic mobile nav)
  tabOverview: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke={c} strokeWidth="1.6"/>
      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke={c} strokeWidth="1.6"/>
      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke={c} strokeWidth="1.6"/>
      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke={c} strokeWidth="1.6"/>
    </svg>
  ),
  tabHouse: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  tabCar: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l1.8-5a2 2 0 011.9-1.4h6.6a2 2 0 011.9 1.4L19 13m-14 0v5a1 1 0 001 1h1a1 1 0 001-1v-1h10v1a1 1 0 001 1h1a1 1 0 001-1v-5m-14 0h14" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="8" cy="15.5" r="1" fill={c}/>
      <circle cx="16" cy="15.5" r="1" fill={c}/>
    </svg>
  ),
  tabDebt: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={c} strokeWidth="1.6"/>
      <circle cx="12" cy="12" r="2.5" stroke={c} strokeWidth="1.6"/>
    </svg>
  ),
  tabIncome: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 17l5-5 4 4 7-8" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 8h6v6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (s = 56) => (
    <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
      <path d="M32 8l18 6v14c0 12-8 22-18 26-10-4-18-14-18-26V14l18-6z" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M22 32l7 7 13-14" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  moneybag: (s = 56) => (
    <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
      <path d="M22 16l3-5h14l3 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
      <path d="M22 16h20c5 7 10 14 10 22 0 10-9 18-20 18S12 48 12 38c0-8 5-15 10-22z" fill="#fff" fillOpacity="0.18" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M32 28v16M28 32h7a2.5 2.5 0 010 5h-6a2.5 2.5 0 000 5h7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  star: (s = 12) => (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none">
      <path d="M6 1l1.5 3.2L11 4.8l-2.6 2.3L9.2 11 6 9.2 2.8 11l.8-3.9L1 4.8l3.5-.6L6 1z" fill="#E39D2F"/>
    </svg>
  ),
  check: (c, s = 14) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5l3 3 6-7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  search: (c, s = 20) => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5.5" stroke={c} strokeWidth="1.6"/>
      <path d="M13.5 13.5l3 3" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  uscoreLogo: (h = 28) => {
    const w = h * (190/57);
    return (
      <svg width={w} height={h} viewBox="0 0 190 57" fill="none">
        <defs>
          <linearGradient id="uscore-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E53E3E"/>
            <stop offset="0.4" stopColor="#F6B042"/>
            <stop offset="0.75" stopColor="#8BC34A"/>
            <stop offset="1" stopColor="#2EB872"/>
          </linearGradient>
        </defs>
        <path d="M 28.5 8 A 20.5 20.5 0 1 1 13 14" stroke="url(#uscore-ring)" strokeWidth="5.8" fill="none" strokeLinecap="round"/>
        <text x="53" y="37" fontFamily="Poppins" fontWeight="600" fontSize="24" fill="#1E252F">uScore</text>
      </svg>
    );
  },
  pin: (c = '#F68854', s = 24) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 22s8-7.2 8-13a8 8 0 10-16 0c0 5.8 8 13 8 13z" fill={c}/>
      <circle cx="12" cy="9.5" r="2.8" fill="#fff"/>
    </svg>
  ),
  bellLine: (c, s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 1112 0v3.5l1.6 3.2a1 1 0 01-.9 1.5H5.3a1 1 0 01-.9-1.5L6 12.5V9z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M10 19a2 2 0 004 0" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
};
window.Icon = Icon;
