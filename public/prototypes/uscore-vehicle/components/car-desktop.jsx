// Desktop car shell — mirrors DesktopShell.
// Left rail: car details, value, loan. Right rail: insurance savings + offers.

function DesktopCarShell({ activeId, setActiveId, showSavings, vehicles, country, lang, banner, onDismissBanner, hideChrome = false, compareViz = 'A', headerStyle = 'tabs', onSetMortgageState, otherVehicles = false }) {
  const effLang = lang || 'en';
  const tr = window.tr || ((k) => k);
  const list = vehicles || window.NO_VEHICLES;

  // ── State A — empty (0 vehicles) ──────────────────────────────────
  if (!list || list.length === 0) {
    return <window.DesktopEmpty kind="car" lang={effLang} hideChrome={hideChrome} />;
  }

  const vehicle = list.find(v => v.id === activeId) || list[0];
  const isOtherView = otherVehicles && activeId === 'other';
  const otherVehiclesData = country === 'SE' ? window.OTHER_VEHICLES_SE : window.OTHER_VEHICLES_NO;
  const single = list.length === 1 && !otherVehicles;
  const isSE = country === 'SE';
  const hasLoan = vehicle.mortgageState === 'has' && vehicle.loan.lenders.length > 0;
  const noLoan = vehicle.mortgageState === 'none';
  const carUndecided = vehicle.mortgageState === 'undecided';
  const currency = isSE ? 'SEK' : 'kr';
  const inspectionLabel = isSE ? 'Next besiktning' : 'Next EU-kontroll';
  const [noLoanModalOpen, setNoLoanModalOpen] = React.useState(false);

  const wrapperStyle = hideChrome ? {
    width: '100%',
    background: 'var(--color-surface-page)',
    fontFamily: 'var(--font)',
  } : {
    width: 1280, maxWidth: '100%',
    background: 'var(--color-surface-page)',
    borderRadius: 14, overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(30,37,47,0.18), 0 0 0 1px rgba(30,37,47,0.08)',
    fontFamily: 'var(--font)',
  };

  return (
    <div style={wrapperStyle}>
      {!hideChrome && (
        <WebChrome activeTab="Vehicle" lang={lang} onChange={(id) => {
          if (id === 'Home') {
            window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { mode: 'house' } }, '*');
            window.dispatchEvent(new CustomEvent('uscore:setmode', { detail: 'house' }));
          }
        }}/>
      )}

      {!single && (
        <window.AssetPillsHeader
          kind="car"
          items={list}
          activeId={activeId}
          onSelect={setActiveId}
          country={country}
          size="desktop"
          lang={effLang}
          extraPill={otherVehicles ? { id: 'other', label: tr('otherVehicles', effLang) } : null}
        />
      )}
      {single && <window.AssetTitleBlock kind="car" size="desktop" lang={effLang}/>}

      <div style={{ padding: '24px 32px 28px' }}>
        {isOtherView ? (
          <window.OtherVehiclesGrid vehicles={otherVehiclesData} columns={2}/>
        ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          alignItems: 'start',
        }}>
          {/* Left rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            <DesktopCarDetails vehicle={vehicle} lang={effLang}/>
            <DesktopCarValue vehicle={vehicle} lang={effLang}/>
            {carUndecided && <UndecidedPrompt kind="car" lang={effLang} onSetMortgageState={onSetMortgageState} assetName={vehicle.model} assetCode={vehicle.plate}/>}
            {hasLoan && <DesktopCarLoan vehicle={vehicle} lang={effLang}/>}
            {noLoan && (
              <div style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-card)', padding: 20,
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 22)}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-heading)' }}>
                    {tr('noLoanOnVehicle', effLang, { make: vehicle.make, model: vehicle.model })}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                  {tr('noLoanBody', effLang)}
                </div>
                <button
                  onClick={() => setNoLoanModalOpen(true)}
                  style={{
                  width: '100%', height: 42, borderRadius: 10,
                  background: 'transparent', color: 'var(--color-info)',
                  fontSize: 14, fontWeight: 600,
                  border: '1px solid var(--color-border)', cursor: 'pointer',
                }}>{tr('addLoan', effLang)}</button>
                <window.DevSelfReportModal
                  open={noLoanModalOpen}
                  kind="car"
                  lang={effLang}
                  assetName={vehicle.model}
                  assetCode={vehicle.plate}
                  onClose={() => setNoLoanModalOpen(false)}
                  onConfirm={() => onSetMortgageState && onSetMortgageState('one')}
                />
              </div>
            )}
          </div>

          {/* Right rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Primary offer — Insplanet × Insurely insurance card */}
            {isSE && <window.InsuranceOfferCard vehicle={vehicle} currency={currency} variant="desktop"/>}
            {showSavings && vehicle.insuranceSavings ? (
              <DesktopInsuranceSavings vehicle={vehicle} showSavings={showSavings} currency={currency} lang={effLang}/>
            ) : banner ? (
              <window.OfferBanner banner={banner} onDismiss={onDismissBanner} variant="desktop" lang={effLang}/>
            ) : null}
            {!isSE && <DesktopCarOffer vehicle={vehicle} lang={effLang}/>}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

