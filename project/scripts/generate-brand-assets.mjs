// Generates the link preview image and favicon set from the crest in src/components/Logo.tsx.
// Run with: npm run brand-assets
import sharp from 'sharp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

const NAVY = '#17325C';
const SKY = '#6FB3E0';
const ORANGE = '#E8692C';

// Light crest, same paths as Logo.tsx (viewBox 0 0 100 116)
const crestPaths = `
  <path d="M50 4 L92 16 V58 C92 86 72 104 50 112 C28 104 8 86 8 58 V16 Z" fill="${NAVY}"/>
  <circle cx="50" cy="44" r="19" fill="${SKY}"/>
  <circle cx="50" cy="44" r="7" fill="${ORANGE}"/>
  <path d="M50 96 V68 M50 75 L41 65 M50 73 L59 63" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" fill="none"/>
`;

// Crest centred in a square canvas, optionally on white with padding
function squareIconSvg(size, { background = null, padding = 0 } = {}) {
  const inner = size - padding * 2;
  const scale = inner / 116;
  const offsetX = (size - 100 * scale) / 2;
  const offsetY = (size - 116 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''}
  <g transform="translate(${offsetX} ${offsetY}) scale(${scale})">${crestPaths}</g>
</svg>`;
}

// Fonts: librsvg can't load the site's web fonts, so the preview uses Georgia for the serif
function ogImageSvg() {
  const crestHeight = 300;
  const scale = crestHeight / 116;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <g transform="translate(110 ${(630 - crestHeight) / 2}) scale(${scale})">${crestPaths}</g>
  <text x="440" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="600" fill="${NAVY}" letter-spacing="-1">Studywise</text>
  <text x="440" y="345" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="600" fill="${NAVY}" letter-spacing="-1">Learning Centre</text>
  <rect x="440" y="382" width="620" height="2" fill="${NAVY}"/>
  <text x="440" y="440" font-family="Georgia, 'Times New Roman', serif" font-size="32" font-style="italic" fill="${NAVY}">Helping students grow since 2010</text>
</svg>`;
}

async function writePng(svg, file) {
  await sharp(Buffer.from(svg)).png().toFile(join(publicDir, file));
  console.log('wrote', file);
}

// favicon.svg: crest only, transparent, so it stays crisp at any size
fs.writeFileSync(
  join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 116">${crestPaths}</svg>\n`
);
console.log('wrote favicon.svg');

await writePng(squareIconSvg(16), 'favicon-16x16.png');
await writePng(squareIconSvg(32), 'favicon-32x32.png');
await writePng(squareIconSvg(180, { background: '#FFFFFF', padding: 22 }), 'apple-touch-icon.png');
await writePng(squareIconSvg(192, { background: '#FFFFFF', padding: 24 }), 'android-chrome-192x192.png');
await writePng(squareIconSvg(512, { background: '#FFFFFF', padding: 64 }), 'android-chrome-512x512.png');
await writePng(ogImageSvg(), 'og-image.png');
