// Builds the fillable enrolment form with pdf-lib.
// Run with: npm run build-pdf            -> writes public/docs/Studywise-Enrolment-Form.pdf
//       or: npm run build-pdf -- out.pdf -> writes to another path for review
//
// Fields are drawn as plain underlines/boxes with borderless form fields on top, so the form
// can be typed into (Acrobat, Preview, Chrome, iOS/Android viewers) or printed and filled by hand.
// Fonts are the PDF standard fonts (Times for headings, Helvetica for text), so nothing is embedded.
import { PDFDocument, PDFName, StandardFonts, rgb, LineCapStyle } from 'pdf-lib';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = resolve(process.argv[2] || join(__dirname, '../public/docs/Studywise-Enrolment-Form.pdf'));

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const NAVY = hex('#17325C');
const INK = hex('#16202E');
const SLATE = hex('#3E4A5B');
const MUTED = hex('#5A6575');
const RULE = hex('#C9D3DD');
const SKY = hex('#6FB3E0');
const ORANGE = hex('#E8692C');
const WHITE = rgb(1, 1, 1);

// A4 in points, ~16mm margins
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 46;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_SPACE = 48;
const GAP = 18; // between side-by-side fields

const doc = await PDFDocument.create();
doc.setTitle('Studywise Enrolment Form');
doc.setAuthor('Studywise Learning Centre');
doc.setSubject('Enrolment form');
doc.setCreator('Studywise Learning Centre');

const serif = await doc.embedFont(StandardFonts.TimesRoman);
const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
const sans = await doc.embedFont(StandardFonts.Helvetica);
const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

const form = doc.getForm();

let page;
let y; // cursor: top of the next element, in PDF coordinates (origin bottom-left)

function newPage() {
  page = doc.addPage([PAGE_W, PAGE_H]);
  // Tab through fields row by row, left to right
  page.node.set(PDFName.of('Tabs'), PDFName.of('R'));
  y = PAGE_H - MARGIN;
}

function ensureSpace(height) {
  if (y - height < MARGIN + FOOTER_SPACE) newPage();
}

function wrap(text, font, size, width) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function paragraph(text, { font = sans, size = 10, color = SLATE, lineHeight = 1.5, width = CONTENT_W, x = MARGIN } = {}) {
  const lines = wrap(text, font, size, width);
  ensureSpace(lines.length * size * lineHeight);
  for (const line of lines) {
    y -= size * lineHeight;
    page.drawText(line, { x, y: y + size * (lineHeight - 1) / 2, size, font, color });
  }
}

function rule(color = RULE, thickness = 0.75, x = MARGIN, width = CONTENT_W) {
  page.drawLine({ start: { x, y }, end: { x: x + width, y }, thickness, color });
}

function spacedCaps(text, x, baseline, size, color, tracking) {
  let cursor = x;
  for (const ch of text) {
    page.drawText(ch, { x: cursor, y: baseline, size, font: sansBold, color });
    cursor += sansBold.widthOfTextAtSize(ch, size) + tracking;
  }
}

function crest(x, top, height) {
  const scale = height / 116;
  const svg = (d, opts) => page.drawSvgPath(d, { x, y: top, scale, ...opts });
  svg('M50 4 L92 16 V58 C92 86 72 104 50 112 C28 104 8 86 8 58 V16 Z', { color: NAVY });
  const cx = x + 50 * scale;
  const cy = top - 44 * scale;
  page.drawCircle({ x: cx, y: cy, size: 19 * scale, color: SKY });
  page.drawCircle({ x: cx, y: cy, size: 7 * scale, color: ORANGE });
  svg('M50 96 V68 M50 75 L41 65 M50 73 L59 63', {
    borderColor: WHITE,
    borderWidth: 8 * scale,
    borderLineCap: LineCapStyle.Round,
  });
}

function masthead() {
  const crestH = 40;
  crest(MARGIN, y, crestH);
  const textX = MARGIN + (100 / 116) * crestH + 12;
  page.drawText('Studywise', { x: textX, y: y - 20, size: 22, font: serifBold, color: NAVY });
  spacedCaps('LEARNING CENTRE', textX + 1, y - 33, 7, MUTED, 1.9);
  y -= crestH + 12;
  rule(NAVY, 1.5);
  y -= 34;
  page.drawText('Enrolment form', { x: MARGIN, y, size: 28, font: serif, color: NAVY });
  y -= 8;
  paragraph('Type into the fields on a phone or computer, or print and complete by hand.', { color: MUTED, size: 10.5 });
  y -= 14;
}

// keepTogether: space the whole section needs, so it starts on a new page rather than splitting
function sectionHeading(title, keepTogether = 60) {
  ensureSpace(keepTogether);
  y -= 10;
  rule(INK, 0.75);
  y -= 22;
  page.drawText(title, { x: MARGIN, y, size: 15, font: serif, color: NAVY });
  y -= 10;
}