function DesktopCarValue({ vehicle, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [range, setRange] = React.useState('12 mo');
  const chart = (
    <window.CrossFade keyId={`dt-car-chart-${vehicle.id}-${range}`}>
      <Sparkline range={range} onRange={setRange} size="desktop" data={window.chartForVehicle ? window.chartForVehicle(vehicle.id) : window.CAR_CHART_DATA} tint="var(--color-body-muted)"/>
    </window.CrossFade>
  );

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-body-muted)' }}>
          {tr('estimatedValue', lang)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span data-source="GET /v1/{market}/valuation/{regno} · data.private.maxPrice" style={{ display: 'inline-block' }}>
          <window.AnimatedNumber value={vehicle.value.estimated} style={{
            fontSize: 24, fontWeight: 700, color: 'var(--color-heading)',
            lineHeight: 1.1, letterSpacing: -0.3, display: 'block', whiteSpace: 'nowrap',
          }}/>
          </span>
          <window.CrossFade keyId={`dt-car-growth-${vehicle.id}`}>
            <window.GrowthPill
              growthValue={vehicle.value.growthValue}
              price={vehicle.value.boughtFor}
              year={vehicle.value.boughtYear}
              lang={lang}
            />
          </window.CrossFade>
        </div>
      </div>
      <div style={{ marginTop: 14 }} data-source="GET /v1/{market}/valuation/{regno} · data.timeline[]">{chart}</div>
    </div>
  );
}

