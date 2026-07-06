// Car insurance price comparison (Sweden only).
// Three considered variations, each with its own design point of view.
//
//   A · Editorial    — copy-led. Saving headline + tight inline mini-bar.
//   B · Receipt      — financial-document feel. Two columns: Your policy / Market avg.
//   C · Percentile   — single neutral scale with a percentile read ("more than 73%").
//
// Each variant is a self-contained card. No nested coloured boxes.
// Visible states: 'save' and 'ontarget' ('nomatch' is hidden by parent).

const fmtSEK = (n) => Math.round(n).toLocaleString('en-US').replace(/,/g, ' ');

function CarInsuranceCompare({ vehicle, viz = 'A', variant = 'desktop' }) {
  const data = vehicle.insurancePrice;
  if (!data || data.match === 'nomatch') return null;

  const isMobile = variant === 'mobile';
  const isSave = data.match === 'save';

  const Body = viz === 'B' ? VizReceipt : viz === 'C' ? VizPercentile : VizEditorial;

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: isMobile ? 18 : 24,
      fontFamily: 'var(--font)',
    }}>
      <Body data={data} isSave={isSave} vehicle={vehicle} isMobile={isMobile}/>
    </div>
  );
}

// Tiny shared CTA + footer
function CompareCta({ isMobile }) {
  return (
    <>
      <button style={{
        width: '100%',
        height: isMobile ? 46 : 50,
        marginTop: isMobile ? 16 : 20,
        borderRadius: 10,
        background: 'var(--color-cta)',
        color: '#fff',
        fontSize: isMobile ? 14 : 15,
        fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        cursor: 'pointer',
      }}>
        Compare car insurance {window.Icon.arrowR('currentColor', 16)}
      </button>
      <div style={{
        marginTop: 10, fontSize: 11,
        color: 'var(--color-body-muted)',
        lineHeight: 1.45, textAlign: 'center',
      }}>
        Indicative prices via Zmarta. Final price depends on driver and coverage.
      </div>
    </>
  );
}

// ─── A · Editorial ──────────────────────────────────────────────────
// Copy-led, single-column, no nested boxes. Hero is the saving (or the
// month-price for ontarget). A 6px inline track sits below the headline:
// avg tick + you tick + a coloured bar bridging them.
function VizEditorial({ data, isSave, vehicle, isMobile }) {
  const accent = isSave ? 'var(--color-success)' : 'var(--color-info)';

  const headline = isSave
    ? `Save up to ${fmtSEK(data.savingMonthly)} kr / month`
    : `You're around ${fmtSEK(data.yourMonthly)} kr / month`;
  const sub = isSave
    ? `That's ~${fmtSEK(data.savingYear)} kr per year, based on what other drivers pay for a ${vehicle.make} ${vehicle.model.split(' ')[0]}.`
    : `In line with what other drivers pay for a ${vehicle.make} ${vehicle.model.split(' ')[0]}. Worth checking again — premiums move every year.`;

  // Track positions
  const span = data.rangeMax - data.rangeMin;
  const yourPct = ((data.yourMonthly * 12 - data.rangeMin) / span) * 100;
  const avgPct  = ((data.averageMonthly * 12 - data.rangeMin) / span) * 100;
  const left = Math.min(yourPct, avgPct);
  const width = Math.abs(yourPct - avgPct);

  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
        color: 'var(--color-body-muted)', textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Car insurance · {data.policies} policies analysed
      </div>

      <div style={{
        fontSize: isMobile ? 22 : 26,
        fontWeight: 700, lineHeight: 1.15,
        color: 'var(--color-heading)',
        letterSpacing: -0.4,
        marginBottom: 8,
        textWrap: 'balance',
      }}>
        {headline}
      </div>

      <div style={{
        fontSize: 13.5, lineHeight: 1.5,
        color: 'var(--color-body)',
        marginBottom: 18,
        textWrap: 'pretty',
      }}>
        {sub}
      </div>

      {/* Inline mini-track */}
      <div style={{ position: 'relative', height: 38, marginBottom: 6 }}>
        {/* base track */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 16, height: 6,
          borderRadius: 3, background: 'var(--color-surface-page)',
        }}/>
        {/* delta segment */}
        {isSave && width > 0.5 && (
          <div style={{
            position: 'absolute', left: `${left}%`, width: `${width}%`,
            top: 16, height: 6, borderRadius: 3, background: accent,
          }}/>
        )}
        {/* avg tick */}
        <Tick pct={avgPct} label="market avg" sub={`${fmtSEK(data.averageMonthly)} kr`} variant="ghost"/>
        {/* you tick */}
        <Tick pct={yourPct} label="you" sub={`${fmtSEK(data.yourMonthly)} kr`} variant="solid" color={accent} below/>
      </div>

      <CompareCta isMobile={isMobile}/>
    </div>
  );
}

