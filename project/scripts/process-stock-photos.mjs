// Processes the stock photos used outside the Locations section so they read as one shoot.
// Our own centre photos (public/*.jpeg|jpg|webp used by Locations) are NOT processed.
//
// Usage: node scripts/process-stock-photos.mjs <originalsDir>
//   <originalsDir> holds the downloaded originals, one folder per photo (see SOURCES below).
//   Sources and credits are recorded in src/data/photoCredits.ts.
//
// Treatment: ~12% less saturation, gently lifted shadows, a subtle cool shift, then crop and
// export WebP (plus a JPG fallback) to public/images/.
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/images');

// Each photo is cropped to `aspect` (width / height), as large as possible, centred on the
// focus point (fractions of the source), so it works at any download size.
const SOURCES = [
  {
    folder: 'pexels-5905472',
    out: 'hero-exercise-books',
    width: 1600,
    aspect: 1280 / 560, // the homepage hero arch
    focus: { x: 0.5, y: 0.49 }
  },
  {
    folder: 'unsplash-JexAuNCfefs',
    out: 'maths-worksheet',
    width: 900,
    aspect: 4 / 5, // portrait testimonial arch
    focus: { x: 0.7, y: 0.5 }
  },
  {
    folder: 'pexels-6929190',
    out: 'tutor-pointing-workbook',
    width: 900,
    aspect: 4 / 5,
    focus: { x: 0.47, y: 0.5 }
  }
];

function cropRegion(sourceWidth, sourceHeight, aspect, focus) {
  let width = sourceWidth;
  let height = Math.round(width / aspect);
  if (height > sourceHeight) {
    height = sourceHeight;
    width = Math.round(height * aspect);
  }
  const clamp = (value, max) => Math.max(0, Math.min(max, Math.round(value)));
  return {
    left: clamp(focus.x * sourceWidth - width / 2, sourceWidth - width),
    top: clamp(focus.y * sourceHeight - height / 2, sourceHeight - height),
    width,
    height
  };
}

async function processPhoto(originalsDir, { folder, out, width, aspect, focus }) {
  const input = join(originalsDir, folder, 'original.jpg');
  const meta = await sharp(input).metadata();
  const region = cropRegion(meta.width, meta.height, aspect, focus);

  const pipeline = sharp(input)
    .extract(region)
    .resize({ width })
    .modulate({ saturation: 0.88 })
    // Lift the shadows gently (black point 0 -> 12) without flattening the highlights
    .linear(0.955, 12)
    // Subtle cool shift: a touch less red, a touch more blue
    .recomb([
      [0.97, 0.015, 0.015],
      [0, 1, 0],
      [0.01, 0.02, 1.0]
    ])
    .withMetadata({ orientation: undefined });

  await pipeline.clone().webp({ quality: 80 }).toFile(join(outDir, `${out}.webp`));
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(join(outDir, `${out}.jpg`));
  const result = await sharp(join(outDir, `${out}.webp`)).metadata();
  console.log(`wrote images/${out}.webp + .jpg (${result.width} x ${result.height})`);
}

const originalsDir = process.argv[2];
if (!originalsDir || !fs.existsSync(originalsDir)) {
  console.error('Usage: node scripts/process-stock-photos.mjs <originalsDir>');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });
for (const source of SOURCES) {
  await processPhoto(originalsDir, source);
}
