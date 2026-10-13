# Restaurant Starter (Astro + Tailwind)

A reusable, mobile-first one-page website template for local restaurants. **Every piece of
business content lives in one typed file: [`src/config/business.ts`](src/config/business.ts).**

> ⚠️ The template ships with **sample data** ("Sample Bistro (Demo Data)", 555-01xx phone,
> example.com email). While `demoMode: true`, the site shows "Sample content" labels and adds a
> `noindex` meta tag so search engines ignore it.

## What's included

- Hero with name, tagline, cuisine/price badges and Call / Menu / Directions buttons
- Intro section with description and highlight cards
- Menu: categories, items, descriptions, prices, dietary tags, optional PDF link
- Hours table: highlights **today** and shows an **Open now / Closed now** badge (in the restaurant's time zone)
- Click-to-call: `tel:` links everywhere, plus a **sticky Call bar on mobile**
- Contact form wired for **Formspree** (`https://formspree.io/f/{formspreeId}`), with a visible
  "not connected yet" note and disabled submit while the ID is still the placeholder
- Google Maps embed slot (embed URL or plain query), with a styled placeholder when empty
- `Restaurant` (LocalBusiness) **JSON-LD** in `<head>` with address, geo, hours and full menu
- Meta description, canonical, Open Graph + Twitter card tags, theme color, favicon
- Self-hosted fonts (Inter + Fraunces); no external CDNs and no hotlinked images
- Static output (`dist/`), so it works on any static host

## Requirements

- Node **22.12+** (Astro 7 requirement; see `.nvmrc`)

## Spin up a new client site

1. **Copy the folder** (without build artifacts):
   ```bash
   rsync -a --exclude node_modules --exclude dist --exclude .astro --exclude .git --exclude screenshots \
     restaurant-starter/ client-name/
   cd client-name && git init && npm install
   ```
2. **Edit `src/config/business.ts`**: name, tagline, description, phone (display + E.164), email,
   address, geo coordinates, timezone, hours, cuisine, price range, menu, social links, brand colors,
   `siteUrl`. Set **`demoMode: false`** when the data is real.
3. **Images** (put them in `public/images/`):
   - Hero photo, about 1920×1080 JPG/WebP (keep it under ~300 KB). Set `hero.image` / `hero.alt`.
   - Favicon/logo: replace `public/favicon.svg` (or point `favicon` at a PNG).
   - Social preview: run `npm run og-image` to regenerate `public/images/og-image.png` from the
     config, or drop in your own 1200×630 image.
   - Optional menu PDF: put it in `public/` and set `menuPdf: '/menu.pdf'`.
4. **Contact form**: create a form at [formspree.io](https://formspree.io), copy its ID (the part
   after `/f/`) into `formspreeId`.
5. **Map**: in Google Maps, go to Share → *Embed a map* and copy the iframe's `src` into
   `googleMaps.embedUrl`. Alternatively set `googleMaps.query` to "Business name, full address".
6. **Preview locally**:
   ```bash
   npm run dev        # http://localhost:4321 with hot reload
   npm run build      # production build into dist/
   npm run preview    # serve dist/ locally
   ```

## Deploy

| Host             | Build command   | Output dir | Notes                                       |
| ---------------- | --------------- | ---------- | ------------------------------------------- |
| Cloudflare Pages | `npm run build` | `dist`     | Framework preset "Astro"; env `NODE_VERSION=22` |
| Netlify          | `npm run build` | `dist`     | Already configured in `netlify.toml`        |

Push the site to its own GitHub repo, connect the repo in Cloudflare Pages or Netlify, and every
push to `main` deploys (pull requests get preview URLs). Then add the client's custom domain and
update `siteUrl` in the config.

## Quality checks

```bash
npm run check        # Astro/TypeScript diagnostics
npm run validate     # parses the JSON-LD in dist/*.html (run after build)
npm run preview & npm run screenshots   # mobile + desktop full-page PNGs in screenshots/
```

`screenshots` uses Playwright (dev dependency). The first time, run `npx playwright install chromium`.
You can also paste the deployed URL into Google's [Rich Results Test](https://search.google.com/test/rich-results).

## Project layout

```
src/config/business.ts      ← the only file to edit per client
src/lib/utils.ts            formatting helpers (hours, prices, links, map/form URLs)
src/lib/schema.ts           builds the Restaurant JSON-LD from the config
src/layouts/Layout.astro    <head>: meta, OG, JSON-LD, brand color CSS variables
src/components/*.astro      SampleBanner, Header, Hero, About, Menu, HoursAndVisit, Contact, Footer, MobileCallBar
src/styles/global.css       Tailwind v4 theme + small component utilities (btn, section, input…)
public/                     favicon, hero placeholder, OG image, robots.txt
scripts/                    screenshots, JSON-LD validation, OG image generator
```

Brand colors are passed from the config as CSS variables and mapped to Tailwind colors
(`brand`, `brand-contrast`, `accent`, `ink`, `cream`), so classes like `bg-brand` or `text-ink/70`
automatically follow each client's palette.