function label(text, x, top) {
  page.drawText(text, { x, y: top - 9, size: 8.5, font: sansBold, color: INK });
}

const usedNames = new Set();
function fieldName(name) {
  if (usedNames.has(name)) throw new Error(`Duplicate field name ${name}`);
  usedNames.add(name);
  return name;
}

// One row of single-line fields, each { name, label, width (fraction of row) }
function textRow(fields, { height = 20 } = {}) {
  const rowH = 14 + height + 10;
  ensureSpace(rowH);
  const totalGap = GAP * (fields.length - 1);
  let x = MARGIN;
  for (const f of fields) {
    const w = (CONTENT_W - totalGap) * (f.width ?? 1 / fields.length);
    label(f.label, x, y);
    const fieldY = y - 14 - height;
    page.drawLine({ start: { x, y: fieldY }, end: { x: x + w, y: fieldY }, thickness: 0.75, color: RULE });
    const tf = form.createTextField(fieldName(f.name));
    tf.addToPage(page, { x, y: fieldY + 1, width: w, height, borderWidth: 0, backgroundColor: undefined, font: sans });
    tf.setFontSize(11);
    if (f.maxLength) tf.setMaxLength(f.maxLength);
    x += w + GAP;
  }
  y -= rowH;
}

// Multi-line field inside a ruled box
function textBox(name, text, height = 64) {
  const rowH = 14 + height + 12;
  ensureSpace(rowH);
  label(text, MARGIN, y);
  const boxY = y - 14 - height;
  page.drawRectangle({ x: MARGIN, y: boxY, width: CONTENT_W, height, borderColor: RULE, borderWidth: 0.75 });
  const tf = form.createTextField(fieldName(name));
  tf.enableMultiline();
  tf.addToPage(page, { x: MARGIN + 3, y: boxY + 3, width: CONTENT_W - 6, height: height - 6, borderWidth: 0, font: sans });
  tf.setFontSize(10.5);
  y -= rowH;
}

const BOX = 11;

// Checkboxes laid out in columns, row by row; options are { name, label }
function checkboxGroup(title, options, columns = 2) {
  const rows = Math.ceil(options.length / columns);
  const rowH = 20;
  ensureSpace(16 + rows * rowH + 8);
  label(title, MARGIN, y);
  y -= 18;
  const colW = CONTENT_W / columns;
  options.forEach((option, i) => {
    const col = i % columns;
    const row = Math.floor(i / columns);
    const x = MARGIN + col * colW;
    const boxY = y - row * rowH - BOX;
    const cb = form.createCheckBox(fieldName(option.name));
    cb.addToPage(page, { x, y: boxY, width: BOX, height: BOX, borderColor: NAVY, borderWidth: 0.75, textColor: NAVY });
    page.drawText(option.label, { x: x + BOX + 8, y: boxY + 2, size: 10, font: sans, color: SLATE });
  });
  y -= rows * rowH + 6;
}

// Single-choice radio buttons in one row
function radioGroup(name, title, options) {
  ensureSpace(16 + 20 + 8);
  label(title, MARGIN, y);
  y -= 18;
  const group = form.createRadioGroup(fieldName(name));
  const colW = CONTENT_W / options.length;
  options.forEach((option, i) => {
    const x = MARGIN + i * colW;
    const boxY = y - BOX;
    group.addOptionToPage(option.value, page, { x, y: boxY, width: BOX, height: BOX, borderColor: NAVY, borderWidth: 0.75, textColor: NAVY });
    page.drawText(option.label, { x: x + BOX + 8, y: boxY + 2, size: 10, font: sans, color: SLATE });
  });
  y -= 20 + 6;
}

function bullets(items) {
  for (const item of items) {
    const lines = wrap(item, sans, 10, CONTENT_W - 14);
    ensureSpace(lines.length * 15);
    lines.forEach((line, i) => {
      y -= 15;
      if (i === 0) page.drawText('–', { x: MARGIN, y: y + 2.5, size: 10, font: sans, color: MUTED });
      page.drawText(line, { x: MARGIN + 14, y: y + 2.5, size: 10, font: sans, color: SLATE });
    });
  }
}

// ---------- Content ----------

newPage();
masthead();

y -= 4;
rule();
y -= 4;
paragraph(
  'Please complete all sections of this form and return it to admin@studywiselearning.com.au. ' +
  'If you have any questions, please contact us at the email above or call us on 03 8774 7303 or 0430 095 076.',
  { size: 10 }
);
y -= 8;
rule();
y -= 12;

