import { business } from '../config/business';
import { DAYS, absoluteUrl } from './utils';

/** Builds a schema.org Restaurant (a LocalBusiness subtype) JSON-LD object from the config. */
export function buildRestaurantSchema() {
  const openingHoursSpecification = DAYS.flatMap((d) =>
    business.hours[d.key].map((r) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: d.schema,
      opens: r.open,
      closes: r.close,
    })),
  );

  const menu = {
    '@type': 'Menu',
    name: `${business.name} Menu`,
    hasMenuSection: business.menu.map((cat) => ({
      '@type': 'MenuSection',
      name: cat.name,
      ...(cat.description ? { description: cat.description } : {}),
      hasMenuItem: cat.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(typeof item.price === 'number'
          ? {
              offers: {
                '@type': 'Offer',
                price: item.price.toFixed(2),
                priceCurrency: business.currency,
              },
            }
          : {}),
      })),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${business.siteUrl}/#restaurant`,
    name: business.name,
    description: business.description,
    url: business.siteUrl,
    telephone: business.phoneE164,
    email: business.email,
    image: [absoluteUrl(business.ogImage)],
    logo: absoluteUrl(business.favicon),
    priceRange: business.priceRange,
    servesCuisine: business.cuisine,
    acceptsReservations: business.acceptsReservations,
    currenciesAccepted: business.currency,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification,
    hasMenu: menu,
    ...(business.social.length ? { sameAs: business.social.map((s) => s.url) } : {}),
  };
}

/** Safe for embedding inside <script type="application/ld+json">. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
