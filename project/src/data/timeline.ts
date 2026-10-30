// Entries for the "Our story so far" timeline on the Our story page, oldest first.
// Each later entry gets one more growth ring; the last is drawn filled.
export interface TimelineEntry {
  year: string;
  text: string;
}

export const timeline: TimelineEntry[] = [
  { year: '2010', text: 'Studywise opens its doors.' },
  { year: 'Today', text: 'Teaching the younger brothers and sisters of our first students.' }
];
