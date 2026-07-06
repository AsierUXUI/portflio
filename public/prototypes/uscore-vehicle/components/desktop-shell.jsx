// Desktop web-app shell — two-column layout.
// Left rail: property tabs + insight + value + loan
// Right rail: address (SE) + offer carousel + savings banner
// Chrome: Uscore top nav with logo, tabs, bell + avatar.

function WebChrome({ activeTab = 'Home', onChange, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const tabs = [
    { id: 'Overview', label: tr('tabOverview', lang) },
    { id: 'Home',     label: tr('tabHome', lang) },
    { id: 'Vehicle',  label: tr('tabVehicle', lang) },
    { id: 'Debt',     label: tr('tabDebt', lang) },
    { id: 'Income',   label: tr('tabIncome', lang) },
  ];
  return (
    <div style={{
      height: 64,
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border-subtle)',
      boxShadow: '0 2px 8px rgba(30,37,47,0.06)',
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
      flexShrink: 0,
      position: 'relative', zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 40 }}>
        {Icon.uscoreLogo(28)}
      </div>
      <nav style={{ display: 'flex', gap: 4, flex: 1 }}>
        {tabs.map(({ id, label }) => {
          const a = id === activeTab;
          const clickable = false;
          return (
            <button
              key={id}
              onClick={() => clickable && onChange && onChange(id)}
              style={{
                padding: '8px 14px',
                fontSize: 14, fontWeight: a ? 600 : 500,
                color: a ? 'var(--color-info)' : 'var(--color-body)',
                borderRadius: 8,
                background: a ? 'var(--color-surface-page)' : 'transparent',
                position: 'relative',
                cursor: clickable ? 'pointer' : 'default',
                border: 0, fontFamily: 'inherit'
              }}>
              {label}
            </button>);

        })}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button style={{
          width: 40, height: 40, borderRadius: 20,
          background: 'var(--color-surface-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--color-heading)', position: 'relative'
        }}>
          {Icon.bellLine('currentColor', 20)}
          <span style={{
            position: 'absolute', top: 8, right: 10,
            width: 8, height: 8, borderRadius: 4,
            background: '#E53E3E', border: '2px solid var(--color-surface-page)'
          }} />
        </button>
        <div style={{
          width: 40, height: 40, borderRadius: 20,
          background: 'linear-gradient(135deg, #F68854, #E87B4A)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600,
          fontFamily: 'Poppins'
        }}>MA</div>
      </div>
    </div>);

}

function DesktopHouseDetails({ property }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 68, height: 68, borderRadius: 14,
          background: 'var(--color-surface-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
          color: 'var(--color-info)'
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.2 }} data-source="Cadastre / address registry · property.street">
            {property.street}
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-body-muted)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span data-source="Cadastre / address registry · property.postal, city">{property.postal} {property.city}</span>
            <span data-source="Cadastre / address registry · property.area_m2" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '3px 10px', borderRadius: 999,
              background: 'var(--color-surface-page)',
              color: 'var(--color-heading)',
              fontSize: 12, fontWeight: 600, lineHeight: 1.4,
              border: '1px solid var(--color-border, rgba(30,37,47,0.08))'
            }}>
              {property.value.m2} m²
            </span>
          </div>
        </div>
      </div>
    </div>);

}

