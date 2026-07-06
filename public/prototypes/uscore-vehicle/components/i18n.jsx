// i18n helper for the prototype.
//
// Principle: prototype text is English by default. The "Native language"
// tweak toggle, when on, swaps visible strings to the selected country's
// native language (Swedish for SE, Norwegian Bokmål for NO).
//
// Usage:
//   const lang = getLang(country, nativeLanguage);   // 'en' | 'sv' | 'nb'
//   tr('carInfoNote', lang)
//   tr('sincePurchase', lang, { year: 2022 })        // "{year}" substitution
//
// When a key is missing in a target language, it falls back to English.

const TRANSLATIONS = {
  // ── Estimated value card ────────────────────────────────────────────
  estimatedValue:   { en: 'Estimated value',        sv: 'Estimerat värde',     nb: 'Estimert verdi' },
  sincePurchase:    { en: 'since purchase in {year}', sv: 'sedan köp {year}',  nb: 'siden kjøp {year}' },
  nextControl:      { en: 'Next control',            sv: 'Nästa besiktning',    nb: 'Neste EU-kontroll' },
  modelYearLabel:   { en: '{year} model',             sv: '{year} års modell',  nb: '{year}-modell' },
  purchaseTooltip:  {
    en: 'You bought this vehicle for {price} in {year}.',
    sv: 'Du köpte denna bil för {price} år {year}.',
    nb: 'Du kjøpte dette kjøretøyet for {price} i {year}.',
  },
  carInfoNote: {
    en: 'Car value is calculated based on car type, fuel, location and market trends.',
    sv: 'Bilvärdet beräknas utifrån biltyp, drivmedel, geografisk plats och marknadstrender.',
    nb: 'Bilverdien beregnes ut fra biltype, drivstoff, plassering og markedstrender.',
  },

  // ── Chart ──────────────────────────────────────────────────────────
  history:          { en: 'History',                sv: 'Historik',            nb: 'Historikk' },
  forecast:         { en: 'Forecast',               sv: 'Prognos',             nb: 'Prognose' },
  now:              { en: 'Now',                    sv: 'Nu',                  nb: 'Nå' },
  monthsShort:      { en: 'mo',                     sv: 'mån',                 nb: 'mnd' },

  // ── Loan card ──────────────────────────────────────────────────────
  yourCarLoan:      { en: 'Your car loan',          sv: 'Ditt billån',         nb: 'Ditt billån' },
  lender:           { en: 'Lender',                 sv: 'Långivare',           nb: 'Långiver' },
  balance:          { en: 'Balance',                sv: 'Saldo',               nb: 'Saldo' },
  interestRate:     { en: 'Interest rate',          sv: 'Ränta',               nb: 'Rente' },
  loanToValue:      { en: 'Loan-to-value',          sv: 'Belåningsgrad',       nb: 'Belåningsgrad' },
  monthlyPayment:   { en: 'Monthly payment',        sv: 'Månadsbetalning',     nb: 'Månedlig betaling' },
  remainingTerm:    { en: 'Remaining term',         sv: 'Återstående löptid',  nb: 'Gjenværende løpetid' },

  // ── Undecided prompt / loan presence ───────────────────────────────
  haveLoanQuestion: {
    en: 'Do you have a loan on this car?',
    sv: 'Har du lån på denna bil?',
    nb: 'Har du lån på denne bilen?',
  },
  haveLoanBody: {
    en: 'Sharing this gives us a fuller picture of your finances so we can surface more relevant insurance, refinancing and partner offers for you.',
    sv: 'Att dela detta ger oss en fullare bild av din ekonomi så vi kan visa mer relevanta försäkrings-, refinansierings- och partnererbjudanden.',
    nb: 'Å dele dette gir oss et fullere bilde av økonomien din slik at vi kan vise mer relevante forsikrings-, refinansierings- og partnertilbud.',
  },
  yes:              { en: 'Yes',                    sv: 'Ja',                  nb: 'Ja' },
  no:               { en: 'No',                     sv: 'Nej',                 nb: 'Nei' },
  noLoanOnCar:      { en: 'No loan on this car',    sv: 'Inget lån på denna bil', nb: 'Ingen lån på denne bilen' },
  noLoanBody: {
    en: 'You previously told us you don\u2019t have a loan on this car. If that\u2019s changed, you can add one below.',
    sv: 'Du har tidigare uppgett att du inte har något lån på den här bilen. Om det har ändrats kan du lägga till ett nedan.',
    nb: 'Du har tidligere oppgitt at du ikke har lån på denne bilen. Hvis det har endret seg, kan du legge til et lån under.',
  },
  addLoan: { en: 'Add loan', sv: 'Lägg till lån', nb: 'Legg til lån' },

  // ── Popular products card ──────────────────────────────────────────
  popularProductsCar: {
    en: 'Popular products for this car',
    sv: 'Populära produkter för denna bil',
    nb: 'Populære produkter for denne bilen',
  },
  applyWith:        { en: 'Apply with {brand}',     sv: 'Ansök med {brand}',   nb: 'Søk med {brand}' },
  offersDisclaimer: {
    en: 'Offers from Uscore partners. Applying is non-binding — rate may vary based on credit assessment.',
    sv: 'Erbjudanden från Uscore-partners. Att ansöka är icke-bindande — räntan kan variera utifrån kreditbedömning.',
    nb: 'Tilbud fra Uscore-partnere. Å søke er uforpliktende — renten kan variere basert på kredittvurdering.',
  },

  // ── Insurance savings banner (car) ─────────────────────────────────
  switchInsurance:  {
    en: 'Switch insurance, save {amount} {currency}/mo',
    sv: 'Byt försäkring, spara {amount} {currency}/mån',
    nb: 'Bytt forsikring, spar {amount} {currency}/mnd',
  },
  seeNewOffers:     {
    en: 'See new offers for this car',
    sv: 'Se nya erbjudanden för denna bil',
    nb: 'Se nye tilbud for denne bilen',
  },

  // ── Self-report dev modal (Yes-path placeholder) ───────────────────
  selfReportDevTitle: {
    en: 'Self-report loan',
    sv: 'Rapportera ditt lån',
    nb: 'Rapporter ditt lån',
  },
  selfReportDevNote: {
    en: 'In production, this opens the existing self-report modal (Bank / Loan / Interest rate). For this prototype, clicking Continue simulates a successful save with mock loan data so you can see the resulting Loan card.',
    sv: 'I produktion öppnar detta den befintliga själv-rapport-modalen (Bank / Lån / Ränta). I denna prototyp simulerar Fortsätt en lyckad sparning med mock-data så att du kan se Lånkortet.',
    nb: 'I produksjon åpner dette den eksisterende selv-rapport-modalen (Bank / Lån / Rente). I denne prototypen simulerer Fortsett en vellykket lagring med mock-data slik at du kan se Lånkortet.',
  },
  continueAction: { en: 'Continue', sv: 'Fortsätt',  nb: 'Fortsett' },
  cancelAction:   { en: 'Cancel',   sv: 'Avbryt',    nb: 'Avbryt' },
  carLoanWord:      { en: 'Car loan', sv: 'Billån', nb: 'Billån' },
  mortgageLoanWord: { en: 'Mortgage', sv: 'Bolån',  nb: 'Boliglån' },
  loanAmountLabel:  { en: 'Loan',     sv: 'Lån',    nb: 'Lån' },
  bankLabel:        { en: 'Bank',     sv: 'Bank',   nb: 'Bank' },
  undoAction:       { en: 'Undo',     sv: 'Ångra',  nb: 'Angre' },
  saveChangesAction:{ en: 'Save changes', sv: 'Spara ändringar', nb: 'Lagre endringer' },

  // ── State A — empty car state (SE) ─────────────────────────────────
  noVehicles:       { en: 'No vehicles', sv: 'Inga fordon', nb: 'Ingen kjøretøy' },
  yourVehicles:     { en: 'Your vehicles', sv: 'Dina fordon', nb: 'Dine kjøretøy' },
  emptyVehicleTip: {
    en: 'You have no vehicles registered to you. Contact our partner for a great offer.',
    sv: 'Du har inga fordon registrerade på dig. Kontakta vår samarbetspartner för ett bra erbjudande.',
    nb: 'Du har ingen kjøretøy registrert på deg. Kontakt vår samarbeidspartner for et godt tilbud.',
  },
  seeBilloansOffers: {
    en: 'See car loan offers',
    sv: 'Se billånserbjudanden',
    nb: 'Se billånstilbud',
  },
  productsForYourCar: {
    en: 'Products for your car',
    sv: 'Produkter för din bil',
    nb: 'Produkter for bilen din',
  },
  axoBody: {
    en: 'Unsecured car loans up to 600,000 kr. Quick decision and flexible terms.',
    sv: 'Vi erbjuder billån utan säkerhet upp till 600 000 kr. Snabbt besked och flexibla villkor.',
    nb: 'Vi tilbyr billån uten sikkerhet opptil 600 000 kr. Rask beslutning og fleksible vilkår.',
  },
  applyNow: { en: 'Apply now', sv: 'Ansök nu', nb: 'Søk nå' },

  // ── State A — empty house state ────────────────────────────────────
  noHomes: { en: 'No homes', sv: 'Inga bostäder', nb: 'Ingen boliger' },
  emptyHomeTip: {
    en: 'You have no homes registered to you. Add your address to get tailored insights and offers.',
    sv: 'Du har inga bostäder registrerade på dig. Lägg till din adress för skräddarsydda insikter och erbjudanden.',
    nb: 'Du har ingen boliger registrert på deg. Legg til adressen din for tilpassede innsikter og tilbud.',
  },
  addYourHome: {
    en: 'Add your home',
    sv: 'Lägg till din bostad',
    nb: 'Legg til boligen din',
  },
  productsForYourHome: {
    en: 'Products for your home',
    sv: 'Produkter för din bostad',
    nb: 'Produkter for boligen din',
  },
  axoHomeBody: {
    en: 'Renovation loans up to 600,000 kr. Quick decision and flexible terms.',
    sv: 'Renoveringslån upp till 600 000 kr. Snabbt besked och flexibla villkor.',
    nb: 'Oppussingslån opptil 600 000 kr. Rask beslutning og fleksible vilkår.',
  },

  // ── Empty state — single "Looking for a new X?" offer card ────────
  lookingForNewHome: {
    en: 'Looking for a new home?',
    sv: 'Letar du efter ett nytt hem?',
    nb: 'Ser du etter en ny bolig?',
  },
  lookingForNewCar: {
    en: 'Looking for a new car?',
    sv: 'Letar du efter en ny bil?',
    nb: 'Ser du etter en ny bil?',
  },
  lookingForHomeBody: {
    en: 'Get a pre-approved mortgage quote in minutes with our partner — no commitment.',
    sv: 'Få ett förhandsgodkänt bolåneerbjudande på minuter med vår partner — utan förpliktelse.',
    nb: 'Få et forhåndsgodkjent boliglånstilbud på minutter med vår partner — uten forpliktelse.',
  },
  lookingForCarBody: {
    en: 'Compare car loans from our partners and get a decision in minutes — no commitment.',
    sv: 'Jämför billån från våra partners och få besked på minuter — utan förpliktelse.',
    nb: 'Sammenlign billån fra våre partnere og få svar på minutter — uten forpliktelse.',
  },
  seeOffers: { en: 'See offers', sv: 'Se erbjudanden', nb: 'Se tilbud' },
  noDataFound: { en: 'No data found', sv: 'Ingen data hittades', nb: 'Ingen data funnet' },

  // ── App tab bar (top) ──────────────────────────────────────────────
  tabOverview: { en: 'Overview',  sv: 'Översikt',    nb: 'Oversikt' },
  tabHome:     { en: 'Home',      sv: 'Bostad',      nb: 'Bolig' },
  tabVehicle:  { en: 'Vehicle',   sv: 'Fordon',      nb: 'Kjøretøy' },
  tabDebt:     { en: 'Debt',      sv: 'Skuld',       nb: 'Gjeld' },
  tabIncome:   { en: 'Income',    sv: 'Inkomst',     nb: 'Inntekt' },

  // ── Bottom nav ─────────────────────────────────────────────────────
  navDashboard: { en: 'Dashboard', sv: 'Översikt',    nb: 'Oversikt' },
  navOffers:    { en: 'Offers',    sv: 'Erbjudanden', nb: 'Tilbud' },
  navMenu:      { en: 'Menu',      sv: 'Meny',        nb: 'Meny' },

  // ── DataRow labels & house loan card ───────────────────────────────
  yourMortgage:    { en: 'Your mortgage', sv: 'Ditt bolån', nb: 'Ditt boliglån' },
  boughtFor:       { en: 'Bought for',    sv: 'Köpt för',    nb: 'Kjøpt for' },
  valuePerM2:      { en: 'Value per m²',  sv: 'Värde per m²', nb: 'Verdi per m²' },
  valuePerM2Tooltip: { en: 'Estimated at {value} per m².', sv: 'Estimerat till {value} per m².', nb: 'Estimert til {value} per m².' },
  sinceYear:       { en: 'since {year}',  sv: 'sedan {year}', nb: 'siden {year}' },
  sincePurchaseY:  { en: 'since purchase in {year}', sv: 'sedan köp {year}', nb: 'siden kjøp i {year}' },
  yearLabel:       { en: 'Year',          sv: 'År',          nb: 'År' },

  // ── LTV band labels ────────────────────────────────────────────────
  ltvLow:        { en: 'Low',        sv: 'Låg',          nb: 'Lav' },
  ltvNormal:     { en: 'Normal',     sv: 'Normal',       nb: 'Normal' },
  ltvHigh:       { en: 'High',       sv: 'Hög',          nb: 'Høy' },
  ltvUnderwater: { en: 'Underwater', sv: 'Övervärderat', nb: 'Negativ egenkapital' },
  ltvUnderwaterWarn: {
    en: 'You owe more than the property is worth.',
    sv: 'Du är skyldig mer än bostaden är värd.',
    nb: 'Du skylder mer enn boligen er verdt.',
  },

  // ── LoanMenu items ─────────────────────────────────────────────────
  editMortgage: { en: 'Edit mortgage', sv: 'Redigera bolån', nb: 'Endre boliglån' },
  addMortgage:  { en: 'Add mortgage',  sv: 'Lägg till bolån', nb: 'Legg til boliglån' },
  editCarLoan:  { en: 'Edit car loan', sv: 'Redigera billån',  nb: 'Endre billån' },
  addCarLoan:   { en: 'Add car loan',  sv: 'Lägg till billån',  nb: 'Legg til billån' },

  // ── House: mortgage undecided / no-mortgage ────────────────────────
  haveMortgageQuestion: {
    en: 'Do you have a mortgage on this home?',
    sv: 'Har du bolån på denna bostad?',
    nb: 'Har du boliglån på denne boligen?',
  },
  haveMortgageBody: {
    en: 'We can show you monthly cost, loan-to-value and potential savings from refinancing — as soon as we know if this home has a loan.',
    sv: 'Vi kan visa månadskostnad, belåningsgrad och potentiella besparingar från refinansiering — så snart vi vet om denna bostad har ett lån.',
    nb: 'Vi kan vise deg månedlig kostnad, belåningsgrad og potensielle besparelser ved refinansiering — så snart vi vet om denne boligen har lån.',
  },
  noMortgageOn: {
    en: 'No mortgage on {street}',
    sv: 'Inget bolån på {street}',
    nb: 'Ingen boliglån på {street}',
  },
  noMortgageBody: {
    en: 'You previously told us you don\u2019t have a mortgage on this home. If that\u2019s changed, you can add one below.',
    sv: 'Du har tidigare uppgett att du inte har något bolån på det här boendet. Om det har ändrats kan du lägga till ett nedan.',
    nb: 'Du har tidligere oppgitt at du ikke har boliglån på denne boligen. Hvis det har endret seg, kan du legge til et lån under.',
  },
  noLoanOnVehicle: {
    en: 'No loan on {make} {model}',
    sv: 'Inget lån på {make} {model}',
    nb: 'Ingen lån på {make} {model}',
  },

  // ── House savings banner ───────────────────────────────────────────
  saveAmountPerMonth: {
    en: 'You could save {amount} kr/mo',
    sv: 'Du kan spara {amount} kr/mån',
    nb: 'Du kan spare {amount} kr/mnd',
  },
  refinanceMortgage: {
    en: 'Refinance this mortgage',
    sv: 'Refinansiera detta bolån',
    nb: 'Refinansier dette boliglånet',
  },

  // ── House: popular products card ───────────────────────────────────
  popularProductsHome: {
    en: 'Popular products for this home',
    sv: 'Populära produkter för denna bostad',
    nb: 'Populære produkter for denne boligen',
  },
  popularProductsHomeDesktop: {
    en: 'Popular products for your home',
    sv: 'Populära produkter för din bostad',
    nb: 'Populære produkter for boligen din',
  },

  // ── Asset pills header titles + subtitles ──────────────────────────
  yourHomes: { en: 'Your homes', sv: 'Dina bostäder', nb: 'Dine boliger' },
  homesSubtitle: {
    en: 'An overview of your property wealth and mortgages.',
    sv: 'En översikt över din fastighetsförmögenhet och bolån.',
    nb: 'En oversikt over din boligformue og dine boliglån.',
  },
  vehiclesSubtitle: {
    en: 'An overview of your vehicles and car loans.',
    sv: 'En översikt över dina fordon och billån.',
    nb: 'En oversikt over kjøretøyene og billånene dine.',
  },
  morePill: { en: '+{count} more', sv: '+{count} till', nb: '+{count} til' },
  otherVehicles: { en: 'Other vehicles', sv: 'Andra fordon', nb: 'Andre kjøretøy' },

  // ── Address card ───────────────────────────────────────────────────
  noAddressOnFile: {
    en: 'No address on file',
    sv: 'Ingen adress registrerad',
    nb: 'Ingen adresse registrert',
  },
  noAddressBody: {
    en: 'Add your home address so we can match you with cadastre data and show tailored insights.',
    sv: 'Lägg till din hemadress så att vi kan matcha dig med fastighetsdata och visa skräddarsydda insikter.',
    nb: 'Legg til hjemmeadressen din slik at vi kan matche deg med kadasterdata og vise tilpassede innsikter.',
  },
  addAddress: { en: 'Add address', sv: 'Lägg till adress', nb: 'Legg til adresse' },
  addrRegisteredHere: {
    en: 'We can see that you are registered living at this address.',
    sv: 'Vi ser att du är folkbokförd på denna adress.',
    nb: 'Vi ser at du er registrert som boende på denne adressen.',
  },
  addrCadastreMatch: {
    en: 'Does any of these cadastre keys match this address?',
    sv: 'Stämmer någon av dessa fastighetsnycklar med adressen?',
    nb: 'Stemmer noen av disse kadasternøklene med denne adressen?',
  },
  addrOwner: {
    en: 'I am the owner of this property',
    sv: 'Jag äger denna fastighet',
    nb: 'Jeg eier denne eiendommen',
  },
  addrRenter: {
    en: 'I am only renting this property',
    sv: 'Jag hyr endast denna fastighet',
    nb: 'Jeg leier kun denne eiendommen',
  },
  addrNoneMatch: {
    en: 'None of these matches',
    sv: 'Ingen av dessa stämmer',
    nb: 'Ingen av disse stemmer',
  },
  addrMenuNotRented: {
    en: 'I do not rent this property',
    sv: 'Jag hyr inte denna fastighet',
    nb: 'Jeg leier ikke denne eiendommen',
  },

  // ── Offer banner chrome ────────────────────────────────────────────
  discountLabel: { en: 'Discount', sv: 'Rabatt', nb: 'Rabatt' },
  readDetails:   { en: 'Read details', sv: 'Läs mer', nb: 'Les mer' },
  dismissOffer:  { en: 'Dismiss offer', sv: 'Stäng erbjudande', nb: 'Lukk tilbud' },

  // ── Banner content ─────────────────────────────────────────────────
  bannerElectricityTitle: {
    en: 'Cut your monthly costs in electricity during winter',
    sv: 'Sänk dina månadskostnader för el under vintern',
    nb: 'Reduser månedlige strømkostnader gjennom vinteren',
  },
  bannerElectricitySub: {
    en: 'With Tibber spot price',
    sv: 'Med Tibbers spotpris',
    nb: 'Med Tibbers spotpris',
  },
  bannerInsuranceTitle: {
    en: 'Pay less for your content insurance',
    sv: 'Betala mindre för din hemförsäkring',
    nb: 'Betal mindre for innboforsikringen din',
  },
  bannerInsuranceSub: {
    en: 'For Uscore members with Tryg Insurance until November',
    sv: 'För Uscore-medlemmar med Tryg Försäkring fram till november',
    nb: 'For Uscore-medlemmer med Tryg Forsikring frem til november',
  },
  bannerEUInspectionTitle: {
    en: 'You\u2019ve got an EU inspection next month',
    sv: 'Du har besiktning nästa månad',
    nb: 'Du har EU-kontroll neste måned',
  },
  bannerEUInspectionSub: {
    en: 'In NAF car workshops',
    sv: 'Hos NAF bilverkstäder',
    nb: 'Hos NAF bilverksteder',
  },
  bannerWinterTiresTitle: {
    en: 'Winter is coming',
    sv: 'Vintern är på väg',
    nb: 'Vinteren kommer',
  },
  bannerWinterTiresSub: {
    en: 'On snow tires in Dekkmann stores until November',
    sv: 'På vinterdäck i Dekkmann-butiker fram till november',
    nb: 'På vinterdekk i Dekkmann-butikker frem til november',
  },

  // ── Empty car-state extra body string (was inline English) ─────────
  yourVehiclesSubtitle: {
    en: 'An overview of your vehicles and car loans.',
    sv: 'En översikt över dina fordon och billån.',
    nb: 'En oversikt over kjøretøyene og billånene dine.',
  },
};

function getLang(country, nativeLanguage) {
  if (!nativeLanguage) return 'en';
  if (country === 'SE') return 'sv';
  if (country === 'NO') return 'nb';
  return 'en';
}

function tr(key, lang, vars) {
  const entry = TRANSLATIONS[key];
  if (!entry) return key; // fail loudly with the missing key
  let str = entry[lang] || entry.en || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    }
  }
  return str;
}

window.tr = tr;
window.getLang = getLang;
window.TRANSLATIONS = TRANSLATIONS;
