// Per-page titles, descriptions, social tags and structured data (JSON-LD). Used twice:
// baked into each page's HTML at build time (scripts/prerender.mjs), and applied in the
// browser when someone moves between pages (src/components/PageMeta.tsx).
// Titles under ~60 characters, descriptions under ~155 (the build warns past those).

import {
  BUSINESS_NAME,
  CAMPUSES,
  EMAIL,
  FOUNDING_YEAR,
  LEGAL_NAME,
  MAIN_PHONE,
  MOBILE_PHONE,
  SOCIAL,
  campusAddress,
  campusPath,
  directionsUrl,
  type Campus,
} from './business';
import { faqs } from './faqData';
import { programsData, programSummaries } from './programData';

export const SITE_URL = 'https://www.studywiselearning.com.au';
export const SITE_NAME = BUSINESS_NAME;
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = `${BUSINESS_NAME} crest and wordmark`;

type JsonLd = Record<string, unknown>;

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Unknown pages: not indexed, no canonical */
  noindex?: boolean;
  /** Structured data nodes for this page, combined into one @graph */
  schema?: () => JsonLd[];
}

const listOf = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items.join('');

// ---------- Structured data ----------

const ORG_ID = `${SITE_URL}/#organization`;
const campusId = (c: Campus) => `${SITE_URL}${campusPath(c)}#campus`;
const LOGO = { '@type': 'ImageObject', url: `${SITE_URL}/studywise-crest.png`, width: 509, height: 540 };
const place = (name: string) => ({ '@type': 'Place', name: `${name} VIC` });

const ALL_SUBURBS = Array.from(new Set(CAMPUSES.flatMap((c) => [c.suburb, ...c.nearby])));

function organization(): JsonLd {
  return {
    '@type': 'EducationalOrganization',
    '@id': ORG_ID,
    name: BUSINESS_NAME,
    legalName: LEGAL_NAME,
    url: `${SITE_URL}/`,
    logo: LOGO,
    image: OG_IMAGE,
    description: `Small-group tutoring from Year 1 to VCE in ${listOf(CAMPUSES.map((c) => c.name))}, including selective entry, scholarship and VCE preparation.`,
    foundingDate: String(FOUNDING_YEAR),
    email: EMAIL,
    telephone: MAIN_PHONE.intl,
    contactPoint: [MAIN_PHONE, MOBILE_PHONE].map((p) => ({
      '@type': 'ContactPoint',
      telephone: p.intl,
      email: EMAIL,
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'en',
    })),
    sameAs: SOCIAL.map((s) => s.url),
    department: CAMPUSES.map((c) => ({ '@id': campusId(c) })),
    areaServed: ALL_SUBURBS.map(place),
  };
}

function campusNode(c: Campus): JsonLd {
  return {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': campusId(c),
    name: BUSINESS_NAME,
    description: `${BUSINESS_NAME}, ${c.name} campus. ${c.about}`,
    url: `${SITE_URL}${campusPath(c)}`,
    parentOrganization: { '@id': ORG_ID },
    logo: LOGO,
    image: c.photos.map((p) => `${SITE_URL}${p.src}`),
    telephone: MAIN_PHONE.intl,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [c.venue, c.street].filter(Boolean).join(', '),
      addressLocality: c.suburb,
      addressRegion: c.state,
      postalCode: c.postcode,
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng },
    hasMap: directionsUrl(c),
    areaServed: [c.suburb, ...c.nearby].map(place),
    sameAs: SOCIAL.map((s) => s.url),
    // Left out until the hours are confirmed, rather than publishing guesses
    ...(c.hours.length
      ? {
          openingHoursSpecification: c.hours.map((h) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: h.days,
            opens: h.opens,
            closes: h.closes,
          })),
        }
      : {}),
  };
}

function website(): JsonLd {
  return { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BUSINESS_NAME, publisher: { '@id': ORG_ID }, inLanguage: 'en-AU' };
}

function faqPage(): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faq`,
    url: `${SITE_URL}/faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/\u00A0/g, ' ') },
    })),
  };
}

function course(slug: string): JsonLd {
  const program = programsData.find((p) => p.slug === slug)!;
  const summary = programSummaries.find((p) => p.slug === slug)!;
  return {
    '@type': 'Course',
    '@id': `${SITE_URL}/programs/${slug}#course`,
    name: program.title,
    description: program.fullDescription,
    url: `${SITE_URL}/programs/${slug}`,
    provider: { '@id': ORG_ID },
    educationalLevel: summary.years,
    teaches: program.focusAreas,
    inLanguage: 'en-AU',
    hasCourseInstance: CAMPUSES.map((c) => ({
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      location: { '@id': campusId(c) },
    })),
  };
}

// ---------- Pages ----------

const programPage = (slug: string, title: string, description: string): PageMeta => ({
  path: `/programs/${slug}`,
  title,
  description,
  schema: () => [organization(), course(slug), ...CAMPUSES.map(campusNode)],
});

const campusPage = (c: Campus, description: string): PageMeta => ({
  path: campusPath(c),
  title: `Tutoring in ${c.name} | ${BUSINESS_NAME}`,
  description,
  schema: () => [organization(), campusNode(c)],
});

