/**
 * Shape of a complete translation dictionary.
 * Every locale file must satisfy this type, so TypeScript guarantees that
 * no string is left untranslated when a new language is added.
 */

export type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  /** Marks the "star" activity of the day. */
  star?: boolean;
};

export type DayPlan = {
  label: string;
  title: string;
  theme: string;
  items: TimelineItem[];
  overnight: string;
};

export type IconText = {
  title: string;
  desc: string;
};

export type Review = {
  quote: string;
  name: string;
  location: string;
  flag: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type Dictionary = {
  /** BCP-47 tag used for <html lang> and hreflang. */
  htmlLang: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    itinerary: string;
    highlights: string;
    pricing: string;
    gallery: string;
    reviews: string;
    faq: string;
    menu: string;
    language: string;
  };
  suggest: {
    text: string;
    accept: string;
    dismiss: string;
  };
  urgency: {
    text: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
    trust: string[];
  };
  overview: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { icon: string; title: string; value: string; desc: string }[];
    mapTitle: string;
    mapDesc: string;
    mapStops: string[];
  };
  itinerary: {
    eyebrow: string;
    title: string;
    subtitle: string;
    starLabel: string;
    overnightLabel: string;
    days: DayPlan[];
  };
  highlights: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: (IconText & { icon: string })[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    amount: string;
    perPerson: string;
    vnd: string;
    groupNote: string;
    childNote: string;
    includedTitle: string;
    notIncludedTitle: string;
    included: string[];
    notIncluded: string[];
    cta: string;
    guarantee: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    captions: string[];
    close: string;
    prev: string;
    next: string;
    openHint: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
    subtitle: string;
    aggregate: string;
    verified: string;
    items: Review[];
  };
  booking: {
    eyebrow: string;
    title: string;
    subtitle: string;
    sectionContact: string;
    sectionTrip: string;
    sectionPrefs: string;
    fullName: string;
    fullNamePh: string;
    email: string;
    emailPh: string;
    phone: string;
    phonePh: string;
    countryCode: string;
    nationality: string;
    nationalityPh: string;
    guideLanguage: string;
    startDate: string;
    adults: string;
    adultsHint: string;
    children: string;
    childrenHint: string;
    infants: string;
    infantsHint: string;
    roomPreference: string;
    rooms: string[];
    dietary: string;
    diets: string[];
    specialRequests: string;
    specialRequestsPh: string;
    referral: string;
    referrals: string[];
    summaryTitle: string;
    summaryAdults: string;
    summaryChildren: string;
    summaryInfants: string;
    free: string;
    estimatedTotal: string;
    submit: string;
    submitting: string;
    secureNote: string;
    required: string;
    errRequired: string;
    errEmail: string;
    errPhone: string;
    errDate: string;
    errAdults: string;
    errServer: string;
    successTitle: string;
    successText: string;
    successRef: string;
    successNext: string;
    successClose: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Faq[];
    stillTitle: string;
    stillText: string;
    stillCta: string;
  };
  footer: {
    tagline: string;
    linksTitle: string;
    links: string[];
    contactTitle: string;
    addressLabel: string;
    address: string;
    hours: string;
    newsletterTitle: string;
    newsletterDesc: string;
    emailPh: string;
    subscribe: string;
    subscribed: string;
    rights: string;
    payments: string;
    licence: string;
  };
  common: {
    bookNow: string;
    learnMore: string;
    perPerson: string;
    from: string;
    backToTop: string;
    chatWhatsapp: string;
    loading: string;
    darkMode: string;
    lightMode: string;
    spotsLeft: string;
    close: string;
  };
  exit: {
    title: string;
    desc: string;
    emailPh: string;
    cta: string;
    success: string;
    dismiss: string;
    noThanks: string;
  };
};