function DesktopCarDetails({ vehicle, lang = 'en' }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 12,
          background: 'var(--color-surface-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden', marginTop: 1,
        }}>
          {vehicle.logo
            ? <img src={vehicle.logo} alt={vehicle.make} style={{ width: 42, height: 42, objectFit: 'contain' }} data-source="GET /v1/{market}/vehicle/{regno} · data.make"/>
            : <div data-source="GET /v1/{market}/vehicle/{regno} · data.make" style={{ color: 'var(--color-body-muted)' }}>{Icon.tabCar('currentColor')}</div>}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.2 }}>
            <span data-source="GET /v1/{market}/vehicle/{regno} · data.model">{vehicle.model}</span>{' '}
            <span data-source="GET /v1/{market}/vehicle/{regno} · data.modelYear">{vehicle.year}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-body-muted)', marginTop: 6 }}>
            {vehicle.nextInspection != null && (
              <span data-source="GET /v1/{market}/vehicle/{regno} · data.nextInspectionDate">{tr('nextControl', lang)}: {vehicle.nextInspection}</span>
            )}
          </div>
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span data-source="GET /v1/{market}/vehicle/{regno} · data.type" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 11px', borderRadius: 999,
              background: 'var(--color-surface-page)',
              color: 'var(--color-heading)',
              fontSize: 12, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
              border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
            }}>
              {vehicle.fuel}
            </span>
            {vehicle.mileage != null && (
              <span data-source="GET /v1/{market}/vehicle/{regno} · data.mileage" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '4px 11px', borderRadius: 999,
                background: 'var(--color-surface-page)',
                color: 'var(--color-heading)',
                fontSize: 12, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
                border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
              }}>
                {vehicle.mileage.toLocaleString('sv-SE').replace(/,/g, ' ')} km
              </span>
            )}
            <span data-source="GET /v1/{market}/vehicle/{regno} · data.registrationNumber" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 11px', borderRadius: 999,
              background: 'var(--color-surface-page)',
              color: 'var(--color-heading)',
              fontSize: 12, fontWeight: 600, lineHeight: 1.4, whiteSpace: 'nowrap',
              border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
            }}>
              {vehicle.plate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopCarLoan({ vehicle, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [lenderIdx, setLenderIdx] = React.useState(0);
  React.useEffect(() => { setLenderIdx(0); }, [vehicle.id]);
  const lenders = vehicle.loan.lenders;
  const lender = lenders[lenderIdx] || lenders[0];
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-heading)', paddingTop: 4, whiteSpace: 'nowrap' }}>
          {tr('yourCarLoan', lang)}
        </div>
        <LoanMenu hasActive={true} kind="loan" lang={lang}/>
      </div>
      {lenders.length > 1 && (
        <div style={{ marginTop: 12, marginBottom: 4 }}>
          <window.SecondaryPills
            items={lenders.map((l, i) => ({ id: String(i), label: l.name }))}
            active={String(lenderIdx)}
            onChange={(id) => setLenderIdx(parseInt(id, 10))}
            size="desktop"
          />
        </div>
      )}
      <div style={{ marginTop: lenders.length > 1 ? 8 : 4 }}>
        <LTVRow pct={lender.ltv} lang={lang} dataSource="Computed · self-report.balance ÷ valuation.data.private.maxPrice"/>
        {lenders.length === 1 && <DataRow label={tr('lender', lang)} value={lender.name} dataSource="Self-report · loan.bank"/>}
        <DataRow label={tr('balance', lang)} value={lender.balance} dataSource="Self-report · loan.balance"/>
        <DataRow label={tr('interestRate', lang)} value={lender.rate} dataSource="Self-report · loan.rate"/>
        <DataRow label={tr('monthlyPayment', lang)} value={lender.monthly} dataSource="Self-report · loan.monthly"/>
        <DataRow label={tr('remainingTerm', lang)} value={lender.term} dataSource="Self-report · loan.term" last/>
      </div>
    </div>
  );
}

function DesktopInsuranceSavings({ vehicle, showSavings, currency, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  if (!showSavings || !vehicle.insuranceSavings) return null;
  return (
    <button data-source="Computed · avg market premium − member premium" style={{
      width: '100%', textAlign: 'left',
      background: 'linear-gradient(90deg, var(--color-gradient-from), var(--color-gradient-to))',
      borderRadius: 'var(--radius-card)',
      padding: '18px 20px',
      color: '#fff',
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 8px 20px rgba(26,144,112,0.28)',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.1, marginBottom: 3 }}>
          {tr('switchInsurance', lang, { amount: vehicle.insuranceSavings, currency })}
        </div>
        <div style={{ fontSize: 12, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 4 }}>
          {tr('seeNewOffers', lang)} {Icon.arrowR('currentColor', 13)}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{Icon.shield(56)}</div>
    </button>
  );
}

function DesktopCarOffer({ vehicle, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [productCat, setProductCat] = React.useState('Category 1');
  React.useEffect(() => { setProductCat('Category 1'); }, [vehicle.id]);

  const FALLBACK = {
    'Category 1': { provider: 'Lorem Ipsum', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 2': { provider: 'Dolor Sit',  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 3': { provider: 'Amet Consectetur', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
  };
  const offerProducts = FALLBACK;
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
        padding: '18px 20px 0',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--color-heading)' }}>
            {tr('popularProductsCar', lang)}
          </div>
        </div>
        <window.ProductPills
          categories={Object.keys(offerProducts)}
          active={productCat}
          onChange={setProductCat}
          size="desktop"
        />
      </div>
      <div style={{ padding: 20 }}>
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
}

window.DesktopCarShell = DesktopCarShell;
