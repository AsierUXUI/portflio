// Offer banner catalog — content keyed by id for house + car.
// Each banner has { id, title, discount, subtitle, image }.
// `image` is 60/40 right-column art; falls back to a tinted color block if missing.

window.HOUSE_BANNERS = {
  electricity: {
    id: 'electricity',
    titleKey: 'bannerElectricityTitle',
    subtitleKey: 'bannerElectricitySub',
    title: 'Cut your monthly costs in electricity during winter',
    discount: '15%',
    subtitle: 'With Tibber spot price',
    image: 'components/banner-assets/home-electricity.png?v=2',
    bgColor: '#1e2825',
    bgPosition: 'center 25%',
  },
  insurance: {
    id: 'insurance',
    titleKey: 'bannerInsuranceTitle',
    subtitleKey: 'bannerInsuranceSub',
    title: 'Pay less for your content insurance',
    discount: '15%',
    subtitle: 'For Uscore members with Tryg Insurance until November',
    image: 'components/banner-assets/insurance-car.jpg',
  },
};

window.CAR_BANNERS = {
  'eu-inspection': {
    id: 'eu-inspection',
    titleKey: 'bannerEUInspectionTitle',
    subtitleKey: 'bannerEUInspectionSub',
    title: 'You\u2019ve got an EU inspection next month',
    discount: '15%',
    subtitle: 'In NAF car workshops',
    image: 'components/banner-assets/eu-inspection.png',
  },
  'winter-tires': {
    id: 'winter-tires',
    titleKey: 'bannerWinterTiresTitle',
    subtitleKey: 'bannerWinterTiresSub',
    title: 'Winter is coming',
    discount: '25%',
    subtitle: 'On snow tires in Dekkmann stores until November',
    image: 'components/banner-assets/winter-tires.png',
  },
};
