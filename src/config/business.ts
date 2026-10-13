/**
 * ============================================================================
 *  BUSINESS CONFIG: the ONLY file you need to edit for a new client site.
 * ============================================================================
 *  Everything on the page (text, menu, hours, schema.org data, colors, meta
 *  tags) is generated from this object.
 *
 *  ⚠️  ALL VALUES BELOW ARE SAMPLE / DEMO DATA. "Sample Bistro" is not a real
 *  business. 555-01xx phone numbers are reserved fictional numbers.
 *  Set `demoMode: false` once real client data is in place to hide the
 *  "Sample content" banner and labels.
 * ============================================================================
 */

export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

/** 24-hour "HH:MM" strings. A close time <= open time means "past midnight". */
export interface TimeRange {
  open: string;
  close: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  /** Number (formatted with `currency`) or a free-form string like "Market price". */
  price: number | string;
  /** Short dietary / highlight tags, e.g. "V", "GF", "Spicy", "Chef's pick". */
  tags?: string[];
}

export interface MenuCategory {
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface SocialLink {
  label: string; // e.g. "Instagram"
  url: string;
}

export interface BusinessConfig {
  /** Shows the "Sample content" banner + labels. Set to false for real clients. */
  demoMode: boolean;

  name: string;
  tagline: string;
  /** 1–3 sentences. Used on the page, in <meta description>, and in schema.org. */
  description: string;
  /** Heading for the intro/about section. */
  aboutTitle?: string;
  /** Optional short selling points shown next to the description. */
  highlights?: string[];

  /** Production URL, no trailing slash. Used for canonical + OG + schema URLs. */
  siteUrl: string;

  /** Display format for the phone number. */
  phone: string;
  /** E.164 format for tel: links + schema, e.g. "+15550100123". */
  phoneE164: string;
  email: string;

  address: {
    street: string;
    city: string;
    region: string; // state / province
    postalCode: string;
    country: string; // ISO 3166-1 alpha-2, e.g. "US"
  };
  geo: { latitude: number; longitude: number };

  /** IANA time zone of the restaurant, used to highlight "today" + open/closed. */
  timezone: string;
  /** Empty array = closed that day. Multiple ranges allowed (e.g. lunch + dinner). */
  hours: Record<DayKey, TimeRange[]>;
  /** Optional one-line note under the hours table (holidays, kitchen close, etc.). */
  hoursNote?: string;

  cuisine: string[]; // schema.org servesCuisine
  priceRange: string; // e.g. "$$"
  currency: string; // ISO 4217, e.g. "USD"
  acceptsReservations: boolean;

  menu: MenuCategory[];
  /** Optional link to a full PDF menu in /public, e.g. "/menu.pdf". */
  menuPdf?: string;

  social: SocialLink[];

  /** Formspree form ID (the part after https://formspree.io/f/). */
  formspreeId: string;

  googleMaps: {
    /**
     * Preferred: paste the `src` from Google Maps → Share → Embed a map.
     * Leave '' to fall back to `query`, or to show a placeholder if both empty.
     */
    embedUrl: string;
    /** Fallback: a plain search query (business name + address). No API key needed. */
    query: string;
  };

  /** Brand colors (any CSS color). */
  colors: {
    primary: string; // buttons, links, accents
    primaryContrast: string; // text on top of primary
    accent: string; // small highlights, badges
    dark: string; // hero overlay, footer, headings
    light: string; // page background
  };

  hero: {
    /** Path inside /public. Replace the placeholder with a real photo (≈1920×1080 JPG/WebP). */
    image: string;
    alt: string;
  };

