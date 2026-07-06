// Vehicle fixtures — Norway (default) and Sweden.
// Same shape as PROPERTIES so tabs/value card/loan card can reuse the same primitives.

const NO_VEHICLES = [
  {
    id: 'volvo-xc60',
    make: 'Volvo',
    model: 'XC60 Recharge',
    year: 2021,
    plate: 'EK 42819',
    mileage: 272400,
    fuel: 'Plug-in hybrid',
    nextInspection: 'Mar 2027',
    logo: 'assets/brands/volvo.png',
    mortgageState: 'has',
    savings: 0, // not used on car page — insurance banner uses its own number
    insuranceSavings: 185,
    value: {
      estimated: '385 000 kr',
      boughtYear: 2022,
      boughtFor: '520 000 kr',
      growthValue: '−135 000 kr',
      perM2: '', m2: 0,
    },
    loan: {
      lenders: [
        { name: 'Santander Consumer', balance: '210 000 kr', rate: '6.95 %', ltv: 55, monthly: '4 120 kr', term: '5 yr 2 mo' },
      ],
    },
    products: {
      Insurance:   { provider: 'Tryg Bilforsikring', desc: 'Fully comprehensive car insurance with 24/7 roadside — save up to 25% bundling with Uscore.', cta: 'Apply now' },
      Assistance:  { provider: 'NAF Veihjelp',       desc: 'Europe-wide roadside assistance from 89 kr/mo.', cta: 'See offer' },
      'Tire storage': { provider: 'Dekkmann',          desc: 'Winter-summer tire changes + storage at 30+ locations.', cta: 'Book now' },
    },
  },
  {
    id: 'tesla-m3',
    make: 'Tesla',
    model: 'Model 3 Long Range',
    year: 2023,
    plate: 'CV 11502',
    mileage: 41200,
    fuel: 'Electric',
    nextInspection: 'Sep 2028',
    logo: 'assets/brands/tesla.png',
    mortgageState: 'has',
    savings: 0,
    insuranceSavings: 240,
    value: {
      estimated: '412 000 kr',
      boughtYear: 2023,
      boughtFor: '495 000 kr',
      growthValue: '−83 000 kr',
      perM2: '', m2: 0,
    },
    loan: {
      lenders: [
        { name: 'Sparebank 1', balance: '260 000 kr', rate: '6.45 %', ltv: 63, monthly: '4 680 kr', term: '5 yr 10 mo' },
      ],
    },
    products: {
      Insurance:   { provider: 'If Bilforsikring',   desc: 'EV-tuned policy with home-charger coverage.', cta: 'Apply now' },
      Assistance:  { provider: 'Viking Assistance',  desc: 'Roadside and recovery across the Nordics.', cta: 'See offer' },
      'Tire storage': { provider: 'Vianor',            desc: 'Tire hotel with wash and balancing included.', cta: 'Book now' },
    },
  },
  {
    id: 'toyota-yaris',
    make: 'Toyota',
    model: 'Yaris Hybrid',
    year: 2019,
    plate: 'SR 8831',
    mileage: 118600,
    fuel: 'Hybrid',
    nextInspection: 'Jan 2026',
    logo: 'assets/brands/toyota.png',
    mortgageState: 'none',
    savings: 0,
    insuranceSavings: 0,
    value: {
      estimated: '148 000 kr',
      boughtYear: 2019,
      boughtFor: '235 000 kr',
      growthValue: '−87 000 kr',
      perM2: '', m2: 0,
    },
    loan: { lenders: [] },
    products: {
      Insurance:   { provider: 'Gjensidige',         desc: 'Reliable, widely-used basic coverage with good bonus terms.', cta: 'Apply now' },
      Assistance:  { provider: 'Falck',              desc: 'Roadside service with fast response in urban areas.', cta: 'See offer' },
      'Tire storage': { provider: 'Euromaster',        desc: 'Seasonal tire storage + free check-up.', cta: 'Book now' },
    },
  },
  {
    id: 'bmw-330',
    make: 'BMW',
    model: '330e xDrive',
    year: 2020,
    plate: 'BP 73104',
    mileage: 94300,
    fuel: 'Plug-in hybrid',
    nextInspection: 'Aug 2026',
    logo: 'assets/brands/bmw.png',
    mortgageState: 'has',
    savings: 0,
    insuranceSavings: 150,
    value: {
      estimated: '298 000 kr',
      boughtYear: 2021,
      boughtFor: '445 000 kr',
      growthValue: '−147 000 kr',
      perM2: '', m2: 0,
    },
    loan: {
      lenders: [
        { name: 'DNB Bilfinans', balance: '165 000 kr', rate: '7.10 %', ltv: 55, monthly: '3 280 kr', term: '4 yr 6 mo' },
      ],
    },
    products: {
      Insurance:   { provider: 'Tryg Bilforsikring', desc: 'Comprehensive coverage with optional glass and tire add-ons.', cta: 'Apply now' },
      Assistance:  { provider: 'NAF Veihjelp',       desc: 'Europe-wide roadside from 89 kr/mo.', cta: 'See offer' },
      'Tire storage': { provider: 'Dekkmann',          desc: 'Seasonal tire changes and storage.', cta: 'Book now' },
    },
  },
  {
    id: 'skoda-octavia',
    make: 'Skoda',
    model: 'Octavia Combi',
    year: 2020,
    plate: 'KH 20194',
    mileage: 88900,
    fuel: 'Diesel',
    nextInspection: 'Nov 2026',
    logo: null,
    mortgageState: 'none',
    savings: 0,
    insuranceSavings: 0,
    value: {
      estimated: '210 000 kr',
      boughtYear: 2020,
      boughtFor: '310 000 kr',
      growthValue: '−100 000 kr',
      perM2: '', m2: 0,
    },
    loan: { lenders: [] },
    products: {
      Insurance:   { provider: 'Gjensidige',  desc: 'Reliable, widely-used basic coverage with good bonus terms.', cta: 'Apply now' },
      Assistance:  { provider: 'Falck',       desc: 'Roadside service with fast response in urban areas.', cta: 'See offer' },
      'Tire storage': { provider: 'Euromaster', desc: 'Seasonal tire storage + free check-up.', cta: 'Book now' },
    },
  },
];

