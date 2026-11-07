// Build step 3 of 3 (see "build" in package.json). Turns the single-page app into
// real HTML for every page, so search engines and link previews see each page's
// own content, title and tags on first load. The browser then takes over as before.
//
// Writes: dist/<page>/index.html for every page in src/data/seo.ts,
// dist/404.html (Netlify serves it with a real 404 status) and dist/sitemap.xml.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const serverDir = join(root, 'dist-server');

const { render, pages, notFoundMeta } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> or <!--app-html--> placeholder');
}

const SITE_URL = 'https://www.studywiselearning.com.au';
const problems = []; // fail the build
const warnings = []; // print only

async function writePage(url, file) {
  const { html, head } = render(url);
  if (!html.includes('<h1')) problems.push(`${url}: rendered without an <h1>`);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
}

for (const page of pages) {
  if (page.title.length > 60) warnings.push(`${page.path}: title is ${page.title.length} characters (aim for 60 or fewer)`);
  if (page.description.length > 155) warnings.push(`${page.path}: description is ${page.description.length} characters (aim for 155 or fewer)`);
  const file = page.path === '/' ? join(dist, 'index.html') : join(dist, page.path, 'index.html');
  await writePage(page.path, file);
}
await writePage(notFoundMeta.path, join(dist, '404.html'));

const urls = pages.map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc></url>`).join('\n');
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

await rm(serverDir, { recursive: true, force: true });

console.log(`Pre-rendered ${pages.length} pages, 404.html and sitemap.xml`);
if (warnings.length) console.warn(warnings.map((w) => `  ! ${w}`).join('\n'));
if (problems.length) {
  console.error(problems.map((p) => `  ✗ ${p}`).join('\n'));
  process.exit(1);
}
