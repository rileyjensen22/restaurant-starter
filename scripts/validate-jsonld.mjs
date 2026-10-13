// Parses every JSON-LD block in dist/**/*.html and fails if any is invalid JSON.
// Usage: npm run build && npm run validate
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const files = (await readdir(DIST, { recursive: true })).filter((f) => f.endsWith('.html'));
let blocks = 0;
let failed = false;
for (const f of files) {
  const html = await readFile(join(DIST, f), 'utf8');
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    blocks++;
    try {
      const data = JSON.parse(m[1]);
      const sections = data.hasMenu?.hasMenuSection?.length ?? 0;
      console.log(`✓ ${f}: @type=${data['@type']}, name="${data.name}", ${data.openingHoursSpecification?.length ?? 0} hours specs, ${sections} menu sections`);
    } catch (e) {
      failed = true;
      console.error(`✗ ${f}: invalid JSON-LD: ${e.message}`);
    }
  }
}
if (!blocks) {
  console.error('✗ No JSON-LD blocks found');
  process.exit(1);
}
process.exit(failed ? 1 : 0);
