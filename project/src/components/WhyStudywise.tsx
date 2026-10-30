import { Reveal } from './Reveal';

const reasons = [
  {
    label: 'Year 1 to VCE',
    text: "Plenty of our Year 12s first walked in as six-year-olds. We know how they learn because we've seen every stage of it."
  },
  {
    label: 'Brothers and sisters',
    text: "We're now teaching the younger siblings of some of our first students. Parents come back when it worked the first time."
  },
  {
    label: 'The same teachers',
    text: "Our staff stay for years. Your child won't be re-introducing themselves to someone new every term."
  }
];

export function WhyStudywise() {
  return (
    <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              Why families stay.
            </h2>
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <ul>
              {reasons.map((reason, index) => (
                <li
                  key={reason.label}
                  className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-7 border-t ${
                    index === 0 ? 'border-brand-ink' : 'border-brand-rule'
                  } ${index === reasons.length - 1 ? 'border-b border-b-brand-rule' : ''}`}
                >
                  <h3 className="font-serif font-semibold text-brand-navy text-[22px] leading-snug tracking-tight">
                    {reason.label}
                  </h3>
                  <p className="text-lg leading-[1.6] text-brand-slate">{reason.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
