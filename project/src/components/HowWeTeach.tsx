import { Reveal } from './Reveal';

const points = [
  {
    label: 'Small groups',
    text: 'Individual attention in every session, with support tailored to each student.'
  },
  {
    label: 'Face to face',
    text: 'Experienced tutors teach in person, in a distraction-free classroom.'
  },
  {
    label: 'Consistent routines',
    text: 'Regular, structured sessions. Consistent routines lead to better results.'
  },
  {
    label: 'Accountability',
    text: 'A small class keeps every student engaged and accountable.'
  }
];

export function HowWeTeach() {
  return (
    <section className="bg-brand-mist py-14 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              How we teach.
            </h2>
            <p className="mt-4 md:mt-6 text-lg leading-[1.6] text-brand-slate max-w-sm">
              A structured, in-centre approach designed to help every student succeed.
            </p>
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <ul>
              {points.map((point, index) => (
                <li
                  key={point.label}
                  className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-5 md:py-7 border-t ${
                    index === 0 ? 'border-brand-ink' : 'border-brand-rule'
                  } ${index === points.length - 1 ? 'border-b border-b-brand-rule' : ''}`}
                >
                  <h3 className="font-serif font-semibold text-brand-navy text-[22px] leading-snug tracking-tight">
                    {point.label}
                  </h3>
                  <p className="text-lg leading-[1.6] text-brand-slate">{point.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
