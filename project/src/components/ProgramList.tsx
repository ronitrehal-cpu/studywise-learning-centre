import { Link } from 'react-router-dom';
import { programsData, programSummaries } from '../data/programData';

// Editorial "contents page" list of programs, used on the homepage and program pages
export function ProgramList({ exclude }: { exclude?: string }) {
  const rows = programSummaries
    .filter((row) => row.slug !== exclude)
    .flatMap((row) => {
      const program = programsData.find((p) => p.slug === row.slug);
      return program ? [{ ...row, description: program.shortDescription }] : [];
    });

  return (
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
  );
}
