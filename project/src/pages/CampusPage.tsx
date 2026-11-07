import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { AssessmentCTA } from '../components/AssessmentCTA';
import { ProgramList } from '../components/ProgramList';
import { ImageSlideshow } from '../components/Locations';
import { CampusHours, ContactRows, textLink } from '../components/CampusInfo';
import { CAMPUSES, campusAddress, campusPath, directionsUrl, getCampus, mapEmbedUrl } from '../data/business';
import { NotFound } from './NotFound';

const container = 'max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20';
const h2Class = 'font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight mb-6';
const actionLink =
  'text-base font-semibold text-brand-navy underline decoration-brand-orange underline-offset-[6px] hover:text-brand-navyDark';

const listOf = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items.join('');

export function CampusPage() {
  const { slug } = useParams<{ slug: string }>();
  const campus = getCampus(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!campus) return <NotFound />;

  const others = CAMPUSES.filter((c) => c.slug !== campus.slug);
  const bookAssessment = () => {
    window.location.href = '/#enrollment';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-[var(--header-full)]">
        <section className="pt-16 pb-14 md:pt-24 md:pb-20">
          <div className={container}>
            <Reveal delay={0.1}>
              <Link
                to="/#locations"
                className="inline-block text-base text-brand-muted underline-offset-4 hover:underline hover:text-brand-navy mb-8"
              >
                ← All locations
              </Link>
              <p className="text-base text-brand-muted">Studywise campus</p>
              <h1 className="mt-3 font-serif font-medium text-brand-navy text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[1] tracking-[-0.025em]">
                Tutoring in {campus.name}
              </h1>
              <p className="mt-8 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
                Small-group tutoring from Year 1 to VCE, including selective entry, scholarship and VCE preparation.{' '}
                {campus.about}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-6`}>
            <div className="lg:col-span-7 space-y-16">
              <Reveal>
                <ImageSlideshow images={campus.photos} name={campus.name} />
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>Opening hours</h2>
                <CampusHours campus={campus} />
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>Finding us</h2>
                <p className="text-lg leading-[1.6] text-brand-slate mb-6">{campusAddress(campus)}</p>
                <div className="aspect-[4/3] md:aspect-[16/9] rounded overflow-hidden bg-brand-photo">
                  <iframe
                    title={`Map of Studywise ${campus.name}, ${campusAddress(campus)}`}
                    src={mapEmbedUrl(campus)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
                <a href={directionsUrl(campus)} target="_blank" rel="noopener noreferrer" className={`inline-block mt-6 ${actionLink}`}>
                  Get directions
                </a>
              </Reveal>

              <Reveal>
                <h2 className={h2Class}>Families we teach</h2>
                <p className="text-lg leading-[1.6] text-brand-slate max-w-[680px]">
                  Students come to our {campus.name} campus from across {campus.name} and nearby {listOf(campus.nearby)}.
                  {others.map((o) => (
                    <span key={o.slug}>
                      {' '}
                      Closer to {o.name}? See our{' '}
                      <Link to={campusPath(o)} className={textLink}>
                        {o.name} campus
                      </Link>
                      .
                    </span>
                  ))}
                </p>
              </Reveal>
            </div>

            <aside className="lg:col-start-9 lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-compact)+32px)] bg-brand-mist p-6 md:p-8">
                <h2 className="font-serif font-medium text-brand-navy text-[22px] leading-snug tracking-tight mb-5">
                  Contact {campus.name}
                </h2>
                <address className="not-italic text-base leading-[1.6] text-brand-ink mb-5">{campusAddress(campus)}</address>
                <ContactRows compact />
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                  <a href={directionsUrl(campus)} target="_blank" rel="noopener noreferrer" className={actionLink}>
                    Directions
                  </a>
                  <Link to="/contact" className={actionLink}>
                    All contact details
                  </Link>
                </div>
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
              Programs at {campus.name}
            </h2>
            <ProgramList />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
