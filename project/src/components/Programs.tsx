import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { ProgramList } from './ProgramList';
import { programSummaries } from '../data/programData';

export function Programs() {
  return (
    <section id="programs" className="bg-white py-20 md:py-28 scroll-mt-[5.5rem]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              Programs
            </h2>
            <Link
              to={`/programs/${programSummaries[0].slug}`}
              className="text-base font-semibold text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark"
            >
              All programs
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ProgramList />
        </Reveal>
      </div>
    </section>
  );
}
