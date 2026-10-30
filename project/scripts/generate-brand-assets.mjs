// Generates the web crest, favicon set and link preview image from the real logo.
// Source: public/final-studywise-logo.jpg (white background, wide margins).
// Run with: npm run brand-assets
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const SOURCE = join(publicDir, 'final-studywise-logo.jpg');

const NAVY = '#17325C';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

// Crest with the white margin trimmed off (aspect ratio ~0.942 wide : 1 tall)
const crest = await sharp(SOURCE).trim({ threshold: 20 }).toBuffer();

async function crestAtHeight(height) {
  return sharp(crest).resize({ height, fit: 'inside' }).toBuffer();
}

// Crest centred on a white square with padding on every side
async function squareIcon(size, padding, file) {
  const inner = size - padding * 2;
  const image = await sharp(crest).resize({ width: inner, height: inner, fit: 'contain', background: WHITE }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: image, gravity: 'centre' }])
    .png()
    .toFile(join(publicDir, file));
  console.log('wrote', file);
}

// Web crest for the header/footer: 224px tall covers ~4x the 56px display size
await sharp(await crestAtHeight(224)).png({ compressionLevel: 9 }).toFile(join(publicDir, 'studywise-crest.png'));
console.log('wrote studywise-crest.png');

await squareIcon(16, 0, 'favicon-16x16.png');
await squareIcon(32, 1, 'favicon-32x32.png');
await squareIcon(180, 18, 'apple-touch-icon.png');
await squareIcon(192, 20, 'android-chrome-192x192.png');
await squareIcon(512, 52, 'android-chrome-512x512.png');

// Link preview: crest left, wordmark right. librsvg can't load the site's web fonts, so the text uses Georgia.
const crestHeight = 380;
const ogCrest = await crestAtHeight(crestHeight);
const ogCrestWidth = (await sharp(ogCrest).metadata()).width;
const textX = 110 + ogCrestWidth + 64;
const ogText = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <text x="${textX}" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="600" fill="${NAVY}" letter-spacing="-1">Studywise</text>
  <text x="${textX}" y="342" font-family="Georgia, 'Times New Roman', serif" font-size="60" font-weight="600" fill="${NAVY}" letter-spacing="-1">Learning Centre</text>
  <rect x="${textX}" y="378" width="${1200 - textX - 90}" height="2" fill="${NAVY}"/>
  <text x="${textX}" y="432" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-style="italic" fill="${NAVY}">Helping students grow since 2010</text>
</svg>`);

await sharp({ create: { width: 1200, height: 630, channels: 4, background: WHITE } })
  .composite([
    { input: ogCrest, left: 110, top: Math.round((630 - crestHeight) / 2) },
    { input: ogText, left: 0, top: 0 }
  ])
  .png()
  .toFile(join(publicDir, 'og-image.png'));
console.log('wrote og-image.png');

// The old redrawn SVG favicon is no longer used
const oldSvg = join(publicDir, 'favicon.svg');
if (fs.existsSync(oldSvg)) {
  fs.unlinkSync(oldSvg);
  console.log('removed favicon.svg');
}
