// Primary insurance offer card — Insplanet × Insurely (car page only).
// Ported 1:1 from the "Insplanet V1" placement-A mockup: orange CTA,
// gold "Potential savings" badge, Insplanet logo mark.
//
// Three states, driven off vehicle.insurancePrice.match:
//   no data / 'nomatch' → 'none'        connect prompt
//   'ontarget'          → 'no_savings'  already on the best price
//   'save'              → 'savings'     switch-and-save comparison

const INSPLANET_ORANGE = '#EB662D';
const INSPLANET_GOLD_FG = '#8A6220';

function kr(n, currency) {
  return Math.round(n).toLocaleString('en-US').replace(/,/g, ' ') + ' ' + currency;
}

// Shared state resolution — used by both the full card and the teaser so
// the headline and the card always agree.
function insuranceOfferState(vehicle) {
  const data = vehicle.insurancePrice;
  const dataState = !data || data.match === 'nomatch'
    ? 'none'
    : data.match === 'ontarget' ? 'no_savings' : 'savings';
  return {
    dataState,
    currMonthly: data ? data.yourMonthly : null,
    bestMonthly: data ? data.averageMonthly : null,
  };
}

// ─── Above-the-fold teaser ─────────────────────────────────────────────
// A slim, single-line hint shown near the top of the mobile car screen.
// Tapping it scrolls down to the full InsuranceOfferCard further down the
// page. Purely a navigational hint — no state of its own.
function InsuranceOfferTeaser({ vehicle, currency = 'kr', onClick }) {
  const { dataState, currMonthly, bestMonthly } = insuranceOfferState(vehicle);
  const headline = dataState === 'savings'
    ? `Save ${kr(Math.max(0, currMonthly - bestMonthly), currency)}/mo on insurance`
    : dataState === 'no_savings'
      ? `You're already on the best insurance price`
      : `See if you're paying too much for insurance`;

  return (
    <button onClick={onClick} style={{
      width: '100%', textAlign: 'left',
      display: 'flex', alignItems: 'center', gap: 10,
      background: '#fff',
      border: '1px solid #DDE5EF',
      borderRadius: 12,
      padding: '10px 14px',
      cursor: 'pointer',
      fontFamily: 'var(--font)',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 7, flexShrink: 0,
        background: INSPLANET_ORANGE, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700,
      }}>I</div>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--color-heading)' }}>
        {headline}
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: 'var(--color-body-muted)' }}>
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

window.InsuranceOfferTeaser = InsuranceOfferTeaser;

function InsuranceOfferCard({ vehicle, currency = 'kr' }) {
  const { dataState, currMonthly, bestMonthly } = insuranceOfferState(vehicle);
  const carLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const btnIns = {
    width: '100%', height: 46, borderRadius: 12,
    background: INSPLANET_ORANGE, color: '#fff',
    fontSize: 14, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  };
  const btnOutlineIns = {
    width: '100%', height: 46, borderRadius: 12,
    background: '#fff', color: 'var(--color-heading)',
    fontSize: 14, fontWeight: 600,
    border: '1px solid var(--color-border-subtle)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
  };
  const brandRow = (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <img
        src="assets/brands/insplanet.png"
        alt="Insplanet"
        style={{ width: 32, height: 32, borderRadius: 7, objectFit: 'cover', display: 'block', flexShrink: 0, marginTop: 2 }}
      />
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.3 }}>
          Bästa tillgängliga bilförsäkring
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--color-body-muted)', marginTop: 2 }}>
          I samarbete med Insplanet
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #DDE5EF',
      borderRadius: 14,
      boxShadow: '0 1px 3px rgba(30,37,47,0.05), 0 4px 14px rgba(30,37,47,0.04)',
      padding: 20,
      display: 'flex', flexDirection: 'column', gap: 14,
      fontFamily: 'var(--font)',
    }}>
      {brandRow}

      {dataState === 'none' && (
        <>
          <div style={{ fontSize: 13, color: 'var(--color-body)', lineHeight: 1.6 }}>
            We use your <span style={{ fontWeight: 700, color: 'var(--color-heading)' }}>{carLabel}</span> to find you an accurate price — not a generic estimate. Connect via Insurely in seconds.
          </div>
          <button style={btnIns}>Connect with Insurely</button>
          <button style={btnOutlineIns}>See prices without account</button>
        </>
      )}

      {dataState === 'no_savings' && (
        <>
          <div style={{ fontSize: 13, color: 'var(--color-body)', lineHeight: 1.6 }}>
            Vi har sökt i vår databas och det här är det lägsta priset vi hittade för den här bilmodellen.
          </div>
          <div data-source="Data source not yet defined — pending Insplanet/Insurely integration" style={{
            border: '1px solid rgba(26,144,112,0.25)', borderRadius: 10,
            background: 'rgba(26,144,112,0.07)', padding: '12px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-success)' }}>
              Lägsta pris
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap' }}>
              {kr(currMonthly, currency)}<span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-body-muted)' }}>/month</span>
            </span>
          </div>
          <button style={btnIns}>Jämför priser hos Insplanet</button>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            border: '1px solid var(--color-border-subtle)', borderRadius: 10,
            background: 'var(--color-surface-page)', padding: '10px 12px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1, color: 'var(--color-body-muted)' }}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
            <span style={{ fontSize: 12, color: 'var(--color-body-muted)', lineHeight: 1.5 }}>
              Vi skickar ditt registreringsnummer till Insplanet så att jämförelsen startar direkt.
            </span>
          </div>
        </>
      )}

      {dataState === 'savings' && (
        <>
          <div style={{ fontSize: 13, color: 'var(--color-body)', lineHeight: 1.6 }}>
            Vi har sökt i vår databas och det här är det lägsta priset vi hittade för den här bilmodellen.
          </div>
          <div data-source="Data source not yet defined — pending Insplanet/Insurely integration" style={{
            border: '1px solid rgba(196,148,60,0.3)', borderRadius: 10,
            background: 'rgba(196,148,60,0.06)', padding: '12px 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: INSPLANET_GOLD_FG }}>
              Lägsta pris
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--color-heading)', whiteSpace: 'nowrap' }}>
              {kr(bestMonthly, currency)}<span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-body-muted)' }}>/month</span>
            </span>
          </div>
          <button style={btnIns}>Jämför priser hos Insplanet</button>
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            border: '1px solid var(--color-border-subtle)', borderRadius: 10,
            background: 'var(--color-surface-page)', padding: '10px 12px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1, color: 'var(--color-body-muted)' }}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="currentColor"/>
            </svg>
            <span style={{ fontSize: 12, color: 'var(--color-body-muted)', lineHeight: 1.5 }}>
              Vi skickar ditt registreringsnummer till Insplanet så att jämförelsen startar direkt.
            </span>
          </div>
        </>
      )}
    </div>
  );
}

window.InsuranceOfferCard = InsuranceOfferCard;
