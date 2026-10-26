/**
 * One-time asset optimization script.
 * Converts heavy JPG assets to WebP and creates a social-share OG cover image.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('public');
const SOURCE = path.resolve('assets-src'); // original heavyweight JPGs (kept out of the production build)
const jobs = [
  // [source, output, resizeWidth, quality]
  ['hero-bg.jpg', 'hero-bg.webp', 1920, 82],
  ['team.jpg', 'team.webp', 1200, 82],
  ['panels-aerial.jpg', 'panels-aerial.webp', 1600, 78],
  ['inverter.jpg', 'inverter.webp', 1200, 80],
];

const kb = async (p) => Math.round(((await stat(p)).size / 1024) * 10) / 10;

await mkdir(SRC, { recursive: true });
for (const [src, out, width, quality] of jobs) {
  const input = path.join(SOURCE, src);
  const output = path.join(SRC, out);
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality }).toFile(output);
  console.log(`${src} ${await kb(input)}KB  ->  ${out} ${await kb(output)}KB`);
}

// Social share image: 1200x630 JPG (best compatibility for Facebook/WhatsApp/LinkedIn)
const ogSrc = path.join(SOURCE, 'hero-bg.jpg');
const og = path.join(SRC, 'og-cover.jpg');
await sharp(ogSrc).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, progressive: true }).toFile(og);
console.log(`og-cover.jpg -> ${await kb(og)}KB`);
