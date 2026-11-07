// Per-page titles, descriptions and social tags. Used twice: baked into each
// page's HTML at build time (scripts/prerender.mjs), and applied in the browser
// when someone moves between pages (src/components/PageMeta.tsx).
// Drafts for review: titles under ~60 characters, descriptions under ~155.

export const SITE_URL = 'https://www.studywiselearning.com.au';
export const SITE_NAME = 'Studywise Learning Centre';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_ALT = 'Studywise Learning Centre crest and wordmark';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Unknown pages: not indexed, no canonical */
  noindex?: boolean;
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Tutoring in Cranbourne West & Clyde North | Studywise',
    description:
      'Small-group tutoring from Year 1 to VCE in Cranbourne West and Clyde North, including selective entry, scholarship and VCE maths. Teaching since 2010.',
  },
  {
    path: '/about',
    title: "About Studywise | Tutoring in Melbourne's South-East",
    description:
      "Studywise has taught small groups of students in Melbourne's south-east since 2010, with tutoring campuses in Cranbourne West and Clyde North.",
  },
  {
    path: '/faq',
    title: 'Tutoring FAQs: Enrolment, Fees and Programs | Studywise',
    description:
      'Answers to common questions from parents about enrolment, programs, fees and more at Studywise tutoring in Cranbourne West and Clyde North.',
  },
  {
    path: '/programs/primary',
    title: 'Primary School Tutoring (Years 1–6) | Studywise',
    description:
      'Small-group primary tutoring for Years 1 to 6 in Cranbourne West and Clyde North, building strong foundations and confidence in core subjects.',
  },
  {
    path: '/programs/secondary',
    title: 'Secondary School Tutoring (Years 7–10) | Studywise',
    description:
      'Small-group tutoring for Years 7 to 10 in Cranbourne West and Clyde North, building confidence, study skills and results across key subjects.',
  },
  {
    path: '/programs/vce',
    title: 'VCE Tutoring, Including VCE Maths | Studywise',
    description:
      'Specialist VCE tutoring in Cranbourne West and Clyde North: Methods, General and Specialist Maths, English and sciences, with exam technique and practice.',
  },
  {
    path: '/programs/selective-entry',
    title: 'Selective Entry Exam Preparation | Studywise',
    description:
      'Year 8 preparation for the Victorian selective entry exam, for Melbourne High, Mac.Rob, Nossal and more. Small groups in Cranbourne West and Clyde North.',
  },
  {
    path: '/programs/scholarship-preparation',
    title: 'Scholarship Exam Preparation | Studywise',
    description:
      'Coaching for private school scholarship exams, up to Year 8, in small groups at our Cranbourne West and Clyde North tutoring campuses.',
  },
  {
    path: '/programs/jmss',
    title: 'John Monash Science School (JMSS) Exam Prep | Studywise',
    description:
      'Year 9 preparation for the John Monash Science School entrance exam: scientific reasoning, maths and writing. Tutoring in Cranbourne West and Clyde North.',
  },
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
  return { title: meta.title, canonical: meta.noindex ? null : url, named, properties };
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headHtml(meta: PageMeta) {
  const t = headTags(meta);
  return [
    `<title>${escapeHtml(t.title)}</title>`,
    ...t.named.map(([n, c]) => `<meta name="${n}" content="${escapeHtml(c)}" />`),
    ...(t.canonical ? [`<link rel="canonical" href="${t.canonical}" />`] : []),
    ...t.properties.map(([p, c]) => `<meta property="${p}" content="${escapeHtml(c)}" />`),
  ].join('\n    ');
}
