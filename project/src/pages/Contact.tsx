import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { CampusHours, ContactRows, textLink } from '../components/CampusInfo';
import { CAMPUSES, SOCIAL, campusAddress, campusPath, directionsUrl } from '../data/business';

const container = 'max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20';
const h2Class = 'font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight';
const actionLink =
  'text-base font-semibold text-brand-navy underline decoration-brand-orange underline-offset-[6px] hover:text-brand-navyDark';

export function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bookAssessment = () => {
    window.location.href = '/#enrollment';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-[var(--header-full)]">
        <section className="pt-16 md:pt-24 pb-14 md:pb-20">
          <div className={container}>
            <Reveal delay={0.1}>
              <h1 className="font-serif font-medium text-brand-navy text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[1] tracking-[-0.025em]">
                Contact Studywise
              </h1>
              <p className="mt-8 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
                Call, text or email us, or visit one of our tutoring campuses in Cranbourne West and Clyde North.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6`}>
            <h2 className={`lg:col-span-4 ${h2Class}`}>Get in touch</h2>
            <div className="lg:col-start-6 lg:col-span-7">
              <ContactRows />
              <p className="mt-6 text-lg leading-[1.6] text-brand-slate">
                Follow us on{' '}
                {SOCIAL.map((s, index) => (
                  <span key={s.label}>
                    {index > 0 && ' and '}
                    <a href={s.url} className={textLink}>
                      {s.label}
                    </a>
                  </span>
                ))}
                .
              </p>
              <Button variant="primary" onClick={bookAssessment} className="mt-8">
                Book a free assessment
              </Button>
            </div>
          </div>
        </section>

        {CAMPUSES.map((campus) => (
          <section key={campus.slug} className="pb-20 md:pb-28">
            <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 pt-10 border-t border-brand-rule`}>
              <h2 className={`lg:col-span-4 ${h2Class}`}>
                <Link to={campusPath(campus)} className="hover:underline underline-offset-4 decoration-2 decoration-brand-orange">
                  {campus.name}
                </Link>
              </h2>
              <div className="lg:col-start-6 lg:col-span-7">
                <address className="not-italic text-lg leading-[1.6] text-brand-ink">{campusAddress(campus)}</address>
                <h3 className="mt-8 mb-3 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-brand-muted">
                  Opening hours
                </h3>
                <CampusHours campus={campus} />
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <a href={directionsUrl(campus)} target="_blank" rel="noopener noreferrer" className={actionLink}>
                    Directions
                  </a>
                  <Link to={campusPath(campus)} className={actionLink}>
                    {campus.name} campus details
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