function DesktopValueCard({ property, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [range, setRange] = React.useState('12 mo');
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-body-muted)', marginBottom: 12 }}>
        {tr('estimatedValue', lang)}
      </div>

      {/* Top row — three stats side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr',
        gap: 28,
        alignItems: 'flex-end',
        paddingBottom: 20,
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <div>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
            <span data-source="AVM (automated valuation) · valuation.estimated" style={{ display: 'inline-block' }}>
            <window.AnimatedNumber value={property.value.estimated} style={{
              fontSize: 34, fontWeight: 700, color: 'var(--color-heading)',
              lineHeight: 1.05, letterSpacing: -0.4, whiteSpace: 'nowrap', display: 'block'
            }} />
            </span>
            <window.ValueM2Tooltip value={property.value.perM2} lang={lang}/>
          </span>
          <window.CrossFade keyId={`dt-growth-${property.id}`}>
            <div style={{ marginTop: 10 }}>
              <window.GrowthPill
                growthValue={property.value.growthValue}
                price={property.value.boughtFor}
                year={property.value.boughtYear}
                lang={lang}
              />
            </div>
          </window.CrossFade>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-body-muted)' }}>{tr('boughtFor', lang)}</div>
          <window.CrossFade keyId={`dt-bought-${property.id}`}>
            <div data-source="Self-report or land registry · property.purchase_price" style={{
              fontSize: 18, fontWeight: 600, color: 'var(--color-heading)', marginTop: 4,
              whiteSpace: 'nowrap'
            }}>
              {property.value.boughtFor}
            </div>
          </window.CrossFade>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--color-body-muted)' }}>{tr('valuePerM2', lang)}</div>
          <window.CrossFade keyId={`dt-perm2-${property.id}`}>
            <div data-source="Computed · valuation.estimated ÷ area_m2" style={{
              fontSize: 18, fontWeight: 600, color: 'var(--color-heading)', marginTop: 4,
              whiteSpace: 'nowrap'
            }}>
              {property.value.perM2}
            </div>
          </window.CrossFade>
        </div>
      </div>

      {/* Chart below — crossfade between properties */}
      <div style={{ marginTop: 18 }}>
        <window.CrossFade keyId={`dt-chart-${property.id}-${range}`}>
          <Sparkline range={range} onRange={setRange} size="desktop" data={window.chartForProperty ? window.chartForProperty(property.id) : undefined} />
        </window.CrossFade>
      </div>
    </div>);

}

function DesktopLoanCard({ property, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [lenderIdx, setLenderIdx] = React.useState(0);
  React.useEffect(() => {setLenderIdx(0);}, [property.id]);
  const lenders = property.loan.lenders;
  if (!lenders.length) return null;
  const lender = lenders[lenderIdx];

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: 24
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-heading)', paddingTop: 4 }}>
          {tr('yourMortgage', lang)}
        </div>
        <LoanMenu hasActive={lender && parseFloat(lender.balance) > 0} lang={lang}/>
      </div>

      {lenders.length > 1 &&
      <div style={{ marginTop: 10, marginBottom: 4 }}>
        <window.SecondaryPills
          items={lenders.map((l, i) => ({ id: String(i), label: l.name }))}
          active={String(lenderIdx)}
          onChange={(id) => setLenderIdx(parseInt(id, 10))}
          size="desktop"
        />
      </div>
      }

      <div style={{ marginTop: lenders.length > 1 ? 8 : 4 }}>
        <LTVRow pct={lender.ltv} lang={lang} dataSource="Computed · balance ÷ valuation.estimated" />
        {lenders.length === 1 && <DataRow label={tr('lender', lang)} value={lender.name} dataSource="PSD2 / bank API · loan.lender" />}
        <DataRow label={tr('balance', lang)} value={lender.balance} dataSource="PSD2 / bank API · loan.balance" />
        <DataRow label={tr('interestRate', lang)} value={lender.rate} dataSource="PSD2 / bank API · loan.rate" />
        <DataRow label={tr('monthlyPayment', lang)} value={lender.monthly} dataSource="PSD2 / bank API · loan.monthly" />
        <DataRow label={tr('remainingTerm', lang)} value={lender.term} dataSource="Computed · balance / monthly / rate" last />
      </div>
    </div>);

}

function DesktopOfferCard({ property, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const [productCat, setProductCat] = React.useState('Category 1');
  React.useEffect(() => {setProductCat('Category 1');}, [property.id]);

  const FALLBACK_PRODUCTS = {
    'Category 1': { provider: 'Lorem Ipsum', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 2': { provider: 'Dolor Sit', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 3': { provider: 'Amet Consectetur', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' }
  };
  const offerProducts = FALLBACK_PRODUCTS;
  const offer = offerProducts[productCat] || offerProducts[Object.keys(offerProducts)[0]];
  if (!offer) return null;

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '18px 20px 0',
        position: 'relative', zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: 'var(--color-heading)' }}>{tr('popularProductsHomeDesktop', lang)}

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
            flexShrink: 0
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
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
        }}>
          Lorem ipsum {Icon.arrowR('currentColor', 16)}
        </button>
        <div style={{
          marginTop: 12, padding: '10px 12px',
          background: 'var(--color-surface-page)',
          borderRadius: 8,
          fontSize: 11, lineHeight: 1.45, color: 'var(--color-body-muted)'
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
        </div>
      </div>
    </div>);

}

