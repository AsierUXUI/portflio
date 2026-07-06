// Shared mock data for the house screens
const PROPERTIES = [
  {
    id: 'storgata',
    street: 'Storgata 12',
    city: 'Oslo',
    postal: '0182',
    mortgageState: 'has',          // 'has' | 'none' | 'undecided' | 'multiple'
    savings: 363,                   // monthly savings potential, or 0
    insight: { stat: '+239%', text: 'more than when you bought it', prefix: 'Your home is now worth' },
    value: {
      estimated: '7 900 000 kr',
      boughtYear: 2012,
      boughtFor: '2 330 000 kr',
      growthValue: '+5 570 000 kr',
      perM2: '87 778 kr',
      m2: 90,
    },
    loan: {
      lenders: [
        { name: 'Nordea', balance: '2 430 000 kr', rate: '5.89 %', ltv: 31, monthly: '14 820 kr', term: '18 yr 4 mo' },
        { name: 'Bank Norwegian', balance: '180 000 kr', rate: '7.40 %', ltv: 2, monthly: '2 100 kr', term: '4 yr 2 mo' },
      ],
    },
    products: {
      Insurance:  { provider: 'Tryg Insurance', desc: 'Home insurance with over 30% discount for Uscore users.', cta: 'Apply now' },
      Electricity:{ provider: 'Fjordkraft', desc: 'Spot price with no markup for the first 12 months for homeowners.', cta: 'Switch provider' },
      Renovation: { provider: 'Axo Finans', desc: 'Renovation loan from 6.9% for customers with good payment ability.', cta: 'See offer' },
    },
  },
  {
    id: 'hytteveien',
    street: 'Hytteveien 3',
    city: 'Norefjell',
    postal: '3630',
    mortgageState: 'has',
    savings: 0,
    insight: { stat: '+41%', text: 'in value since 2019', prefix: 'Your cabin is up' },
    value: {
      estimated: '3 420 000 kr',
      boughtYear: 2019,
      boughtFor: '2 425 000 kr',
      growthValue: '+995 000 kr',
      perM2: '52 615 kr',
      m2: 65,
    },
    loan: {
      lenders: [
        { name: 'DNB', balance: '1 210 000 kr', rate: '6.15 %', ltv: 35, monthly: '7 940 kr', term: '22 yr 0 mo' },
      ],
    },
    products: {
      Insurance:  { provider: 'Gjensidige', desc: 'Holiday home insurance tailored for mountain cabins.', cta: 'Apply now' },
      Electricity:{ provider: 'Tibber', desc: 'Smart spot-price electricity — perfect for irregular use.', cta: 'Switch provider' },
      Renovation: { provider: 'Instabank', desc: 'Renovation loan for cabins and holiday homes.', cta: 'See offer' },
    },
  },
  {
    id: 'bergveien',
    street: 'Bergveien 7',
    city: 'Bergen',
    postal: '5003',
    mortgageState: 'none',
    savings: 0,
    insight: { stat: '+18%', text: 'since you bought in 2022', prefix: 'The apartment is up' },
    value: {
      estimated: '4 150 000 kr',
      boughtYear: 2022,
      boughtFor: '3 520 000 kr',
      growthValue: '+630 000 kr',
      perM2: '72 807 kr',
      m2: 57,
    },
    loan: { lenders: [] },
    products: {},
  },
  {
    id: 'solvang',
    street: 'Solvang 24',
    city: 'Trondheim',
    postal: '7013',
    mortgageState: 'has',
    savings: 215,
    insight: { stat: '+12%', text: 'in the last 12 months', prefix: 'Your apartment is up' },
    value: {
      estimated: '3 680 000 kr',
      boughtYear: 2020,
      boughtFor: '2 900 000 kr',
      growthValue: '+780 000 kr',
      perM2: '61 333 kr',
      m2: 60,
    },
    loan: {
      lenders: [
        { name: 'Sparebank 1', balance: '1 540 000 kr', rate: '6.05 %', ltv: 42, monthly: '9 120 kr', term: '19 yr 6 mo' },
      ],
    },
    products: {
      Insurance:  { provider: 'If Forsikring', desc: 'Apartment insurance with flexible coverage.', cta: 'Apply now' },
      Electricity:{ provider: 'Fortum', desc: 'Fixed-price electricity with no surprises.', cta: 'Switch provider' },
      Renovation: { provider: 'Axo Finans', desc: 'Renovation loan from 6.9% for qualified applicants.', cta: 'See offer' },
    },
  },
];

// Synthetic sparkline paths (percentage-based; scaled in SVG)
// Each key returns {points: [[x%,y%], ...], yLabels: [top,mid,bot], xLabels: [...]}
const CHART_DATA = {
  '5 mo': {
    pts: [[0,70],[20,60],[40,65],[60,45],[80,35],[100,20]],
    y: ['7.9M','7.4M','6.9M'],
    x: ['Nov','Dec','Jan','Feb','Mar','Apr'],
  },
  '12 mo': {
    pts: [[0,78],[9,74],[18,70],[27,62],[36,68],[45,55],[54,48],[63,52],[72,40],[81,32],[91,25],[100,18]],
    y: ['7.9M','6.9M','5.9M'],
    x: ['May','Jul','Sep','Nov','Jan','Mar'],
  },
  '3 yr': {
    pts: [[0,90],[10,82],[20,70],[30,68],[40,60],[50,48],[60,52],[70,40],[80,34],[90,26],[100,18]],
    y: ['7.9M','5.4M','3.0M'],
    x: ['2023','2024','2025','2026'],
  },
  'Max': {
    pts: [[0,95],[8,90],[16,85],[24,78],[32,70],[40,72],[48,60],[56,54],[64,45],[72,40],[80,30],[88,24],[100,16]],
    y: ['7.9M','4.0M','2.0M'],
    x: ['2012','2016','2020','2024'],
  },
};

window.PROPERTIES = PROPERTIES;
window.CHART_DATA = CHART_DATA;

// Deterministic tiny PRNG so per-property chart variants are stable.
function _seedRand(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) | 0;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 10000) / 10000;
  };
}

// Per-property chart variant: takes the base CHART_DATA and jitters
// intermediate Y values by ±6pp while keeping endpoints + labels stable.
// Produces a visually distinct trend per property so the chart line
// visibly morphs when switching tabs.
window.chartForProperty = function (propertyId) {
  const base = CHART_DATA;
  const rand = _seedRand(propertyId || 'default');
  const out = {};
  for (const [range, cfg] of Object.entries(base)) {
    const pts = cfg.pts.map(([x, y], i, arr) => {
      if (i === 0 || i === arr.length - 1) return [x, y];
      const jitter = (rand() - 0.5) * 12; // ±6
      return [x, Math.max(6, Math.min(94, y + jitter))];
    });
    out[range] = { ...cfg, pts };
  }
  return out;
};
