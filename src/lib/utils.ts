import { business, FORMSPREE_PLACEHOLDER, type DayKey, type TimeRange } from '../config/business';

export const DAYS: { key: DayKey; label: string; schema: string }[] = [
  { key: 'monday', label: 'Monday', schema: 'https://schema.org/Monday' },
  { key: 'tuesday', label: 'Tuesday', schema: 'https://schema.org/Tuesday' },
  { key: 'wednesday', label: 'Wednesday', schema: 'https://schema.org/Wednesday' },
  { key: 'thursday', label: 'Thursday', schema: 'https://schema.org/Thursday' },
  { key: 'friday', label: 'Friday', schema: 'https://schema.org/Friday' },
  { key: 'saturday', label: 'Saturday', schema: 'https://schema.org/Saturday' },
  { key: 'sunday', label: 'Sunday', schema: 'https://schema.org/Sunday' },
];

/** "17:00" -> "5 PM", "11:30" -> "11:30 AM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 && h < 24 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour12}:${String(m).padStart(2, '0')} ${period}` : `${hour12} ${period}`;
}

export function formatRanges(ranges: TimeRange[]): string {
  if (!ranges.length) return 'Closed';
  return ranges.map((r) => `${formatTime(r.open)} – ${formatTime(r.close)}`).join(', ');
}

export function formatPrice(price: number | string): string {
  if (typeof price === 'string') return price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: business.currency,
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}

export const telHref = `tel:${business.phoneE164}`;
export const mailHref = `mailto:${business.email}`;

export const fullAddress = [
  business.address.street,
  business.address.city,
  `${business.address.region} ${business.address.postalCode}`.trim(),
]
  .filter(Boolean)
  .join(', ');

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.name.replace(/\s*\(.*?\)\s*/g, ' ').trim()}, ${fullAddress}`,
)}`;

/** Resolved Google Maps iframe src, or null when nothing is configured. */
export const mapEmbedSrc: string | null = business.googleMaps.embedUrl.trim()
  ? business.googleMaps.embedUrl.trim()
  : business.googleMaps.query.trim()
    ? `https://www.google.com/maps?q=${encodeURIComponent(business.googleMaps.query.trim())}&output=embed`
    : null;

export const formspreeConfigured =
  !!business.formspreeId.trim() && business.formspreeId.trim() !== FORMSPREE_PLACEHOLDER;

export const formspreeAction = `https://formspree.io/f/${business.formspreeId.trim() || FORMSPREE_PLACEHOLDER}`;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${business.siteUrl.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`;
}
