import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProgramBySlug, getProgramSummary } from '../data/programData';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { AssessmentCTA } from '../components/AssessmentCTA';
import { ProgramList } from '../components/ProgramList';
import { NotFound } from './NotFound';

const container = 'max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20';
const h2Class = 'font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight mb-6';

function RuledList({ items }: { items: string[] }) {
  return (
    <ul className="text-lg leading-[1.6] text-brand-slate">
      {items.map((item, index) => (
        <li
          key={item}
          className={`py-4 border-t ${index === 0 ? 'border-brand-ink' : 'border-brand-rule'} ${
            index === items.length - 1 ? 'border-b border-b-brand-rule' : ''
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const program = getProgramBySlug(slug || '');
  const summary = getProgramSummary(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) {
    return <NotFound />;
  }

  const bookAssessment = () => {
    window.location.href = '/#enrollment';
  };

  const facts = [
    { label: 'Year levels', value: summary?.years ?? program.title },
    { label: 'Focus areas', value: program.focusAreas.join(', ') },
    { label: 'Class format', value: 'Small groups, in person' },
    { label: 'Locations', value: 'Cranbourne West and Clyde North' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-[var(--header-full)]">
        <section className="pt-16 pb-14 md:pt-24 md:pb-20">
          <div className={container}>
            <Reveal delay={0.1}>
              <Link
                to="/#programs"
                className="inline-block text-base text-brand-muted underline-offset-4 hover:underline hover:text-brand-navy mb-8"
              >
                ← All programs
              </Link>
              <p className="text-base text-brand-muted">{summary?.years}</p>
              <h1 className="mt-3 font-serif font-medium text-brand-navy text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[1] tracking-[-0.025em]">
                {summary?.name ?? program.title}
              </h1>
              <p className="mt-8 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
                {program.fullDescription}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-6`}>
            <div className="lg:col-span-7 space-y-16">
              <Reveal>
                <h2 className={h2Class}>Who it's for</h2>
                <RuledList items={program.whoItsFor} />
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>What's covered</h2>
                <RuledList items={program.focusAreas} />
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>How it works</h2>
                <RuledList items={program.howItWorks} />
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>Locations and times</h2>
                <p className="text-lg leading-[1.6] text-brand-slate max-w-[680px]">
                  We offer this program at both our Cranbourne West and Clyde North locations. Class times vary by
                  location and age group.
                </p>
                <Link
                  to="/#locations"
                  className="inline-block mt-6 text-base font-semibold text-brand-navy underline decoration-brand-orange underline-offset-[6px] hover:text-brand-navyDark"
                >
                  See locations and contact details
                </Link>
              </Reveal>
            </div>

            <aside className="lg:col-start-9 lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-compact)+32px)] bg-brand-mist p-6 md:p-8">
                <h2 className="font-serif font-medium text-brand-navy text-[22px] leading-snug tracking-tight mb-5">
                  At a glance
                </h2>
                <dl className="text-base leading-[1.6]">
                  {facts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={`py-3 border-t ${index === 0 ? 'border-brand-ink' : 'border-brand-rule'}`}
                    >
                      <dt className="text-sm text-brand-muted">{fact.label}</dt>
                      <dd className="text-brand-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <Button variant="primary" onClick={bookAssessment} className="w-full mt-6">
                  Book a free assessment
                </Button>
              </div>
            </aside>
          </div>
        </section>

        <AssessmentCTA />

        <section className="py-20 md:py-28">
          <div className={container}>
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight mb-10 md:mb-14">
              Other programs
            </h2>
            <ProgramList exclude={program.slug} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
