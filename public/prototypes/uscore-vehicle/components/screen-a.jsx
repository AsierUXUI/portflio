// Variation A — with: house-value hero, insight at top, savings below tabs,
// redesigned popular products card (matching Figma reference), bottom nav.

function HouseScreenA({ activeId, setActiveId, showSavings, properties, country, lang, addressState, banner, onDismissBanner, hideChrome = false, hideBottomNav = false, headerStyle = 'tabs', onSetMortgageState }) {
  const propList = properties || PROPERTIES;
  const isSE = country === 'SE';
  const effLang = lang || 'en';
  const t = (k, vars) => window.tr ? window.tr(k, effLang, vars) : k;

  // ── State A — empty (0 properties) ────────────────────────────────
  if (!propList || propList.length === 0) {
    return (
      <HouseScreenEmpty
        country={country}
        t={t}
        lang={effLang}
        hideChrome={hideChrome}
        hideBottomNav={hideBottomNav}
      />
    );
  }

  const property = propList.find(p => p.id === activeId) || propList[0];
  const singleProperty = propList.length === 1;
  const [devModalOpen, setDevModalOpen] = React.useState(false);
  const [range, setRange] = React.useState('12 mo');
  const [lenderIdx, setLenderIdx] = React.useState(0);
  const [productCat, setProductCat] = React.useState('Category 1');
  const lenders = property.loan.lenders;
  const lender = lenders[lenderIdx] || null;
  const hasLoan = (property.mortgageState === 'has' || property.mortgageState === 'multiple') && lenders.length > 0;
  const noMortgage = property.mortgageState === 'none';
  const undecided = property.mortgageState === 'undecided';
  const savingsVisible = showSavings && hasLoan && property.savings > 0;

  // Fallback products for properties with none defined (e.g. no-mortgage props)
  const FALLBACK_PRODUCTS = {
    'Category 1': { provider: 'Lorem Ipsum', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 2': { provider: 'Dolor Sit', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
    'Category 3': { provider: 'Amet Consectetur', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', cta: 'Lorem ipsum' },
  };
  const offerProducts = FALLBACK_PRODUCTS;

  React.useEffect(() => { setLenderIdx(0); setProductCat('Category 1'); }, [activeId]);

  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--color-surface-page)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font)',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
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
        <AppTabBar active="Home" lang={effLang} onChange={(id) => {
          if (id === 'Vehicle') {
            window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { mode: 'car' } }, '*');
            window.dispatchEvent(new CustomEvent('uscore:setmode', { detail: 'car' }));
          }
        }}/>
        </>}

        {/* Swedish address component — above the asset pills, before mode-specific chrome */}
        {isSE && (
          <div style={{ padding: '14px 16px 0' }}>
            <window.AddressCard
              state={addressState}
              address={`${property.street}, ${property.postal} ${property.city}`}
              city={property.city}
              lang={effLang}
            />
          </div>
        )}

        {/* Asset pills header — only shown when 2+ properties; single goes straight to details card */}
        {!singleProperty && (
          <window.AssetPillsHeader
            kind="house"
            items={propList}
            activeId={activeId}
            onSelect={setActiveId}
            country={country}
            size="mobile"
            lang={effLang}
          />
        )}
        {singleProperty && <window.AssetTitleBlock kind="house" size="mobile" lang={effLang}/>}

        {/* Savings banner — directly below property tabs when active */}
        {savingsVisible && (
          <div style={{ padding: '12px 16px 0' }}>
            <button data-source="Computed · uScore-estimated rate vs member rate × balance" style={{
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
                  {t('saveAmountPerMonth', { amount: property.savings })}
                </div>
                <div style={{ fontSize: 11, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {t('refinanceMortgage')} {Icon.arrowR('currentColor', 13)}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>{Icon.moneybag(52)}</div>
            </button>
          </div>
        )}

        {/* Offer banner — shown in the savings slot when savings aren't available */}
        {!savingsVisible && banner && (
          <div style={{ padding: '12px 16px 0' }}>
            <window.OfferBanner banner={banner} onDismiss={onDismissBanner} variant="mobile" lang={effLang}/>
          </div>
        )}

        <div style={{ padding: '14px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Address + postcode — pill, same style as asset selector pills */}
          {singleProperty && (
            <div style={{ padding: '0 2px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                height: 32, padding: '0 14px', borderRadius: 'var(--radius-pill)',
                background: 'rgba(107,124,146,0.12)',
                color: 'var(--color-body)',
                fontFamily: 'Poppins',
                fontSize: 13, fontWeight: 600, letterSpacing: 0.1,
                maxWidth: '100%',
              }}>
                <span data-source="Cadastre / address registry · property.street">{property.street}</span>
                <span style={{ fontWeight: 600 }}>
                  {' · '}
                  <span data-source="Cadastre / address registry · property.postal, city">{property.postal} {property.city}</span>
                  {' · '}
                  <span data-source="Cadastre / address registry · property.area_m2">{property.value.m2} m²</span>
                </span>
              </span>
            </div>
          )}

          {/* Insight card — at top, can be about anything */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-card)',
            padding: '12px 14px',
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <div style={{ color: 'var(--color-info)', flexShrink: 0, marginTop: 1 }}>
              {Icon.sparkle('currentColor', 18)}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.45, color: 'var(--color-body)' }}>
              {property.insight.prefix}{' '}
              <span style={{ color: 'var(--color-info)', fontWeight: 700 }}>{property.insight.stat}</span>{' '}
              {property.insight.text}
            </div>
          </div>

          {/* No-mortgage prompt */}
          {undecided && (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-card)', padding: 16,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 20)}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-heading)' }}>
                  {t('haveMortgageQuestion')}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                {t('haveMortgageBody')}
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

          {/* House value card — hero layout */}
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-card)',
            boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
            padding: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-body-muted)', marginBottom: 8 }}>
              {t('estimatedValue')}
            </div>

            {/* Hero: big value + delta pill side by side. AnimatedNumber tweens
                the numeric magnitude; growth pill crossfades beneath the value. */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
                <span data-source="AVM (automated valuation) · valuation.estimated" style={{ display: 'inline-block' }}>
                <AnimatedNumber value={property.value.estimated} style={{
                  fontSize: 24, fontWeight: 700, color: 'var(--color-heading)',
                  lineHeight: 1.1, letterSpacing: -0.3, display: 'block', whiteSpace: 'nowrap',
                }}/>
                </span>
                <ValueM2Tooltip value={property.value.perM2} lang={effLang}/>
              </span>
              <window.CrossFade keyId={`growth-${property.id}`}>
                <window.GrowthPill
                  growthValue={property.value.growthValue}
                  price={property.value.boughtFor}
                  year={property.value.boughtYear}
                  lang={effLang}
                />
              </window.CrossFade>
            </div>

            {/* Chart — crossfade between properties so path morphs smoothly */}
            <div style={{ marginTop: 14 }} data-source="AVM · valuation.timeline[]">
              <window.CrossFade keyId={`chart-${property.id}-${range}`}>
                <Sparkline range={range} onRange={setRange} data={window.chartForProperty ? window.chartForProperty(property.id) : undefined}/>
              </window.CrossFade>
            </div>
          </div>

          {/* Loan card */}
          {hasLoan && (
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-heading)', paddingTop: 4 }}>
                  {t('yourMortgage')}
                </div>
                <LoanMenu hasActive={lender && parseFloat(lender.balance) > 0} lang={effLang}/>
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
                <LTVRow pct={lender.ltv} lang={effLang} dataSource="Computed · balance ÷ valuation.estimated"/>
                {lenders.length === 1 && <DataRow label={t('lender')} value={lender.name} dataSource="PSD2 / bank API · loan.lender"/>}
                <DataRow label={t('balance')} value={lender.balance} dataSource="PSD2 / bank API · loan.balance"/>
                <DataRow label={t('interestRate')} value={lender.rate} dataSource="PSD2 / bank API · loan.rate"/>
                <DataRow label={t('monthlyPayment')} value={lender.monthly} dataSource="PSD2 / bank API · loan.monthly"/>
                <DataRow label={t('remainingTerm')} value={lender.term} dataSource="Computed · balance / monthly / rate" last/>
              </div>
            </div>
          )}

          {/* Popular products — always visible: we have offers for every home regardless of loan status */}
          {(() => {
            const offer = offerProducts[productCat] || offerProducts[Object.keys(offerProducts)[0]];
            if (!offer) return null;
            return (
              <div style={{
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-card)',
                boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
                overflow: 'hidden',
              }}>
                {/* Header: icon + title + share action; tab row */}
                <div style={{
                  padding: '14px 16px 0',
                  position: 'relative', zIndex: 1,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <div style={{ flex: 1, fontSize: 15, fontWeight: 700, color: 'var(--color-heading)', lineHeight: 1.3 }}>
                      {t('popularProductsHome')}
                    </div>
                  </div>

                  {/* Category pills — leading icon, same chip styling as the
                      asset header pills. Replaces the underlined tab row. */}
                  <window.ProductPills
                    categories={Object.keys(offerProducts)}
                    active={productCat}
                    onChange={setProductCat}
                    size="mobile"
                  />
                </div>

                {/* Offer body */}
                <div style={{ padding: 16 }}>
                  {/* Partner row: logo + name + stars */}
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

                  {/* Description */}
                  <div style={{ fontSize: 13, color: 'var(--color-body)', lineHeight: 1.5, marginBottom: 14 }}>
                    {offer.desc}
                  </div>

                  {/* Main CTA */}
                  <button style={{
                    width: '100%', height: 48, borderRadius: 10,
                    background: 'var(--color-cta)', color: '#FFFFFF',
                    fontSize: 14, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    Lorem ipsum {Icon.arrowR('currentColor', 16)}
                  </button>

                  {/* Info footer */}
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

          {noMortgage && (
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-card)', padding: 16,
            }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ color: 'var(--color-warning)' }}>{Icon.bulb('currentColor', 20)}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-heading)' }}>
                  {t('noMortgageOn', { street: property.street })}
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--color-body-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                {t('noMortgageBody')}
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
        </div>
      </div>

      {/* Bottom navigation */}
      {!hideBottomNav && <BottomNav active="Dashboard" lang={effLang}/>}

      <window.DevSelfReportModal
        open={devModalOpen}
        kind="mortgage"
        lang={effLang}
        assetName={property.street}
        onClose={() => setDevModalOpen(false)}
        onConfirm={() => onSetMortgageState && onSetMortgageState('one')}
      />
    </div>
  );
}

// ─── Bottom nav (Dashboard / Tilbud / Meny) ────────────────────────
function BottomNav({ active = 'Dashboard', lang = 'en' }) {
  const tr = window.tr || ((k) => k);
  const items = [
    { id: 'Dashboard', label: tr('navDashboard', lang), icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="9" rx="1.5" fill={c}/>
        <rect x="14" y="3" width="7" height="5" rx="1.5" fill={c}/>
        <rect x="14" y="12" width="7" height="9" rx="1.5" fill={c}/>
        <rect x="3" y="16" width="7" height="5" rx="1.5" fill={c}/>
      </svg>
    )},
    { id: 'Tilbud', label: tr('navOffers', lang), icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 12V5a2 2 0 012-2h7l9 9-9 9-9-9z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="8" cy="8" r="1.5" stroke={c} strokeWidth="1.8"/>
      </svg>
    )},
    { id: 'Meny', label: tr('navMenu', lang), icon: (c) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h16" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )},
  ];
  return (
    <div style={{
      flexShrink: 0, background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border-subtle)',
      padding: '8px 16px 10px',
      display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center',
    }}>
      {items.map(it => {
        const a = it.id === active;
        return (
          <button key={it.id} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 8px',
            borderRadius: 14,
            background: a ? 'var(--color-surface-page)' : 'transparent',
            color: 'var(--color-heading)',
          }}>
            <div>{it.icon('currentColor')}</div>
            <div style={{ fontSize: 12, fontWeight: a ? 600 : 500 }}>{it.label}</div>
          </button>
        );
      })}
    </div>
  );
}