// Sweden mirrors NO but with SEK + SE-specific partners + Besiktning
const SE_VEHICLES = NO_VEHICLES.map(v => {
  // Swap currency on displayed money fields from "kr" -> "SEK"
  const swap = (s) => typeof s === 'string' ? s.replace(/\bkr\b/g, 'SEK') : s;
  // Per-vehicle insurance price match (Sweden only).
  // match: 'save' = user's current price > average (potential saving)
  //        'ontarget' = user is around the average (no clear saving)
  //        'nomatch' = no partner data for this car (component hidden)
  const INSURANCE_BY_ID = {
    'volvo-xc60':   { match: 'save',     policies: 187, yourMonthly: 1420, averageMonthly: 1190, rangeMin: 720,  rangeMax: 2940 },
    'tesla-m3':     { match: 'save',     policies: 412, yourMonthly: 1685, averageMonthly: 1310, rangeMin: 820,  rangeMax: 3120 },
    'toyota-yaris': { match: 'ontarget', policies: 133, yourMonthly: 540,  averageMonthly: 555,  rangeMin: 320,  rangeMax: 1180 },
    'bmw-330':      { match: 'nomatch',  policies: 0,   yourMonthly: 0,    averageMonthly: 0,    rangeMin: 0,    rangeMax: 0 },
  };
  const i = INSURANCE_BY_ID[v.id];
  const insurancePrice = i ? {
    match: i.match,
    policies: i.policies,
    yourMonthly: i.yourMonthly,
    yourYear: i.yourMonthly * 12,
    averageMonthly: i.averageMonthly,
    averageYear: i.averageMonthly * 12,
    savingMonthly: Math.max(0, i.yourMonthly - i.averageMonthly),
    savingYear: Math.max(0, (i.yourMonthly - i.averageMonthly) * 12),
    rangeMin: i.rangeMin,
    rangeMax: i.rangeMax,
  } : null;
  return {
    ...v,
    insurancePrice,
    nextInspection: v.nextInspection, // dates are fine; same format
    value: {
      ...v.value,
      estimated: swap(v.value.estimated),
      boughtFor: swap(v.value.boughtFor),
      growthValue: swap(v.value.growthValue),
    },
    loan: {
      lenders: v.loan.lenders.map(l => ({
        ...l,
        balance: swap(l.balance),
        monthly: swap(l.monthly),
        // Map NO lenders -> plausible SE ones
        name: ({
          'Santander Consumer': 'Santander Consumer SE',
          'Sparebank 1':        'SEB Billån',
          'DNB Bilfinans':      'Handelsbanken Billån',
        })[l.name] || l.name,
      })),
    },
    products: {
      Insurance:   { provider: 'Länsförsäkringar Bil', desc: 'Swedish car insurance with broad coverage — bundle with home for discount.', cta: 'Apply now' },
      Assistance:  { provider: 'Assistancekåren',      desc: 'Nordic roadside network, dispatched 24/7.', cta: 'See offer' },
      'Tire storage': { provider: 'Däckia',              desc: 'Tire hotel and seasonal changes at 180+ stations.', cta: 'Book now' },
    },
  };
});

