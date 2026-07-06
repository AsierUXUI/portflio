// Mobile car screen — mirrors HouseScreenA structure:
// brand header, tabs, insurance-savings banner, car details card,
// estimated value (neutral grey delta), loan card, popular products.

function CarScreenA({ activeId, setActiveId, showSavings, vehicles, country, lang, banner, onDismissBanner, hideChrome = false, hideBottomNav = false, compareViz = 'A', headerStyle = 'tabs', onSetMortgageState, insuranceTeaser = false, collapseChart = false, otherVehicles = false }) {
  const list = vehicles || window.NO_VEHICLES;
  const effLang = lang || 'en';
  const t = (k, vars) => window.tr ? window.tr(k, effLang, vars) : k;
  // Hooks must run on every render — keep them above the empty-state early return.
  const [devModalOpen, setDevModalOpen] = React.useState(false);
  const [range, setRange] = React.useState('12 mo');
  const [lenderIdx, setLenderIdx] = React.useState(0);
  const [productCat, setProductCat] = React.useState('Category 1');
  const [chartExpanded, setChartExpanded] = React.useState(!collapseChart);
  React.useEffect(() => { setLenderIdx(0); setProductCat('Category 1'); }, [activeId]);
  React.useEffect(() => { setChartExpanded(!collapseChart); }, [collapseChart, activeId]);
  const scrollRef = React.useRef(null);
  const insuranceCardRef = React.useRef(null);
  const scrollToInsurance = () => {
    const container = scrollRef.current;
    const target = insuranceCardRef.current;
    if (!container || !target) return;
    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const delta = tRect.top - cRect.top;
    container.scrollTo({ top: container.scrollTop + delta - 12, behavior: 'smooth' });
  };

  // ── State A — empty (0 vehicles, SE car) ──────────────────────────
  if (!list || list.length === 0) {
    return (
      <CarScreenEmpty
        country={country}
        t={t}
        lang={effLang}
        hideBottomNav={hideBottomNav}
      />
    );
  }

  const vehicle = list.find(v => v.id === activeId) || list[0];
  const isOtherView = otherVehicles && activeId === 'other';
  const otherVehiclesData = country === 'SE' ? window.OTHER_VEHICLES_SE : window.OTHER_VEHICLES_NO;
  const single = list.length === 1 && !otherVehicles;
  const isSE = country === 'SE';
  const lenders = vehicle.loan.lenders;
  const lender = lenders[lenderIdx] || null;
  const hasLoan = vehicle.mortgageState === 'has' && lenders.length > 0;
  const noLoan = vehicle.mortgageState === 'none';
  const carUndecided = vehicle.mortgageState === 'undecided';
  const savingsVisible = showSavings && vehicle.insuranceSavings > 0;

  const FALLBACK_PRODUCTS = {
    'Category 1': { provider: 'Lorem Ipsum', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 2': { provider: 'Dolor Sit',   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 3': { provider: 'Amet Consectetur', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
  };
  const offerProducts = FALLBACK_PRODUCTS;

  // Use explicit data prop so Sparkline renders car-specific sparkline (downward depreciation).
  // Sweden gets a fixed-window Värdeutveckling chart (25 monthly points,
  // 12 past + Nu + 12 forecast) — no range tabs, per spec.
  const chartJsx = isSE ? (
    <window.CrossFade keyId={`car-vu-${activeId}`}>
      <VardeutvecklingChart
        timeline={generateSETimeline(parseEstimatedSEK(vehicle.value.estimated))}
        t={t}
      />
    </window.CrossFade>
  ) : (
    <window.CrossFade keyId={`car-chart-${activeId}-${range}`}>
      <Sparkline range={range} onRange={setRange} data={window.chartForVehicle ? window.chartForVehicle(activeId) : window.CAR_CHART_DATA} tint="var(--color-body-muted)"/>
    </window.CrossFade>
  );

  const currency = isSE ? 'SEK' : 'kr';
  const inspectionLabel = isSE ? 'Next besiktning' : 'Next EU-kontroll';

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--color-surface-page)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font)',
    }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {!hideChrome && <>
        {/* Uscore brand header */}
        <div style={{
          background: 'var(--color-surface)',
          padding: '10px 16px 10px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {Icon.uscoreLogo(26)}
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: 20,
            background: 'var(--color-surface-page)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-heading)', position: 'relative',
          }}>
            {Icon.bellLine('currentColor', 20)}
            <span style={{
              position: 'absolute', top: 8, right: 10,
              width: 8, height: 8, borderRadius: 4,
              background: '#E53E3E', border: '2px solid var(--color-surface-page)',
            }}/>
          </button>
        </div>
        <AppTabBar active="Vehicle" lang={effLang} onChange={(id) => {
          if (id === 'Home') {
            window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { mode: 'house' } }, '*');
            window.dispatchEvent(new CustomEvent('uscore:setmode', { detail: 'house' }));
          }
        }}/>
        </>}

        {/* Asset pills header — hidden when single (car-details card carries the info) */}
        {!single && (
          <window.AssetPillsHeader
            kind="car"
            items={list}
            activeId={activeId}
            onSelect={setActiveId}
            country={country}
            size="mobile"
            lang={effLang}
            extraPill={otherVehicles ? { id: 'other', label: t('otherVehicles') } : null}
          />
        )}
        {single && <window.AssetTitleBlock kind="car" size="mobile" lang={effLang}/>}

        {/* Insurance savings banner */}
        {!isOtherView && savingsVisible && (
          <div style={{ padding: '12px 16px 0' }}>
            <button data-source="Computed · avg market premium − member premium" style={{
              width: '100%', textAlign: 'left',
              background: 'linear-gradient(90deg, var(--color-gradient-from), var(--color-gradient-to))',
              borderRadius: 'var(--radius-card)',
              padding: '14px 16px',
              color: '#fff',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 6px 16px rgba(26,144,112,0.28)',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.1, marginBottom: 2 }}>
                  {t('switchInsurance', { amount: vehicle.insuranceSavings, currency })}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {t('seeNewOffers')} {Icon.arrowR('currentColor', 13)}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>{Icon.shield(52)}</div>
            </button>
          </div>
        )}

        {/* Offer banner — shown in the savings slot when savings aren't available */}
        {!isOtherView && !savingsVisible && banner && (
          <div style={{ padding: '12px 16px 0' }}>
            <window.OfferBanner banner={banner} onDismiss={onDismissBanner} variant="mobile" lang={effLang}/>
          </div>
        )}

        <div style={{ padding: '14px 16px 24px', display: isOtherView ? 'block' : 'flex', flexDirection: 'column', gap: 14 }}>

          {isOtherView ? (
            <window.OtherVehiclesGrid vehicles={otherVehiclesData} columns={1}/>
          ) : (
          <>
          {/* Vehicle details card */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--color-surface-page)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, overflow: 'hidden', marginTop: 1,
              }}>
                {vehicle.logo
                  ? <img src={vehicle.logo} alt={vehicle.make} style={{ width: 34, height: 34, objectFit: 'contain' }} data-source="GET /v1/{market}/vehicle/{regno} · data.make"/>
                  : <div data-source="GET /v1/{market}/vehicle/{regno} · data.make" style={{ color: 'var(--color-body-muted)' }}>{Icon.tabCar('currentColor')}</div>}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.25 }}>
                  <span data-source="GET /v1/{market}/vehicle/{regno} · data.model">{vehicle.model}</span>{' '}
                  <span data-source="GET /v1/{market}/vehicle/{regno} · data.modelYear">{vehicle.year}</span>
                </div>
                {vehicle.nextInspection != null && (
                  <div style={{ fontSize: 11.5, color: 'var(--color-body-muted)', marginTop: 3 }} data-source="GET /v1/{market}/vehicle/{regno} · data.nextInspectionDate">
                    {t('nextControl')}: {vehicle.nextInspection}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '3px 9px', borderRadius: 999,
                background: 'var(--color-surface-page)',
                color: 'var(--color-heading)',
                fontSize: 11, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
                border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
              }} data-source="GET /v1/{market}/vehicle/{regno} · data.type">
                {vehicle.fuel}
              </span>
              {vehicle.mileage != null && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 9px', borderRadius: 999,
                  background: 'var(--color-surface-page)',
                  color: 'var(--color-heading)',
                  fontSize: 11, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
                  border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
                }} data-source="GET /v1/{market}/vehicle/{regno} · data.mileage">
                  {vehicle.mileage.toLocaleString('sv-SE').replace(/,/g, ' ')} km
                </span>
              )}
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '3px 9px', borderRadius: 999,
                background: 'var(--color-surface-page)',
                color: 'var(--color-heading)',
                fontSize: 11, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
                border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
              }} data-source="GET /v1/{market}/vehicle/{regno} · data.registrationNumber">
                {vehicle.plate}
              </span>
            </div>
          </div>

          {/* Estimated value card */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
            padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-body-muted)' }}>
                {t('estimatedValue')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span data-source="GET /v1/{market}/valuation/{regno} · data.private.maxPrice" style={{ display: 'inline-block' }}>
                <window.AnimatedNumber value={vehicle.value.estimated} style={{
                  fontSize: 24, fontWeight: 700, color: 'var(--color-heading)',
                  lineHeight: 1.1, letterSpacing: -0.3, display: 'block', whiteSpace: 'nowrap',
                }}/>
                </span>
                <window.CrossFade keyId={`car-growth-${activeId}`}>
                  <GrowthPill
                    growthValue={vehicle.value.growthValue}
                    price={vehicle.value.boughtFor}
                    year={vehicle.value.boughtYear}
                    lang={effLang}
                  />
                </window.CrossFade>
              </div>
            </div>

            {collapseChart ? (
              <div style={{ marginTop: 14 }}>
                <button onClick={() => setChartExpanded(v => !v)} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12.5, fontWeight: 600, color: 'var(--color-info)',
                  cursor: 'pointer',
                }}>
                  {chartExpanded ? 'Hide value chart' : 'Show value chart'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transform: chartExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {chartExpanded && (
                  <div style={{ marginTop: 10 }} data-source="GET /v1/{market}/valuation/{regno} · data.timeline[]">
                    {chartJsx}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ marginTop: 14 }} data-source="GET /v1/{market}/valuation/{regno} · data.timeline[]">
                {chartJsx}
              </div>
            )}

          </div>

          {/* Above-the-fold insurance teaser — links down to the full card */}
          {isSE && insuranceTeaser && (
            <window.InsuranceOfferTeaser vehicle={vehicle} currency={currency} onClick={scrollToInsurance}/>
          )}

          {/* Undecided prompt — sits above the value card */}
          {carUndecided && (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-card)', padding: 16,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 20)}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-heading)' }}>
                  {t('haveLoanQuestion')}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                {t('haveLoanBody')}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => onSetMortgageState && onSetMortgageState('none')}
                  style={{
                  flex: 1, height: 40, borderRadius: 10,
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-body)', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}>{t('no')}</button>
                <button
                  onClick={() => setDevModalOpen(true)}
                  style={{
                  flex: 1, height: 40, borderRadius: 10,
                  background: 'var(--color-cta)', color: '#fff',
                  fontSize: 13, fontWeight: 600,
                  border: 0, cursor: 'pointer',
                }}>{t('yes')}</button>
              </div>
            </div>
          )}

          {/* Primary offer — Insplanet × Insurely insurance card */}
          {isSE && (
            <div ref={insuranceCardRef}>
              <window.InsuranceOfferCard vehicle={vehicle} currency={currency} variant="mobile"/>
            </div>
          )}

          {/* Car loan card */}
          {hasLoan && (
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-heading)', paddingTop: 4 }}>
                  {t('yourCarLoan')}
                </div>
                <LoanMenu hasActive={lender && parseFloat(lender.balance) > 0} kind="loan" lang={effLang}/>
              </div>

              {lenders.length > 1 && (
                <div style={{ marginTop: 10, marginBottom: 4 }}>
                  <window.SecondaryPills
                    items={lenders.map((l, i) => ({ id: String(i), label: l.name }))}
                    active={String(lenderIdx)}
                    onChange={(id) => setLenderIdx(parseInt(id, 10))}
                  />
                </div>
              )}

              <div style={{ marginTop: lenders.length > 1 ? 8 : 4 }}>
                <LTVRow pct={lender.ltv} lang={effLang} dataSource="Computed · self-report.balance ÷ valuation.data.private.maxPrice"/>
                {lenders.length === 1 && <DataRow label={t('lender')} value={lender.name} dataSource="Self-report · loan.bank"/>}
                <DataRow label={t('balance')} value={lender.balance} dataSource="Self-report · loan.balance"/>
                <DataRow label={t('interestRate')} value={lender.rate} dataSource="Self-report · loan.rate"/>
                <DataRow label={t('monthlyPayment')} value={lender.monthly} dataSource="Self-report · loan.monthly"/>
                <DataRow label={t('remainingTerm')} value={lender.term} dataSource="Self-report · loan.term" last/>
              </div>
            </div>
          )}

          {/* Popular products — insurance / assistance / tire storage */}
          {!isSE && (() => {
            const offer = offerProducts[productCat] || offerProducts[Object.keys(offerProducts)[0]];
            if (!offer) return null;
            return (
              <div style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-card)',
                boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '14px 16px 0',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.3 }}>
                      {t('popularProductsCar')}
                    </div>
                  </div>
                  <window.ProductPills
                    categories={Object.keys(offerProducts)}
                    active={productCat}
                    onChange={setProductCat}
                    size="mobile"
                  />
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'var(--color-surface-page)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--color-info)', fontWeight: 700, fontSize: 16,
                      flexShrink: 0,
                    }}>{offer.provider.charAt(0)}</div>
                    <div style={{ flex: 1, fontSize: 14, color: 'var(--color-heading)', fontWeight: 500 }}>
                      {offer.provider}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--color-body)', lineHeight: 1.5, marginBottom: 14 }}>
                    {offer.desc}
                  </div>
                  <button style={{
                    width: '100%', height: 48, borderRadius: 10,
                    background: 'var(--color-cta)', color: '#FFFFFF',
                    fontSize: 14, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    Lorem ipsum {Icon.arrowR('currentColor', 16)}
                  </button>
                  <div style={{
                    marginTop: 12, padding: '10px 12px',
                    background: 'var(--color-surface-page)',
                    borderRadius: 8,
                    fontSize: 11, lineHeight: 1.45, color: 'var(--color-body-muted)',
                  }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
                  </div>
                </div>
              </div>
            );
          })()}

          {noLoan && (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-card)', padding: 16,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 20)}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-heading)' }}>
                  {t('noLoanOnCar')}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                {t('noLoanBody')}
              </div>
              <button
                onClick={() => setDevModalOpen(true)}
                style={{
                width: '100%', height: 40, borderRadius: 10,
                background: 'transparent', color: 'var(--color-info)',
                fontSize: 13, fontWeight: 600,
                border: '1px solid var(--color-border)', cursor: 'pointer',
              }}>{t('addLoan')}</button>
            </div>
          )}
          </>
          )}
        </div>
      </div>

      {!hideBottomNav && <BottomNav active="Dashboard" lang={effLang}/>}

      <window.DevSelfReportModal
        open={devModalOpen}
        kind="car"
        lang={effLang}
        assetName={vehicle.model}
        assetCode={vehicle.plate}
        onClose={() => setDevModalOpen(false)}
        onConfirm={() => onSetMortgageState && onSetMortgageState('one')}
      />
    </div>
  );
}

