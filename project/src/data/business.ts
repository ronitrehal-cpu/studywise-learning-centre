// The one place the business name, addresses, phones, hours and social links are written.
// Everything on the site (footer, campus pages, contact page, FAQ answers, structured data)
// reads from here, so they are always written exactly the same way.

export const BUSINESS_NAME = 'Studywise Learning Centre';
export const LEGAL_NAME = 'Studywise Learning Centre Pty Ltd';
export const ABN = '27 648 842 773';
export const FOUNDING_YEAR = 2010;

export interface Phone {
  label: string;
  /** How it is written on the page */
  display: string;
  /** Digits for tel: and sms: links */
  tel: string;
  /** International format for structured data */
  intl: string;
}

export const MAIN_PHONE: Phone = { label: 'Phone', display: '03 8774 7303', tel: '0387747303', intl: '+61 3 8774 7303' };
export const MOBILE_PHONE: Phone = { label: 'Mobile', display: '0430 095 076', tel: '0430095076', intl: '+61 430 095 076' };
export const PHONES = [MAIN_PHONE, MOBILE_PHONE];
/** Texts go to the mobile */
export const SMS_NUMBER = MOBILE_PHONE.tel;

export const EMAIL = 'admin@studywiselearning.com.au';

export const SOCIAL = [
  { label: 'Instagram', url: 'https://www.instagram.com/studywiselearning/' },
  { label: 'Facebook', url: 'https://www.facebook.com/studywiselearningcentre' },
];

/** Shown next to opening hours wherever they appear */
export const HOLIDAY_NOTE = 'Closed during Victorian school holidays. Open on public holidays.';

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface OpeningHours {
  days: Day[];
  /** 24-hour "HH:MM" */
  opens: string;
  closes: string;
}

export interface CampusPhoto {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Campus {
  slug: 'cranbourne-west' | 'clyde-north';
  /** Suburb name, used as the campus name */
  name: string;
  /** Building or venue, when the campus is inside one */
  venue?: string;
  street: string;
  suburb: string;
  state: 'VIC';
  postcode: string;
  geo: { lat: number; lng: number };
  /**
   * Opening hours. Empty until confirmed: the campus pages then say to call for
   * class times, and the structured data leaves hours out rather than guessing.
   */
  hours: OpeningHours[];
  /** Suburbs families come from, mentioned in a sentence on the campus page */
  nearby: string[];
  about: string;
  photos: CampusPhoto[];
}

export const CAMPUSES: Campus[] = [
  {
    slug: 'cranbourne-west',
    name: 'Cranbourne West',
    street: '5 Biara Court',
    suburb: 'Cranbourne West',
    state: 'VIC',
    postcode: '3977',
    geo: { lat: -38.08002, lng: 145.24535 },
    hours: [],
    nearby: ['Cranbourne', 'Cranbourne North', 'Cranbourne East', 'Botanic Ridge', 'Narre Warren South'],
    about:
      'A dedicated Studywise tutoring centre on Biara Court, with its own classrooms.',
    // Opens on an interior without the old signage; 6 and 11 show the old logo
    photos: [
      {
        src: '/7.webp',
        width: 1360,
        height: 1020,
        alt: 'Large classroom at Studywise Cranbourne West, with rows of desks, a wall screen and whiteboards',
      },
      {
        src: '/12.webp',
        width: 1360,
        height: 1020,
        alt: 'Cranbourne West classroom with blue and black student chairs set out at desks',
      },
      {
        src: '/8.webp',
        width: 1360,
        height: 1020,
        alt: 'Smaller study room at Cranbourne West with desks, grey chairs and a kitchenette',
      },
      {
        src: '/6.webp',
        width: 1360,
        height: 1020,
        alt: 'Front entrance of the Cranbourne West centre on Biara Court, with Studywise tutoring signage',
      },
      {
        src: '/11.webp',
        width: 1360,
        height: 1020,
        alt: 'Cranbourne West classroom with desks and chairs facing a projector screen',
      },
    ],
  },
  {
    slug: 'clyde-north',
    name: 'Clyde North',
    venue: 'Balla Balla Community Centre',
    street: '7-9 Selandra Boulevard',
    suburb: 'Clyde North',
    state: 'VIC',
    postcode: '3978',
    geo: { lat: -38.10448, lng: 145.32564 },
    hours: [],
    nearby: ['Clyde', 'Berwick', 'Officer', 'Cranbourne East'],
    about:
      'Classes run in a room we hire at Balla Balla Community Centre, the community centre on Selandra Boulevard in Selandra Rise.',
    // Opens on the hall rather than the exterior, which already leads the hero
    photos: [
      {
        src: '/2.jpeg',
        width: 675,
        height: 450,
        alt: 'Main hall at Balla Balla Community Centre in Clyde North, with a timber floor and full-height windows',
      },
      {
        src: '/1.jpeg',
        width: 1200,
        height: 801,
        alt: 'Outside Balla Balla Community Centre on Selandra Boulevard, Clyde North',
      },
      {
        src: '/3.jpg',
        width: 900,
        height: 600,
        alt: 'Carpeted room at Balla Balla Community Centre with a wall screen and stacked chairs',
      },
      {
        src: '/actual_4.jpg',
        width: 900,
        height: 600,
        alt: 'Room at Balla Balla Community Centre with a large screen and windows looking out over Clyde North',
      },
      {
        src: '/4.jpg',
        width: 900,
        height: 600,
        alt: 'Room at Balla Balla Community Centre with whiteboard walls and stacked red chairs',
      },
    ],
  },
];

/** Written the same way everywhere, e.g. "Balla Balla Community Centre, 7-9 Selandra Boulevard, Clyde North VIC 3978" */
export function campusAddress(c: Campus) {
  return [c.venue, c.street, `${c.suburb} ${c.state} ${c.postcode}`].filter(Boolean).join(', ');
}

export const campusPath = (c: Campus) => `/locations/${c.slug}`;

export const getCampus = (slug: string) => CAMPUSES.find((c) => c.slug === slug);

export const directionsUrl = (c: Campus) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${BUSINESS_NAME}, ${campusAddress(c)}`)}`;

export const mapEmbedUrl = (c: Campus) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(campusAddress(c))}&z=15&output=embed`;

const DAY_ORDER: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

/** e.g. [{ days: "Monday to Friday", time: "4pm to 8pm" }] */
export function formatHours(hours: OpeningHours[]) {
  return hours.map((h) => {
    const sorted = [...h.days].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
    const consecutive = sorted.every((d, i) => i === 0 || DAY_ORDER.indexOf(d) === DAY_ORDER.indexOf(sorted[i - 1]) + 1);
    const days =
      sorted.length > 2 && consecutive ? `${sorted[0]} to ${sorted[sorted.length - 1]}` : sorted.join(' and ').replace(/ and (?=.* and )/g, ', ');
    return { days, time: `${formatTime(h.opens)} to ${formatTime(h.closes)}` };
  });
}
