import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { programsData } from '../data/programData';

// Homepage order and display labels; titles in programData keep their year ranges for the detail pages
const programRows: { slug: string; years: string; name: string }[] = [
  { slug: 'primary', years: 'Years 1–6', name: 'Primary' },
  { slug: 'secondary', years: 'Years 7–10', name: 'Secondary' },
  { slug: 'selective-entry', years: 'Year 8', name: 'Selective Entry' },
  { slug: 'scholarship-preparation', years: 'Scholarship exams', name: 'Scholarship Preparation' },
  { slug: 'jmss', years: 'Year 9', name: 'John Monash Science School' },
  { slug: 'vce', years: 'Years 11–12', name: 'VCE' }
];

export function Programs() {
  const rows = programRows.flatMap((row) => {
    const program = programsData.find((p) => p.slug === row.slug);
    return program ? [{ ...row, description: program.shortDescription }] : [];
  });

  return (
    <section id="programs" className="bg-white py-20 md:py-28 scroll-mt-[5.5rem]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              Programs
            </h2>
            <Link
              to={`/programs/${programRows[0].slug}`}
              className="text-base font-semibold text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark"
            >
              All programs
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul>
            {rows.map((row, index) => (
              <li key={row.slug}>
                <Link
                  to={`/programs/${row.slug}`}
                  className={`group grid grid-cols-[1fr_auto] md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_auto] gap-x-6 md:gap-x-8 gap-y-1 items-center py-[26px] border-t ${
                    index === 0 ? 'border-brand-ink' : 'border-brand-rule'
                  } ${index === rows.length - 1 ? 'border-b border-b-brand-rule' : ''}`}
                >
                  <span className="col-start-1 md:col-start-auto text-base text-brand-muted">{row.years}</span>
                  <span className="col-start-1 md:col-start-auto font-serif font-medium text-brand-navy text-2xl md:text-[30px] leading-tight tracking-tight underline-offset-[6px] decoration-1 group-hover:underline">
                    {row.name}
                  </span>
                  <span className="col-start-1 md:col-start-auto text-[17px] leading-[1.6] text-brand-slate mt-1 md:mt-0">
                    {row.description}
                  </span>
                  <span
                    aria-hidden="true"
                    className="col-start-2 row-start-1 row-span-3 md:col-start-auto md:row-start-auto md:row-span-1 text-2xl text-brand-navy transition-transform duration-200 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