// Vehicle tabs — label shows "Make Model" line + plate/year line
function VehicleTabs({ vehicles, activeId, onSelect }) {
  return (
    <div style={{
      display: 'flex', gap: 0, overflowX: 'auto', padding: '0 16px',
      borderBottom: '1px solid var(--color-border-subtle)',
      scrollbarWidth: 'none',
    }}>
      {vehicles.map(v => {
        const isActive = v.id === activeId;
        return (
          <button key={v.id} onClick={() => onSelect(v.id)} style={{
            padding: '12px 18px 13px',
            minWidth: 'fit-content',
            borderBottom: isActive ? '2px solid var(--color-action)' : '2px solid transparent',
            marginBottom: -1,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2,
            textAlign: 'left',
          }}>
            <div style={{
              fontSize: 14, fontWeight: 600,
              color: isActive ? 'var(--color-info)' : 'var(--color-body)',
              whiteSpace: 'nowrap',
            }}>{v.make}</div>
            <div style={{ fontSize: 11, color: 'var(--color-body-muted)', whiteSpace: 'nowrap' }}>
              {v.plate}
            </div>
          </button>
        );
      })}
    </div>
  );
}

window.CarScreenA = CarScreenA;
window.VehicleTabs = VehicleTabs;

// ─── PurchaseTooltip — (i) icon next to "since purchase in YYYY" ─────
// Tap to toggle a small popup with the purchase price.
function PurchaseTooltip({ price, year, lang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const text = window.tr
    ? window.tr('purchaseTooltip', lang || 'en', { price, year })
    : `You bought this vehicle for ${price} in ${year}.`;

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        aria-label="Purchase info"
        style={{
          width: 14, height: 14, borderRadius: 7,
          background: 'var(--color-surface-page)',
          color: 'var(--color-body-muted)',
          border: 0, padding: 0, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, lineHeight: 1,
          fontFamily: 'inherit',
        }}
      >i</button>
      {open && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          minWidth: 200, maxWidth: 240,
          padding: '8px 10px', borderRadius: 8,
          background: 'var(--color-heading)',
          color: '#fff', fontSize: 11.5, lineHeight: 1.4,
          fontWeight: 500,
          boxShadow: '0 6px 18px rgba(30,37,47,0.20)',
          zIndex: 20,
          whiteSpace: 'normal',
          textAlign: 'left',
        }}>
          {text}
          <span style={{
            position: 'absolute', top: '100%', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '5px solid var(--color-heading)',
          }}/>
        </span>
      )}
    </span>
  );
}