window.NO_VEHICLES = NO_VEHICLES;
window.SE_VEHICLES = SE_VEHICLES;

// Synthetic depreciation sparkline data — same shape as CHART_DATA
const CAR_CHART_DATA = {
  '5 mo': {
    pts: [[0,18],[20,22],[40,28],[60,32],[80,40],[100,45]],
    y: ['500k','430k','360k'],
    x: ['Nov','Dec','Jan','Feb','Mar','Apr'],
  },
  '12 mo': {
    pts: [[0,8],[9,12],[18,18],[27,22],[36,26],[45,32],[54,36],[63,40],[72,44],[81,48],[91,52],[100,56]],
    y: ['520k','430k','340k'],
    x: ['May','Jul','Sep','Nov','Jan','Mar'],
  },
  '3 yr': {
    pts: [[0,4],[10,10],[20,18],[30,26],[40,34],[50,42],[60,48],[70,54],[80,60],[90,66],[100,72]],
    y: ['520k','360k','200k'],
    x: ['2023','2024','2025','2026'],
  },
  'Max': {
    pts: [[0,2],[8,8],[16,16],[24,24],[32,32],[40,40],[48,48],[56,54],[64,60],[72,66],[80,72],[88,78],[100,84]],
    y: ['520k','320k','120k'],
    x: ['2021','2022','2024','2026'],
  },
};
window.CAR_CHART_DATA = CAR_CHART_DATA;

// Per-vehicle chart variant — mirrors chartForProperty, jitters intermediate
// Y values so each car's depreciation line morphs distinctly between tabs.
window.chartForVehicle = function (vehicleId) {
  const base = CAR_CHART_DATA;
  // Reuse the simple hash-seeded PRNG style
  let s = 0;
  const seed = vehicleId || 'default';
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) | 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) % 10000) / 10000;
  };
  const out = {};
  for (const [range, cfg] of Object.entries(base)) {
    const pts = cfg.pts.map(([x, y], i, arr) => {
      if (i === 0 || i === arr.length - 1) return [x, y];
      const jitter = (rand() - 0.5) * 12;
      return [x, Math.max(6, Math.min(94, y + jitter))];
    });
    out[range] = { ...cfg, pts };
  }
  return out;
};
