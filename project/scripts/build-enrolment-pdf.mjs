// Prints public/docs/create-pdf.html to a PDF with headless Chrome (no browser header/footer).
// Run with: npm run build-pdf            -> writes public/docs/Studywise-Enrolment-Form.pdf
//       or: npm run build-pdf -- out.pdf -> writes to another path for review
// Set CHROME_PATH if Chrome isn't in the default macOS location.
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const source = join(__dirname, '../public/docs/create-pdf.html');
const output = resolve(process.argv[2] || join(__dirname, '../public/docs/Studywise-Enrolment-Form.pdf'));

if (!fs.existsSync(chrome)) {
  console.error(`Chrome not found at ${chrome}. Set CHROME_PATH to your Chrome or Chromium binary.`);
  process.exit(1);
}

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href
], { stdio: 'inherit' });

console.log('Wrote', output);