window.PurchaseTooltip = PurchaseTooltip;

// ─── GrowthPill — value-change pill that doubles as the purchase-info
// trigger. Shows just the delta by default; tapping anywhere on the pill
// (or its trailing (i) icon) toggles a tooltip with "bought for X in YYYY".
function GrowthPill({ growthValue, price, year, lang }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const isPositive = typeof growthValue === 'string' && growthValue.trim().startsWith('+');
  const gvMatch = typeof growthValue === 'string' ? growthValue.match(/^(.*?[\d])(\D+)$/) : null;

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const text = window.tr
    ? window.tr('purchaseTooltip', lang || 'en', { price, year })
    : `You bought this vehicle for ${price} in ${year}.`;

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        aria-label="Purchase info"
        data-source="Computed · data.timeline[current].value − data.timeline[−12m].value"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700,
          color: isPositive ? 'var(--color-success)' : 'var(--color-body)',
          background: isPositive ? 'rgba(21,122,92,0.12)' : 'rgba(107,124,146,0.14)',
          padding: '3px 6px 3px 8px', borderRadius: 'var(--radius-pill)',
          border: 0, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0,
        }}
      >
        {gvMatch ? <>{gvMatch[1]}<span style={{ fontSize: '0.8em', fontWeight: 500 }}>{gvMatch[2]}</span></> : growthValue}
        <span style={{
          width: 14, height: 14, borderRadius: 7,
          background: isPositive ? 'rgba(21,122,92,0.18)' : 'rgba(30,37,47,0.14)',
          color: isPositive ? 'var(--color-success)' : 'var(--color-body-muted)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700, lineHeight: 1,
        }}>i</span>
      </button>
      {open && (
        <span style={{
          position: 'absolute',
          top: 'calc(100% + 8px)', right: 0,
          minWidth: 200, maxWidth: 240,
          padding: '8px 10px', borderRadius: 8,
          background: 'var(--color-heading)',
          color: '#fff', fontSize: 11.5, lineHeight: 1.4,
          fontWeight: 500,
          boxShadow: '0 6px 18px rgba(30,37,47,0.20)',
          zIndex: 20,
          whiteSpace: 'normal',
          textAlign: 'left',
        }}>
          {text}
          <span style={{
            position: 'absolute', bottom: '100%', right: 12,
            width: 0, height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '5px solid var(--color-heading)',
          }}/>
        </span>
      )}
    </span>
  );
}

