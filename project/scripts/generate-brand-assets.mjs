// Generates the transparent web crest, favicon set and link preview image from the real logo.
// Source: public/final-studywise-logo.jpg (1600px, white background, wide margins).
// Run with: npm run brand-assets
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const SOURCE = join(publicDir, 'final-studywise-logo.jpg');

const NAVY = '#16496A';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Largest on-site display is the 180px crest on /about; 3x that keeps it sharp on retina screens
const CREST_HEIGHT = 540;

// ---------- Transparent crest ----------

// Background = near-white pixels connected to the image edges (white inside the logo is kept).
// Pixels within EDGE_BAND of the background get a soft alpha, with the white "un-mixed" out of
// their colour so there's no halo on dark backgrounds.
const NEAR_WHITE_MIN = 232; // every channel at least this
const NEAR_WHITE_SPREAD = 28; // and close to neutral (JPEG noise)
const EDGE_BAND = 2;

async function transparentCrest() {
  const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const px = width * height;
  const rgba = Buffer.alloc(px * 4);

  const isNearWhite = (i) => {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const min = Math.min(r, g, b);
    return min >= NEAR_WHITE_MIN && Math.max(r, g, b) - min <= NEAR_WHITE_SPREAD;
  };

  // Flood fill from every edge pixel (corners included) over near-white pixels
  const background = new Uint8Array(px);
  const queue = new Int32Array(px);
  let head = 0;
  let tail = 0;
  const seed = (i) => {
    if (!background[i] && isNearWhite(i)) {
      background[i] = 1;
      queue[tail++] = i;
    }
  };
  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    seed(y * width);
    seed(y * width + width - 1);
  }
  while (head < tail) {
    const i = queue[head++];
    const x = i % width;
    const y = (i - x) / width;
    if (x > 0) seed(i - 1);
    if (x < width - 1) seed(i + 1);
    if (y > 0) seed(i - width);
    if (y < height - 1) seed(i + width);
  }

  // Distance (in px, up to EDGE_BAND) from the background, for the soft edge
  const distance = new Uint8Array(px).fill(255);
  let frontier = [];
  for (let i = 0; i < px; i++) {
    if (background[i]) {
      distance[i] = 0;
      frontier.push(i);
    }
  }
  for (let d = 1; d <= EDGE_BAND; d++) {
    const next = [];
    for (const i of frontier) {
      const x = i % width;
      const y = (i - x) / width;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const j = ny * width + nx;
          if (distance[j] === 255) {
            distance[j] = d;
            next.push(j);
          }
        }
      }
    }
    frontier = next;
  }

  for (let i = 0; i < px; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const o = i * 4;
    if (background[i]) {
      rgba[o + 3] = 0;
      continue;
    }
    if (distance[i] > EDGE_BAND) {
      rgba[o] = r; rgba[o + 1] = g; rgba[o + 2] = b; rgba[o + 3] = 255;
      continue;
    }
    // Edge pixel: treat it as foreground blended over white. Estimate the foreground's
    // darkest channel from nearby solid pixels, then derive alpha and un-mix the white.
    const x = i % width;
    const y = (i - x) / width;
    let fgMin = 0;
    let count = 0;
    for (let dy = -3; dy <= 3; dy++) {
      for (let dx = -3; dx <= 3; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const j = ny * width + nx;
        if (distance[j] > EDGE_BAND) {
          fgMin += Math.min(data[j * 3], data[j * 3 + 1], data[j * 3 + 2]);
          count++;
        }
      }
    }
    fgMin = count ? fgMin / count : 0;
    const min = Math.min(r, g, b);
    const alpha = Math.max(0, Math.min(1, (255 - min) / Math.max(1, 255 - fgMin)));
    if (alpha < 0.02) {
      rgba[o + 3] = 0;
      continue;
    }
    const unmix = (c) => Math.max(0, Math.min(255, Math.round((c - (1 - alpha) * 255) / alpha)));
    rgba[o] = unmix(r);
    rgba[o + 1] = unmix(g);
    rgba[o + 2] = unmix(b);
    rgba[o + 3] = Math.round(alpha * 255);
  }

  return sharp(rgba, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

const untrimmed = await transparentCrest();
const crest = await sharp(untrimmed).trim({ background: CLEAR, threshold: 1 }).png().toBuffer();

const crestFile = await sharp(crest).resize({ height: CREST_HEIGHT }).png({ compressionLevel: 9 }).toBuffer();
await sharp(crestFile).toFile(join(publicDir, 'studywise-crest.png'));
const crestMeta = await sharp(crestFile).metadata();
console.log(`wrote studywise-crest.png (${crestMeta.width} x ${crestMeta.height})`);

// ---------- Favicons ----------

// Crest centred in a square with padding; white background for home-screen icons, transparent for tab icons
async function squareIcon(size, padding, file, background) {
  const inner = size - padding * 2;
  const image = await sharp(crest).resize({ width: inner, height: inner, fit: 'contain', background: CLEAR }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: image, gravity: 'centre' }])
    .png()
    .toFile(join(publicDir, file));
  console.log('wrote', file);
}

await squareIcon(16, 0, 'favicon-16x16.png', CLEAR);
await squareIcon(32, 1, 'favicon-32x32.png', CLEAR);
await squareIcon(180, 18, 'apple-touch-icon.png', WHITE);
await squareIcon(192, 20, 'android-chrome-192x192.png', WHITE);
await squareIcon(512, 52, 'android-chrome-512x512.png', WHITE);

// ---------- Link preview ----------
// librsvg can't load the site's web fonts, so the text uses Georgia.

const ogCrestHeight = 380;
const ogCrest = await sharp(crest).resize({ height: ogCrestHeight }).png().toBuffer();
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
    { input: ogCrest, left: 110, top: Math.round((630 - ogCrestHeight) / 2) },
    { input: ogText, left: 0, top: 0 }
  ])
  .png()
  .toFile(join(publicDir, 'og-image.png'));
console.log('wrote og-image.png');