const [cranbourneWest, clydeNorth] = CAMPUSES;

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Tutoring in Cranbourne West & Clyde North | Studywise',
    description:
      'Small-group tutoring from Year 1 to VCE in Cranbourne West and Clyde North, including selective entry, scholarship and VCE maths. Teaching since 2010.',
    schema: () => [website(), organization(), ...CAMPUSES.map(campusNode)],
  },
  {
    path: '/about',
    title: `Our Story: Tutoring Since 2010 | ${BUSINESS_NAME}`,
    description:
      "Studywise has taught small groups of students in Melbourne's south-east since 2010, with tutoring campuses in Cranbourne West and Clyde North.",
    schema: () => [organization()],
  },
  {
    path: '/faq',
    title: `Tutoring FAQs for Parents | ${BUSINESS_NAME}`,
    description:
      'Answers to common questions from parents about enrolment, programs, fees and more at Studywise tutoring in Cranbourne West and Clyde North.',
    schema: () => [organization(), faqPage()],
  },
  {
    path: '/contact',
    title: 'Contact Studywise | Cranbourne West & Clyde North Tutoring',
    description: `Call ${MAIN_PHONE.display}, text ${MOBILE_PHONE.display} or email us. Studywise has tutoring campuses in Cranbourne West and Clyde North.`,
    schema: () => [organization(), ...CAMPUSES.map(campusNode)],
  },
  campusPage(
    cranbourneWest,
    `Small-group tutoring from Year 1 to VCE at ${campusAddress(cranbourneWest)}, close to Cranbourne, Cranbourne North and Botanic Ridge.`,
  ),
  campusPage(
    clydeNorth,
    `Small-group tutoring from Year 1 to VCE at ${campusAddress(clydeNorth)}, close to Clyde, Berwick and Officer.`,
  ),
  programPage(
    'primary',
    'Primary School Tutoring, Years 1–6 | Studywise',
    'Small-group primary tutoring for Years 1 to 6 in Cranbourne West and Clyde North, building strong foundations and confidence in core subjects.',
  ),
  programPage(
    'secondary',
    'Secondary School Tutoring, Years 7–10 | Studywise',
    'Small-group tutoring for Years 7 to 10 in Cranbourne West and Clyde North, building confidence, study skills and results across key subjects.',
  ),
  programPage(
    'vce',
    'VCE Tutoring: Maths, English and Science | Studywise',
    'Specialist VCE tutoring in Cranbourne West and Clyde North: Methods, General and Specialist Maths, English and sciences, with exam technique and practice.',
  ),
  programPage(
    'selective-entry',
    'Selective Entry Exam Preparation, Year 8 | Studywise',
    'Year 8 preparation for the Victorian selective entry exam, for Melbourne High, Mac.Rob, Nossal and more. Small groups in Cranbourne West and Clyde North.',
  ),
  programPage(
    'scholarship-preparation',
    'Private School Scholarship Exam Prep | Studywise',
    'Coaching for private school scholarship exams, up to Year 8, in small groups at our Cranbourne West and Clyde North tutoring campuses.',
  ),
  programPage(
    'jmss',
    'John Monash Science School (JMSS) Exam Prep | Studywise',
    'Year 9 preparation for the John Monash Science School entrance exam: scientific reasoning, maths and writing. Tutoring in Cranbourne West and Clyde North.',
  ),
];

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: `Page not found | ${SITE_NAME}`,
  description: "The page you're looking for has moved or doesn't exist.",
  noindex: true,
};

const normalise = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname);

export function metaForPath(pathname: string): PageMeta {
  const path = normalise(pathname);
  return pages.find((p) => p.path === path) ?? notFoundMeta;
}

export const canonicalUrl = (meta: PageMeta) => (meta.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`);

/** The page's structured data as one JSON-LD document, or null */
export function structuredData(meta: PageMeta): string | null {
  if (!meta.schema) return null;
  // "<" escaped so the JSON can never close its own <script> tag
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': meta.schema() }).replace(/</g, '\\u003c');
}

/** Every tag that changes per page, in one place so the build and the browser agree */
export function headTags(meta: PageMeta) {
  const url = canonicalUrl(meta);
  const named: [string, string][] = [
    ['description', meta.description],
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', meta.title],
    ['twitter:description', meta.description],
    ['twitter:image', OG_IMAGE],
  ];
  if (meta.noindex) named.push(['robots', 'noindex']);
  const properties: [string, string][] = [
    ['og:type', 'website'],
    ['og:site_name', SITE_NAME],
    ['og:locale', 'en_AU'],
    ['og:title', meta.title],
    ['og:description', meta.description],
    ...(meta.noindex ? [] : ([['og:url', url]] as [string, string][])),
    ['og:image', OG_IMAGE],
    ['og:image:width', '1200'],
    ['og:image:height', '630'],
    ['og:image:alt', OG_IMAGE_ALT],
  ];
  return { title: meta.title, canonical: meta.noindex ? null : url, named, properties, jsonLd: structuredData(meta) };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const STRUCTURED_DATA_ID = 'structured-data';

export function headHtml(meta: PageMeta) {
  const t = headTags(meta);
  return [
    `<title>${escapeHtml(t.title)}</title>`,
    ...t.named.map(([n, c]) => `<meta name="${n}" content="${escapeHtml(c)}" />`),
    ...(t.canonical ? [`<link rel="canonical" href="${t.canonical}" />`] : []),
    ...t.properties.map(([p, c]) => `<meta property="${p}" content="${escapeHtml(c)}" />`),
    ...(t.jsonLd ? [`<script type="application/ld+json" id="${STRUCTURED_DATA_ID}">${t.jsonLd}</script>`] : []),
  ].join('\n    ');
}
