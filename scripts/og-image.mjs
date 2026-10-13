// Regenerates public/images/og-image.png (1200x630 social preview) from the business config.
// Usage: npm run og-image   (requires Node >= 22.18 for TypeScript import, and Playwright Chromium)
import { chromium } from 'playwright';
import { business } from '../src/config/business.ts';

const c = business.colors;
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const html = `<!doctype html><html><body style="margin:0">
<div style="width:1200px;height:630px;box-sizing:border-box;padding:72px;display:flex;flex-direction:column;justify-content:flex-end;
  background:linear-gradient(135deg, ${c.dark} 0%, ${c.primary} 100%);color:#fff;font-family:Georgia,serif;position:relative;overflow:hidden">
  <div style="position:absolute;right:-120px;top:-120px;width:520px;height:520px;border-radius:50%;background:${c.accent};opacity:.18"></div>
  <div style="font:600 22px system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:${c.accent}">${esc(business.cuisine.join(' · '))} · ${esc(business.address.city)}</div>
  <div style="font-size:76px;font-weight:700;line-height:1.05;margin-top:18px">${esc(business.name)}</div>
  <div style="font:400 30px system-ui,sans-serif;opacity:.85;margin-top:22px;max-width:900px">${esc(business.tagline)}</div>
</div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: new URL('../public/images/og-image.png', import.meta.url).pathname });
await browser.close();
console.log('✓ public/images/og-image.png');