sectionHeading('1. Parent / guardian information');
textRow([{ name: 'parent_full_name', label: 'Full name' }]);
textRow([
  { name: 'parent_email', label: 'Email address', width: 0.6 },
  { name: 'parent_phone', label: 'Phone number', width: 0.4 }
]);
textRow([{ name: 'parent_postal_address_1', label: 'Postal address' }]);
textRow([{ name: 'parent_postal_address_2', label: 'Postal address (continued)' }]);
textRow([
  { name: 'emergency_contact_name', label: 'Emergency contact name', width: 0.6 },
  { name: 'emergency_contact_phone', label: 'Emergency contact phone', width: 0.4 }
]);

sectionHeading('2. Student information');
textRow([{ name: 'student_full_name', label: 'Student full name' }]);
textRow([
  { name: 'student_date_of_birth', label: 'Date of birth (DD/MM/YYYY)', width: 0.5, maxLength: 10 },
  { name: 'student_year_level', label: 'Current year level', width: 0.5 }
]);
textRow([{ name: 'student_school', label: 'Current school' }]);
textRow([{ name: 'student_email', label: 'Student email (if applicable)' }]);

sectionHeading('3. Program selection');
checkboxGroup('Program (please select all that apply)', [
  { name: 'program_primary', label: 'Primary (Years 1–6)' },
  { name: 'program_secondary', label: 'Secondary (Years 7–10)' },
  { name: 'program_selective_entry', label: 'Selective Entry' },
  { name: 'program_scholarship', label: 'Scholarship Preparation' },
  { name: 'program_jmss', label: 'John Monash Science School' },
  { name: 'program_vce', label: 'VCE (Years 11–12)' }
]);
checkboxGroup('Subjects (please select all that apply)', [
  { name: 'subject_maths', label: 'Maths' },
  { name: 'subject_english', label: 'English' },
  { name: 'subject_science', label: 'Science' },
  { name: 'subject_other', label: 'Other (please specify below)' }
]);
textRow([{ name: 'subject_other_details', label: 'Other subjects' }]);
radioGroup('preferred_location', 'Preferred location', [
  { value: 'Cranbourne West', label: 'Cranbourne West' },
  { value: 'Clyde North', label: 'Clyde North' },
  { value: 'Either location', label: 'Either location' }
]);
textBox('preferred_session_times', 'Preferred session days and times', 40);

sectionHeading('4. Additional information');
textBox('learning_goals', 'Learning goals and objectives');
textBox('learning_needs', 'Any learning difficulties or special needs');
textRow([{ name: 'how_did_you_hear', label: 'How did you hear about Studywise Learning Centre?' }]);

// Terms, signature and closing note stay on one page
sectionHeading('5. Terms and conditions', 280);
paragraph('By signing this enrolment form, I acknowledge and agree to:', { size: 10 });
y -= 2;
bullets([
  'Pay all tuition fees as per the agreed schedule',
  'Provide 48 hours notice for session cancellations or reschedules',
  "Studywise Learning Centre's policies regarding attendance, conduct, and payment terms",
  'Allow my child to participate in learning programs and activities',
  'The collection and use of personal information in accordance with privacy laws'
]);
y -= 16;

// Signature: a typed-name field on a line, so it can also be signed by hand when printed
ensureSpace(90);
textRow([
  { name: 'parent_signature', label: 'Parent / guardian signature (sign, or type your full name)', width: 0.65 },
  { name: 'signature_date', label: 'Date (DD/MM/YYYY)', width: 0.35, maxLength: 10 }
], { height: 30 });
y -= 6;
paragraph(
  'When complete, save this form and email it to admin@studywiselearning.com.au. ' +
  'Thank you for choosing Studywise Learning Centre. We look forward to supporting your child\'s educational journey!',
  { size: 9.5, color: MUTED }
);

// ---------- Footer on every page ----------

const pages = doc.getPages();
pages.forEach((p, i) => {
  const footerY = MARGIN - 6;
  p.drawLine({ start: { x: MARGIN, y: footerY + 14 }, end: { x: PAGE_W - MARGIN, y: footerY + 14 }, thickness: 0.5, color: RULE });
  p.drawText('Studywise Learning Centre  ·  03 8774 7303  ·  0430 095 076  ·  admin@studywiselearning.com.au', {
    x: MARGIN, y: footerY, size: 8, font: sans, color: MUTED
  });
  const pageLabel = `Page ${i + 1} of ${pages.length}`;
  p.drawText(pageLabel, {
    x: PAGE_W - MARGIN - sans.widthOfTextAtSize(pageLabel, 8), y: footerY, size: 8, font: sans, color: MUTED
  });
});

form.updateFieldAppearances(sans);

fs.writeFileSync(output, await doc.save());
console.log(`Wrote ${output} (${pages.length} pages, ${form.getFields().length} fields)`);