function Tick({ pct, label, sub, variant, color, below }) {
  const align = pct < 22 ? 'flex-start' : pct > 78 ? 'flex-end' : 'center';
  const transform = pct < 22 ? 'translateX(0)' : pct > 78 ? 'translateX(-100%)' : 'translateX(-50%)';
  return (
    <div style={{
      position: 'absolute',
      left: `${pct}%`,
      top: 11, bottom: 0,
      transform: 'translateX(-1px)',
    }}>
      {/* tick line */}
      <div style={{
        width: 2, height: 16,
        background: variant === 'solid' ? color : 'var(--color-body-muted)',
        borderRadius: 1,
      }}/>
      {/* label */}
      <div style={{
        position: 'absolute',
        ...(below ? { top: 20 } : { bottom: 20 }),
        left: 1,
        transform,
        whiteSpace: 'nowrap',
        textAlign: align === 'flex-end' ? 'right' : align === 'flex-start' ? 'left' : 'center',
        lineHeight: 1.2,
      }}>
        <div style={{
          fontSize: 10, letterSpacing: 0.4, textTransform: 'uppercase',
          color: 'var(--color-body-muted)', fontWeight: 600,
        }}>{label}</div>
        <div style={{
          fontSize: 11.5, fontWeight: 700,
          color: variant === 'solid' ? color : 'var(--color-heading)',
        }}>{sub}</div>
      </div>
    </div>
  );
}

// ─── B · Receipt ────────────────────────────────────────────────────
// Two columns side-by-side: Your policy vs. Market avg. Numbers aligned
// by baseline. Bottom row is a single highlighted "Difference" line.
function VizReceipt({ data, isSave, vehicle, isMobile }) {
  const accent = isSave ? 'var(--color-success)' : 'var(--color-info)';
  const diffMonthly = data.averageMonthly - data.yourMonthly; // negative if you pay more
  const diffYear = data.averageYear - data.yourYear;

  // For ontarget, hide the difference row entirely
  const showDiff = isSave;

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 6,
      }}>
        <div style={{
          fontSize: 16, fontWeight: 700, color: 'var(--color-heading)',
          letterSpacing: -0.2,
        }}>
          Insurance for your {vehicle.make}
        </div>
      </div>
      <div style={{
        fontSize: 12, color: 'var(--color-body-muted)',
        marginBottom: 18, lineHeight: 1.45,
      }}>
        Compared with {data.policies} active Zmarta policies for {vehicle.make} {vehicle.model.split(' ')[0]} ({vehicle.year}).
      </div>

      {/* Two columns */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Header row */}
        <div style={cellHead}>Your policy</div>
        <div style={{ ...cellHead, borderLeft: '1px solid var(--color-border-subtle)' }}>Market average</div>

        {/* Monthly */}
        <div style={cellBody}>
          <div style={cellLabel}>Monthly</div>
          <div style={{
            ...cellValue,
            color: isSave ? 'var(--color-heading)' : 'var(--color-heading)',
          }}>
            {fmtSEK(data.yourMonthly)} <span style={cellUnit}>kr</span>
          </div>
        </div>
        <div style={{ ...cellBody, borderLeft: '1px solid var(--color-border-subtle)' }}>
          <div style={cellLabel}>Monthly</div>
          <div style={cellValue}>
            {fmtSEK(data.averageMonthly)} <span style={cellUnit}>kr</span>
          </div>
        </div>

        {/* Yearly */}
        <div style={{ ...cellBody, borderTop: '1px solid var(--color-border-subtle)' }}>
          <div style={cellLabel}>Per year</div>
          <div style={cellValueSmall}>{fmtSEK(data.yourYear)} kr</div>
        </div>
        <div style={{ ...cellBody, borderTop: '1px solid var(--color-border-subtle)', borderLeft: '1px solid var(--color-border-subtle)' }}>
          <div style={cellLabel}>Per year</div>
          <div style={cellValueSmall}>{fmtSEK(data.averageYear)} kr</div>
        </div>
      </div>

      {/* Difference */}
      {showDiff && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          borderRadius: 10,
          background: isSave ? 'rgba(21,122,92,0.10)' : 'rgba(111,136,156,0.10)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <div style={{ fontSize: 12.5, color: 'var(--color-body)', lineHeight: 1.4 }}>
            You could lower your monthly cost by switching.
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: accent, lineHeight: 1 }}>
              −{fmtSEK(-diffMonthly)} kr
            </div>
            <div style={{ fontSize: 11, color: accent, opacity: 0.85, marginTop: 2 }}>
              ~{fmtSEK(-diffYear)} kr / year
            </div>
          </div>
        </div>
      )}

      {!showDiff && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          borderRadius: 10,
          background: 'var(--color-surface-page)',
          fontSize: 12.5, color: 'var(--color-body)', lineHeight: 1.45,
        }}>
          You're paying close to what others pay for this car. Premiums are recalculated yearly — worth checking before renewal.
        </div>
      )}

      <CompareCta isMobile={isMobile}/>
    </div>
  );
}

