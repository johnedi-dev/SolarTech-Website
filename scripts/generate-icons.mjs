/**
 * Generates PNG app icons from the SVG favicon + a web app manifest.
 * Run: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('public');
const svg = path.join(SRC, 'favicon.svg');

for (const size of [180, 192, 512]) {
  const out = path.join(SRC, `favicon-${size}.png`);
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(out);
  console.log(`favicon-${size}.png created`);
}

const manifest = {
  name: 'SolarTech Energy Solutions',
  short_name: 'SolarTech',
  description: 'Premium solar panels, inverters, batteries and net metering services in Pakistan.',
  theme_color: '#80C91B',
  background_color: '#FFFFFF',
  display: 'browser',
  start_url: '/',
  icons: [
    { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
  ],
};
writeFileSync(path.join(SRC, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
console.log('site.webmanifest created');