  /** 1200×630 image in /public used for social sharing previews. */
  ogImage: string;
  /** Square logo/favicon in /public. */
  favicon: string;
}

/** Value that marks the Formspree ID as "not configured yet". */
export const FORMSPREE_PLACEHOLDER = 'YOUR_FORMSPREE_ID';

export const business: BusinessConfig = {
  demoMode: true,

  name: 'Sample Bistro (Demo Data)',
  tagline: 'Seasonal plates, wood-fired bread & a neighborhood table for everyone.',
  description:
    'SAMPLE DESCRIPTION: Sample Bistro is a fictional neighborhood restaurant used to demo this website template. Replace this text with two or three sentences about the real restaurant, its food, and what makes it special.',
  aboutTitle: 'A neighborhood table for every occasion',
  highlights: ['Wood-fired kitchen', 'Local farm produce', 'Family friendly', 'Private events'],

  siteUrl: 'https://sample-bistro.example.com',

  phone: '(555) 010-0123',
  phoneE164: '+15550100123',
  email: 'hello@example.com',

  address: {
    street: '123 Example Avenue',
    city: 'Anytown',
    region: 'NY',
    postalCode: '00000',
    country: 'US',
  },
  geo: { latitude: 40.7128, longitude: -74.006 }, // sample coordinates

  timezone: 'America/New_York',
  hours: {
    monday: [],
    tuesday: [{ open: '17:00', close: '22:00' }],
    wednesday: [{ open: '17:00', close: '22:00' }],
    thursday: [{ open: '17:00', close: '22:00' }],
    friday: [
      { open: '11:30', close: '14:30' },
      { open: '17:00', close: '23:00' },
    ],
    saturday: [
      { open: '10:00', close: '15:00' },
      { open: '17:00', close: '23:00' },
    ],
    sunday: [{ open: '10:00', close: '15:00' }],
  },
  hoursNote: 'Sample note: kitchen closes 30 minutes before close. Hours may vary on holidays.',

  cuisine: ['New American', 'Mediterranean'],
  priceRange: '$$',
  currency: 'USD',
  acceptsReservations: true,

  menu: [
    {
      name: 'Starters',
      description: 'Sample items, for demonstration only.',
      items: [
        {
          name: 'Wood-Fired Flatbread',
          description: 'Whipped ricotta, roasted garlic, hot honey, sea salt.',
          price: 12,
          tags: ['V'],
        },
        {
          name: 'Crispy Brussels Sprouts',
          description: 'Maple-chili glaze, toasted pecans, lemon zest.',
          price: 11,
          tags: ['V', 'GF'],
        },
        {
          name: 'Grilled Octopus',
          description: 'Romesco, charred lemon, fingerling potatoes.',
          price: 18,
          tags: ['GF'],
        },
      ],
    },
    {
      name: 'Mains',
      items: [
        {
          name: 'Roasted Half Chicken',
          description: 'Herb jus, smashed potatoes, seasonal greens.',
          price: 26,
          tags: ['GF', "Chef's pick"],
        },
        {
          name: 'Pan-Seared Salmon',
          description: 'Farro, blistered tomatoes, salsa verde.',
          price: 29,
        },
        {
          name: 'Wild Mushroom Risotto',
          description: 'Arborio, parmesan, thyme, truffle oil.',
          price: 22,
          tags: ['V'],
        },
        {
          name: 'Bistro Burger',
          description: 'Dry-aged blend, aged cheddar, caramelized onion, fries.',
          price: 19,
        },
      ],
    },
    {
      name: 'Desserts',
      items: [
        {
          name: 'Olive Oil Cake',
          description: 'Citrus curd, whipped mascarpone.',
          price: 10,
          tags: ['V'],
        },
        {
          name: 'Dark Chocolate Pot de Crème',
          description: 'Sea salt, shortbread crumble.',
          price: 9,
          tags: ['V'],
        },
      ],
    },
    {
      name: 'Drinks',
      items: [
        { name: 'House Lemonade', description: 'Fresh mint or lavender.', price: 5 },
        { name: 'Local Draft Beer', description: 'Ask about rotating taps.', price: 8 },
        { name: 'Wine by the Glass', description: 'Seasonal selection.', price: 'Market price' },
      ],
    },
  ],

  social: [
    { label: 'Instagram', url: 'https://example.com/instagram-sample' },
    { label: 'Facebook', url: 'https://example.com/facebook-sample' },
  ],

  formspreeId: FORMSPREE_PLACEHOLDER,

  googleMaps: {
    embedUrl: '',
    query: '',
  },

  colors: {
    primary: '#b4532a',
    primaryContrast: '#ffffff',
    accent: '#e9b949',
    dark: '#1f1a17',
    light: '#faf6f0',
  },

  hero: {
    image: '/images/hero-placeholder.svg',
    alt: 'Placeholder hero artwork (replace with a photo of the restaurant)',
  },

  ogImage: '/images/og-image.png',
  favicon: '/favicon.svg',
};