const cellHead = {
  padding: '10px 14px',
  fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
  color: 'var(--color-body-muted)', textTransform: 'uppercase',
  background: 'var(--color-surface-page)',
};
const cellBody = {
  padding: '14px 14px 14px',
  background: 'var(--color-surface)',
};
const cellLabel = {
  fontSize: 11, color: 'var(--color-body-muted)',
  fontWeight: 500, marginBottom: 4,
};
const cellValue = {
  fontSize: 22, fontWeight: 700, color: 'var(--color-heading)',
  letterSpacing: -0.4, lineHeight: 1.1,
};
const cellUnit = {
  fontSize: 13, color: 'var(--color-body-muted)', fontWeight: 500,
};
const cellValueSmall = {
  fontSize: 13, color: 'var(--color-body)', fontWeight: 500,
};

// ─── C · Percentile ─────────────────────────────────────────────────
// Single neutral scale. A dot marks where the user falls relative to
// the population. The story IS the percentile: "you pay more than 73%
// of [Volvo XC60] drivers" -> instant social context.
function VizPercentile({ data, isSave, vehicle, isMobile }) {
  const accent = isSave ? 'var(--color-success)' : 'var(--color-info)';

  // Derive percentile from yourMonthly relative to range. Cheap end = 0%.
  const span = data.rangeMax - data.rangeMin;
  const yourYearly = data.yourMonthly * 12;
  const rawPct = ((yourYearly - data.rangeMin) / span) * 100;
  const percentile = Math.max(5, Math.min(95, Math.round(rawPct)));

  const headline = isSave
    ? `You pay more than ${percentile}% of ${vehicle.make} drivers`
    : `You're in the middle of the pack`;

  const sub = isSave
    ? `Switch insurer and you could save around ${fmtSEK(data.savingMonthly)} kr per month.`
    : `${fmtSEK(data.yourMonthly)} kr / month is close to the average for this car.`;

  return (
    <div>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
        color: 'var(--color-body-muted)', textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Where you sit · {data.policies} policies
      </div>

      <div style={{
        fontSize: isMobile ? 20 : 23,
        fontWeight: 700, lineHeight: 1.2,
        color: 'var(--color-heading)',
        letterSpacing: -0.3,
        marginBottom: 6,
        textWrap: 'balance',
      }}>
        {headline}
      </div>

      <div style={{
        fontSize: 13, color: 'var(--color-body)',
        lineHeight: 1.5, marginBottom: 22, textWrap: 'pretty',
      }}>
        {sub}
      </div>

      {/* Single scale */}
      <div style={{ position: 'relative', height: 56, marginBottom: 12 }}>
        {/* axis labels above */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          display: 'flex', justifyContent: 'space-between',
          fontSize: 10.5, color: 'var(--color-body-muted)',
        }}>
          <span>Pays less</span>
          <span>Pays more</span>
        </div>

        {/* track with subtle midline */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 28, height: 4,
          borderRadius: 2,
          background: 'var(--color-surface-page)',
          border: '1px solid var(--color-border-subtle)',
        }}/>

        {/* avg marker (50%) */}
        <div style={{
          position: 'absolute', left: '50%', top: 24, width: 1, height: 12,
          background: 'var(--color-body-muted)', opacity: 0.5,
          transform: 'translateX(-0.5px)',
        }}/>
        <div style={{
          position: 'absolute', left: '50%', top: 42,
          fontSize: 10, color: 'var(--color-body-muted)',
          transform: 'translateX(-50%)',
          fontWeight: 500, letterSpacing: 0.3,
        }}>
          avg
        </div>

        {/* user dot */}
        <div style={{
          position: 'absolute',
          left: `${percentile}%`,
          top: 22,
          transform: 'translateX(-50%)',
        }}>
          <div style={{
            width: 16, height: 16, borderRadius: 8,
            background: accent,
            boxShadow: `0 0 0 4px #fff, 0 0 0 5px ${accent}33, 0 1px 4px rgba(30,37,47,0.18)`,
          }}/>
          <div style={{
            position: 'absolute',
            top: -22,
            left: percentile < 15 ? 0 : percentile > 85 ? 'auto' : '50%',
            right: percentile > 85 ? 0 : 'auto',
            transform: percentile < 15 || percentile > 85 ? 'none' : 'translateX(-50%)',
            fontSize: 11, fontWeight: 700, color: accent,
            whiteSpace: 'nowrap',
          }}>
            {fmtSEK(data.yourMonthly)} kr
          </div>
        </div>
      </div>

      {/* Big delta number — the carrot */}
      {isSave && (
        <div style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--color-border-subtle)',
          display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between', gap: 16,
        }}>
          <div style={{
            fontSize: 12, color: 'var(--color-body-muted)',
            lineHeight: 1.4, flex: 1,
          }}>
            Drivers in the middle of the pack pay
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: isMobile ? 22 : 26, fontWeight: 700,
              color: accent, lineHeight: 1, letterSpacing: -0.4,
            }}>
              −{fmtSEK(data.savingMonthly)} kr
            </div>
            <div style={{
              fontSize: 11, color: 'var(--color-body-muted)', marginTop: 4,
            }}>
              less per month
            </div>
          </div>
        </div>
      )}

      <CompareCta isMobile={isMobile}/>
    </div>
  );
}

window.CarInsuranceCompare = CarInsuranceCompare;