window.HouseScreenA = HouseScreenA;
window.BottomNav = BottomNav;

// ─── ValueM2Tooltip — (i) icon next to the big value figure ─────────────
// Tap to toggle a small popup with the value per square meter.
function ValueM2Tooltip({ value, lang }) {
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
    ? window.tr('valuePerM2Tooltip', lang || 'en', { value })
    : `Estimated at ${value} per m².`;

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(o => !o); }}
        aria-label="Value per square meter"
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
          minWidth: 180, maxWidth: 220,
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

window.ValueM2Tooltip = ValueM2Tooltip;

// ─── State A — empty house state (single offer card, no asset chrome) ─
function HouseScreenEmpty({ country, t, lang = 'en', hideChrome, hideBottomNav }) {
  return (
    <div style={{
      width: '100%', height: '100%', background: 'var(--color-surface-page)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font)',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <window.AssetTitleBlock kind="house" size="mobile" lang={lang}/>
        <div style={{ padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <EmptyOfferCard kind="house" t={t} />
        </div>
      </div>

      {!hideBottomNav && <BottomNav active="Dashboard" lang={lang}/>}
    </div>
  );
}

// Single "Looking for a new X?" partner offer card — used by mobile + desktop empty states.
function EmptyOfferCard({ kind, t, size = 'mobile' }) {
  const isCar = kind === 'car';
  const titleKey = isCar ? 'lookingForNewCar' : 'lookingForNewHome';
  const bodyKey  = isCar ? 'lookingForCarBody' : 'lookingForHomeBody';
  // Partners chosen to match the product context — Axo offers both car loans + mortgages.
  const partner  = 'Axo Finans';
  const big = size === 'desktop';
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: big ? '28px' : '20px',
    }}>
      <div style={{
        fontSize: big ? 22 : 18, fontWeight: 700,
        color: 'var(--color-heading)', lineHeight: 1.25,
        marginBottom: big ? 10 : 8,
      }}>
        {t(titleKey)}
      </div>
      <div style={{
        fontSize: big ? 14 : 13,
        color: 'var(--color-body)', lineHeight: 1.55,
        marginBottom: big ? 20 : 16,
      }}>
        {t(bodyKey)}
      </div>

      {/* Partner row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: big ? '14px 16px' : '12px 14px',
        background: 'var(--color-surface-page)',
        borderRadius: 10,
        marginBottom: big ? 20 : 16,
      }}>
        <div style={{
          width: big ? 40 : 36, height: big ? 40 : 36, borderRadius: 9,
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, color: 'var(--color-heading)',
          fontSize: big ? 14 : 12, letterSpacing: 0.4,
        }}>AXO</div>
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ fontSize: big ? 14 : 13, fontWeight: 600, color: 'var(--color-heading)' }}>
            {partner}
          </div>
          <div style={{ fontSize: big ? 12 : 11.5, color: 'var(--color-body-muted)' }}>
            {isCar ? 'Auto loans · Norway & Sweden' : 'Mortgages · Norway & Sweden'}
          </div>
        </div>
      </div>

      <button style={{
        width: '100%', height: big ? 48 : 44, borderRadius: 10,
        background: 'var(--color-cta)', color: '#fff',
        fontSize: 14, fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        border: 0, cursor: 'pointer',
      }}>
        {t('seeOffers')} {Icon.arrowR('currentColor', 16)}
      </button>
    </div>
  );
}

window.HouseScreenEmpty = HouseScreenEmpty;
window.EmptyOfferCard = EmptyOfferCard;

// ─── Empty asset details card (house or car) ───────────────────────
// Same visual structure as the single-asset details card, but with the
// content faded to placeholders and a "No data found" line below.
function EmptyAssetCard({ kind, t, size = 'mobile' }) {
  const isCar = kind === 'car';
  const big = size === 'desktop';
  const iconBox = big ? 68 : 56;
  const iconSz  = big ? 36 : 30;

  // Title / sub copy in the placeholder spots
  const titleLine = isCar
    ? <span style={{ opacity: 0.55 }}>—</span>
    : <span style={{ opacity: 0.55 }}>—</span>;

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-card)',
      boxShadow: '0 1px 3px rgba(30,37,47,0.06), 0 4px 14px rgba(30,37,47,0.05)',
      padding: big ? 24 : 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: big ? 16 : 12 }}>
        <div style={{
          width: iconBox, height: iconBox, borderRadius: big ? 14 : 12,
          background: 'var(--color-surface-page)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, overflow: 'hidden',
          color: 'var(--color-body-muted)',
          opacity: 0.55,
        }}>
          {isCar ? (
            // Generic car silhouette (no brand logo since none exists)
            <svg width={iconSz} height={iconSz} viewBox="0 0 24 24" fill="none">
              <path d="M3 16v-3l2-5a2 2 0 011.9-1.4h10.2A2 2 0 0119 8l2 5v3a1 1 0 01-1 1h-1.5a1.5 1.5 0 11-3 0H8.5a1.5 1.5 0 11-3 0H4a1 1 0 01-1-1z"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
              <path d="M5 13h14" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
          ) : (
            // House outline
            <svg width={iconSz} height={iconSz} viewBox="0 0 24 24" fill="none">
              <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"
                stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: big ? 18 : 15, fontWeight: 700,
            color: 'var(--color-heading)', lineHeight: 1.25,
            opacity: 0.5,
          }}>
            {t('noDataFound')}
          </div>
          <div style={{
            fontSize: big ? 13 : 12,
            color: 'var(--color-body-muted)',
            marginTop: big ? 6 : 4,
            display: 'flex', alignItems: 'center', gap: big ? 10 : 8, flexWrap: 'wrap',
          }}>
            <span style={{ opacity: 0.55 }}>— · —</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: big ? '3px 10px' : '2px 8px', borderRadius: 999,
              background: 'var(--color-surface-page)',
              color: 'var(--color-body-muted)',
              fontSize: big ? 12 : 11, fontWeight: 600, lineHeight: 1.4,
              border: '1px solid var(--color-border, rgba(30,37,47,0.08))',
              opacity: 0.55,
            }}>
              {isCar ? '— fuel' : '— m²'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.EmptyAssetCard = EmptyAssetCard;