window.GrowthPill = GrowthPill;

// ─── State A — Car page empty state (0 vehicles, SE) ───────────────────
// Disabled placeholder pill + "Your vehicles" empty card (inner card + tip
// + "See car loan offers" CTA) + "Products for your car" AXO offer card.
// Copy is country-agnostic and runs through the i18n helper.
function CarScreenEmpty({ country, t, lang = 'en', hideBottomNav }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--color-surface-page)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font)',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <window.AssetTitleBlock kind="car" size="mobile" lang={lang}/>
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <window.EmptyOfferCard kind="car" t={t} />
        </div>
      </div>

      {!hideBottomNav && <BottomNav active="Dashboard" lang={lang}/>}
    </div>
  );
}

window.CarScreenEmpty = CarScreenEmpty;

// ─── Värdeutveckling chart (Sweden, PD-747) ───────────────────────────
// 25 monthly points: 12 past + Nu + 12 forecast.
// Solid action-blue line + filled area for history.
// Dashed action-blue line + lighter fill for forecast.
// Orange dashed vertical "Nu" marker + dot at the midpoint.
// 3 Y-tick labels. X-labels at -12 mån / -6 mån / Nu / +6 mån / +12 mån.
// Historik / Prognos legend pills below. No range tabs.

function parseEstimatedSEK(s) {
  if (!s) return 250000;
  const m = String(s).match(/([\d\s.,]+)/);
  if (!m) return 250000;
  return parseInt(m[1].replace(/[\s.,]/g, ''), 10) || 250000;
}

