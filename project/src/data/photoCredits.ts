// Credits for the stock photos used outside the Locations section. Not displayed on the site.
// The Locations section uses Studywise's own centre photos, which are not listed here.
// Processed with scripts/process-stock-photos.mjs (re-download the originals from `source` to re-run it).

export interface PhotoCredit {
  file: string;
  usedIn: string;
  source: string;
  photographer: string;
  photographerUrl: string;
  licence: string;
}

export const photoCredits: PhotoCredit[] = [
  {
    file: '/images/hero-exercise-books.webp',
    usedIn: 'Homepage hero arch',
    source: 'https://www.pexels.com/photo/crop-faceless-ethnic-pupils-taking-notes-in-copybooks-5905472/',
    photographer: 'Katerina Holmes',
    photographerUrl: 'https://www.pexels.com/@katerina-holmes/',
    licence: 'Pexels License (free for commercial use, no attribution required)'
  },
  {
    file: '/images/maths-worksheet.webp',
    usedIn: 'Homepage featured testimonial arch',
    source: 'https://unsplash.com/photos/boy-writes-on-his-book-on-the-desk-JexAuNCfefs',
    photographer: 'Annie Spratt',
    photographerUrl: 'https://unsplash.com/@anniespratt',
    licence: 'Unsplash License (free for commercial use, no attribution required)'
  },
  {
    file: '/images/tutor-pointing-workbook.webp',
    usedIn: 'Our story featured testimonial arch',
    source: 'https://www.pexels.com/photo/person-writing-notes-on-her-notebook-6929190/',
    photographer: 'Polina Tankilevitch',
    photographerUrl: 'https://www.pexels.com/@polina-tankilevitch/',
    licence: 'Pexels License (free for commercial use, no attribution required)'
  }
];