function DesktopSavingsBanner({ property, hasLoan, showSavings, lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  if (!showSavings || !hasLoan || property.savings <= 0) return null;
  return (
    <button data-source="Computed · uScore-estimated rate vs member rate × balance" style={{
      width: '100%', textAlign: 'left',
      background: 'linear-gradient(90deg, var(--color-gradient-from), var(--color-gradient-to))',
      borderRadius: 'var(--radius-card)',
      padding: '18px 20px',
      color: '#fff',
      display: 'flex', alignItems: 'center', gap: 14,
      boxShadow: '0 8px 20px rgba(26,144,112,0.28)'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.1, marginBottom: 3 }}>
          {tr('saveAmountPerMonth', lang, { amount: property.savings })}
        </div>
        <div style={{ fontSize: 12, opacity: 0.9, display: 'flex', alignItems: 'center', gap: 4 }}>
          {tr('refinanceMortgage', lang)} {Icon.arrowR('currentColor', 13)}
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>{Icon.moneybag(56)}</div>
    </button>);

}

function DesktopInsightCard({ property }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-card)',
      padding: '14px 18px',
      display: 'flex', gap: 12, alignItems: 'flex-start'
    }}>
      <div style={{ color: 'var(--color-info)', flexShrink: 0, marginTop: 2 }}>
        {Icon.sparkle('currentColor', 20)}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--color-body)' }}>
        {property.insight.prefix}{' '}
        <span style={{ color: 'var(--color-info)', fontWeight: 700 }}>{property.insight.stat}</span>{' '}
        {property.insight.text}
      </div>
    </div>);

}

function UndecidedPrompt({ kind = 'mortgage', lang = 'en', onSetMortgageState, assetName, assetCode }) {
  const tr = window.tr || ((k) => k);
  const isCar = kind === 'car';
  const heading = isCar ? tr('haveLoanQuestion', lang) : tr('haveMortgageQuestion', lang);
  const body = isCar ? tr('haveLoanBody', lang) : tr('haveMortgageBody', lang);
  const [devModalOpen, setDevModalOpen] = React.useState(false);
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-card)', padding: 20
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 22)}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-heading)' }}>
          {heading}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 14 }}>
        {body}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => onSetMortgageState && onSetMortgageState('none')}
          style={{
            flex: 1, height: 42, borderRadius: 10,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-body)', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>{tr('no', lang)}</button>
        <button
          onClick={() => setDevModalOpen(true)}
          style={{
            flex: 1, height: 42, borderRadius: 10,
            background: 'var(--color-cta)', color: '#fff',
            fontSize: 14, fontWeight: 600,
            border: 0, cursor: 'pointer',
          }}>{tr('yes', lang)}</button>
      </div>
      <window.DevSelfReportModal
        open={devModalOpen}
        kind={kind}
        lang={lang}
        assetName={assetName}
        assetCode={assetCode}
        onClose={() => setDevModalOpen(false)}
        onConfirm={() => onSetMortgageState && onSetMortgageState('one')}
      />
    </div>);

}

function NoMortgageCard({ property, lang = 'en', onSetMortgageState }) {
  const tr = window.tr || ((k) => k);
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-card)', padding: 20
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
        <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 22)}</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-heading)' }}>
          {tr('noMortgageOn', lang, { street: property.street })}
        </div>
      </div>
      <div style={{ fontSize: 13, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 14 }}>
        {tr('noMortgageBody', lang)}
      </div>
      <button
        onClick={() => setModalOpen(true)}
        style={{
        width: '100%', height: 42, borderRadius: 10,
        background: 'transparent', color: 'var(--color-info)',
        fontSize: 14, fontWeight: 600,
        border: '1px solid var(--color-border)', cursor: 'pointer',
      }}>{tr('addLoan', lang)}</button>
      <window.DevSelfReportModal
        open={modalOpen}
        kind="mortgage"
        lang={lang}
        assetName={property.street}
        onClose={() => setModalOpen(false)}
        onConfirm={() => onSetMortgageState && onSetMortgageState('one')}
      />
    </div>);

}

