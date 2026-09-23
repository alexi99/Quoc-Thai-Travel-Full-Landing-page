/** Static, language-independent tour data shared across components. */

export const TOUR = {
  brand: "Vietnam Wonders Tour",
  priceAdultUsd: 200,
  priceChildUsd: 150,
  priceInfantUsd: 0,
  priceVnd: 5_200_000,
  minGuests: 4,
  maxGuests: 11,
  ratingValue: 4.9,
  reviewCount: 512,
  whatsapp: "84912345678",
  whatsappText:
    "Hello! I'm interested in the 3-day Hanoi – Ninh Binh – Ha Long Bay tour.",
  email: "hello@vietnamwonderstour.com",
  phone: "+84 91 234 5678",
  siteUrl: "https://vietnamwonderstour.example.com",
} as const;

export const NAV_SECTIONS = [
  { id: "itinerary", key: "itinerary" },
  { id: "highlights", key: "highlights" },
  { id: "pricing", key: "pricing" },
  { id: "gallery", key: "gallery" },
  { id: "reviews", key: "reviews" },
  { id: "faq", key: "faq" },
] as const;

/** Gallery images — index matches `gallery.captions` in every dictionary. */
export const GALLERY_IMAGES = [
  "/images/hero-halong.jpg",
  "/images/tam-coc.jpg",
  "/images/halong-cruise.jpg",
  "/images/sung-sot-cave.jpg",
  "/images/phat-diem.jpg",
  "/images/cabin-balcony.jpg",
  "/images/titop-island.jpg",
  "/images/cuisine.jpg",
  "/images/kayak-luon-cave.jpg",
  // Remote stock photography (lazy-loaded) rounds out the gallery.
  "https://images.pexels.com/photos/6871149/pexels-photo-6871149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/38093155/pexels-photo-38093155.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  "https://images.pexels.com/photos/34997380/pexels-photo-34997380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
];

/** Day thumbnails used in the itinerary tabs. */
export const DAY_IMAGES = [
  "/images/tam-coc.jpg",
  "/images/halong-cruise.jpg",
  "/images/sung-sot-cave.jpg",
];

/** Country list for the nationality dropdown (English names + flags). */
export const COUNTRIES: { name: string; flag: string }[] = [
  { name: "Argentina", flag: "🇦🇷" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Austria", flag: "🇦🇹" },
  { name: "Belgium", flag: "🇧🇪" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Chile", flag: "🇨🇱" },
  { name: "China", flag: "🇨🇳" },
  { name: "Colombia", flag: "🇨🇴" },
  { name: "Czechia", flag: "🇨🇿" },
  { name: "Denmark", flag: "🇩🇰" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Finland", flag: "🇫🇮" },
  { name: "France", flag: "🇫🇷" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Greece", flag: "🇬🇷" },
  { name: "Hong Kong", flag: "🇭🇰" },
  { name: "Hungary", flag: "🇭🇺" },
  { name: "India", flag: "🇮🇳" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Israel", flag: "🇮🇱" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Mexico", flag: "🇲🇽" },
  { name: "Netherlands", flag: "🇳🇱" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Norway", flag: "🇳🇴" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Romania", flag: "🇷🇴" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "South Korea", flag: "🇰🇷" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "Sweden", flag: "🇸🇪" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Taiwan", flag: "🇹🇼" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Türkiye", flag: "🇹🇷" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "United States", flag: "🇺🇸" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Other", flag: "🌍" },
];

/** Phone country codes for the tel input. */
export const DIAL_CODES: { code: string; label: string; flag: string }[] = [
  { code: "+1", label: "US/CA", flag: "🇺🇸" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+34", label: "ES", flag: "🇪🇸" },
  { code: "+39", label: "IT", flag: "🇮🇹" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+31", label: "NL", flag: "🇳🇱" },
  { code: "+32", label: "BE", flag: "🇧🇪" },
  { code: "+41", label: "CH", flag: "🇨🇭" },
  { code: "+43", label: "AT", flag: "🇦🇹" },
  { code: "+45", label: "DK", flag: "🇩🇰" },
  { code: "+46", label: "SE", flag: "🇸🇪" },
  { code: "+47", label: "NO", flag: "🇳🇴" },
  { code: "+351", label: "PT", flag: "🇵🇹" },
  { code: "+353", label: "IE", flag: "🇮🇪" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+64", label: "NZ", flag: "🇳🇿" },
  { code: "+65", label: "SG", flag: "🇸🇬" },
  { code: "+66", label: "TH", flag: "🇹🇭" },
  { code: "+81", label: "JP", flag: "🇯🇵" },
  { code: "+82", label: "KR", flag: "🇰🇷" },
  { code: "+84", label: "VN", flag: "🇻🇳" },
  { code: "+86", label: "CN", flag: "🇨🇳" },
  { code: "+852", label: "HK", flag: "🇭🇰" },
  { code: "+886", label: "TW", flag: "🇹🇼" },
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+971", label: "AE", flag: "🇦🇪" },
];

export function whatsappLink(text: string = TOUR.whatsappText): string {
  return `https://wa.me/${TOUR.whatsapp}?text=${encodeURIComponent(text)}`;
}