function generateSETimeline(currentValueSEK) {
  // History rises from 12mo ago (≈+8%) to today; forecast continues
  // depreciation by ~7% over the next year. Deterministic ripple keeps the
  // line organic without random reshuffling between renders.
  const yearAgo = currentValueSEK * 1.08;
  const yearAhead = currentValueSEK * 0.93;
  const pts = [];
  for (let i = -12; i <= 12; i++) {
    let v;
    if (i < 0) {
      const t = (12 + i) / 12;
      v = yearAgo + (currentValueSEK - yearAgo) * t;
    } else if (i === 0) {
      v = currentValueSEK;
    } else {
      const t = i / 12;
      v = currentValueSEK + (yearAhead - currentValueSEK) * t;
    }
    v += Math.sin(i * 1.7) * 0.012 * currentValueSEK;
    pts.push({ value: Math.round(v), isForecast: i > 0, isNow: i === 0 });
  }
  return pts;
}

function VardeutvecklingChart({ timeline, t }) {
  if (!timeline || timeline.length === 0) return null;
  const tr = t || ((k) => k);
  const monthsLabel = tr('monthsShort');
  const W = 326, H = 168;
  const padL = 38, padR = 8, padT = 12, padB = 26;
  const innerW = W - padL - padR, innerH = H - padT - padB;

  const vals = timeline.map(p => p.value);
  const vMin = Math.min(...vals), vMax = Math.max(...vals);
  const range = (vMax - vMin) || 1;
  const yMin = vMin - range * 0.10;
  const yMax = vMax + range * 0.10;
  const yToPx = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * innerH;
  const xToPx = (i) => padL + (i / (timeline.length - 1)) * innerW;

  const nowIdx = timeline.findIndex(p => p.isNow);
  const histPts = timeline.slice(0, nowIdx + 1).map((p, i) => [xToPx(i), yToPx(p.value)]);
  const fcstPts = timeline.slice(nowIdx).map((p, i) => [xToPx(nowIdx + i), yToPx(p.value)]);

  const linePath = (pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  const fillPath = (pts) => {
    if (!pts.length) return '';
    const baseY = padT + innerH;
    return `${linePath(pts)} L ${pts[pts.length-1][0].toFixed(2)} ${baseY} L ${pts[0][0].toFixed(2)} ${baseY} Z`;
  };

  // 3 Y-tick labels
  const tickValues = [yMax, (yMax + yMin) / 2, yMin];
  const formatTick = (v) => {
    const k = Math.round(v / 1000);
    return `${k.toLocaleString('sv-SE').replace(/,/g, ' ')}k`;
  };

  const xLabels = [
    { idx: 0, label: `-12 ${monthsLabel}` },
    { idx: 6, label: `-6 ${monthsLabel}` },
    { idx: nowIdx, label: tr('now') },
    { idx: nowIdx + 6, label: `+6 ${monthsLabel}` },
    { idx: timeline.length - 1, label: `+12 ${monthsLabel}` },
  ];

  const nowX = xToPx(nowIdx);
  const nowY = yToPx(timeline[nowIdx].value);

  return (
    <div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {/* y gridlines + labels */}
        {tickValues.map((v, i) => {
          const y = padT + (i / 2) * innerH;
          return (
            <g key={i}>
              <line x1={padL} x2={W - padR} y1={y} y2={y}
                    stroke="var(--color-border-subtle)" strokeWidth="1"/>
              <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="10"
                    fill="var(--color-body-muted)" fontFamily="Poppins">
                {formatTick(v)}
              </text>
            </g>
          );
        })}

        {/* History area + line */}
        <path d={fillPath(histPts)} fill="var(--color-action)" fillOpacity="0.16"/>
        <path d={linePath(histPts)} fill="none" stroke="var(--color-action)"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Forecast area + dashed line */}
        <path d={fillPath(fcstPts)} fill="var(--color-action)" fillOpacity="0.07"/>
        <path d={linePath(fcstPts)} fill="none" stroke="var(--color-action)"
              strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="5 5" opacity="0.78"/>

        {/* Dashed vertical "Nu" marker */}
        <line x1={nowX} x2={nowX} y1={padT} y2={padT + innerH}
              stroke="#E0833F" strokeWidth="1.3" strokeDasharray="3 3" opacity="0.9"/>
        <circle cx={nowX} cy={nowY} r={4} fill="#E0833F"/>
        <circle cx={nowX} cy={nowY} r={7} fill="#E0833F" fillOpacity="0.22"/>

        {/* X-axis labels */}
        {xLabels.map((l, i) => {
          const x = xToPx(l.idx);
          return (
            <text key={i} x={x} y={H - 8}
                  textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}
                  fontSize="10" fill="var(--color-body-muted)" fontFamily="Poppins">
              {l.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

window.VardeutvecklingChart = VardeutvecklingChart;
window.generateSETimeline = generateSETimeline;
