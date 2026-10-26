import { readFileSync } from 'node:fs';

for (const f of ['dist/index.html', 'dist/solar-calculator/index.html']) {
  const html = readFileSync(f, 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) console.log(`${f}: NO JSON-LD FOUND`);
  for (const [i, m] of blocks.entries()) {
    try {
      const data = JSON.parse(m[1]);
      console.log(`${f} JSON-LD #${i + 1}: VALID — @graph types: ${data['@graph'].map((n) => n['@type']).join(', ')}`);
    } catch (e) {
      console.log(`${f} JSON-LD #${i + 1}: INVALID — ${e.message}`);
    }
  }
}