function DesktopShell({ activeId, setActiveId, showSavings, properties, country, lang, addressState, banner, onDismissBanner, hideChrome = false, headerStyle = 'tabs', onSetMortgageState }) {
  const propList = properties || PROPERTIES;
  const effLang = lang || 'en';

  // ── State A — empty (0 properties) ────────────────────────────────
  if (!propList || propList.length === 0) {
    return <DesktopEmpty kind="house" lang={effLang} hideChrome={hideChrome} />;
  }

  const property = propList.find((p) => p.id === activeId) || propList[0];
  const singleProperty = propList.length === 1;
  const isSE = country === 'SE';
  const hasLoan = (property.mortgageState === 'has' || property.mortgageState === 'multiple') && property.loan.lenders.length > 0;
  const noMortgage = property.mortgageState === 'none';
  const undecided = property.mortgageState === 'undecided';

  const wrapperStyle = hideChrome ? {
    width: '100%',
    background: 'var(--color-surface-page)',
    fontFamily: 'var(--font)'
  } : {
    width: 1280,
    maxWidth: '100%',
    background: 'var(--color-surface-page)',
    borderRadius: 14,
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(30,37,47,0.18), 0 0 0 1px rgba(30,37,47,0.08)',
    fontFamily: 'var(--font)'
  };

  return (
    <div style={wrapperStyle}>
      {!hideChrome &&
      <WebChrome activeTab="Home" lang={lang} onChange={(id) => {
        if (id === 'Vehicle') {
          window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { mode: 'car' } }, '*');
          window.dispatchEvent(new CustomEvent('uscore:setmode', { detail: 'car' }));
        }
      }} />
      }

      {/* Asset pills header — only when 2+ properties. Single goes straight to the details card. */}
      {!singleProperty &&
      <window.AssetPillsHeader
        kind="house"
        items={propList}
        activeId={activeId}
        onSelect={setActiveId}
        country={country}
        size="desktop"
        lang={lang}
      />
      }
      {singleProperty && <window.AssetTitleBlock kind="house" size="desktop" lang={lang}/>}

      {/* Main content area */}
      <div style={{ padding: '24px 32px 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: 24,
          alignItems: 'start'
        }}>
          {/* Left rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            {singleProperty && <DesktopHouseDetails property={property} />}
            <DesktopInsightCard property={property} />
            {undecided && <UndecidedPrompt lang={lang} onSetMortgageState={onSetMortgageState} assetName={property.street} />}
            <DesktopValueCard property={property} lang={lang} />
            {hasLoan && <DesktopLoanCard property={property} lang={lang} />}
            {noMortgage && <NoMortgageCard property={property} lang={lang} onSetMortgageState={onSetMortgageState}/>}
          </div>

          {/* Right rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {showSavings && hasLoan && property.savings > 0 ?
            <DesktopSavingsBanner property={property} hasLoan={hasLoan} showSavings={showSavings} lang={lang} /> :
            banner ?
            <window.OfferBanner banner={banner} onDismiss={onDismissBanner} variant="desktop" lang={lang} /> :
            null}
            {isSE &&
            <window.AddressCard
              state={addressState}
              address={`${property.street}, ${property.postal} ${property.city}`}
              city={property.city}
              lang={lang} />

            }
            <DesktopOfferCard property={property} lang={lang} />
          </div>
        </div>
      </div>
    </div>);

}

window.DesktopShell = DesktopShell;
window.WebChrome = WebChrome;

// ─── State A — empty desktop state (single offer card, no asset chrome) ─
function DesktopEmpty({ kind = 'house', lang = 'en', hideChrome = false }) {
  const tr = window.tr || ((k, l, v) => k);
  const t = (k) => tr(k, lang);
  const isCar = kind === 'car';

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
      {!hideChrome &&
        <WebChrome activeTab={isCar ? 'Vehicle' : 'Home'} lang={lang} onChange={() => {}} />
      }
      <div style={{
        padding: '32px 32px 48px',
      }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-heading)', letterSpacing: -0.2, lineHeight: 1.2, marginBottom: 6 }}>
            {isCar ? tr('yourVehicles', lang) : tr('yourHomes', lang)}
          </div>
          <div style={{ fontSize: 14, color: 'var(--color-body-muted)', lineHeight: 1.45, marginBottom: 24 }}>
            {isCar ? tr('vehiclesSubtitle', lang) : tr('homesSubtitle', lang)}
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          alignItems: 'start',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
            <window.EmptyOfferCard kind={kind} t={t} size="desktop" />
          </div>
        </div>
      </div>
    </div>
  );
}

window.DesktopEmpty = DesktopEmpty;