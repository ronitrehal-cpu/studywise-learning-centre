import { Button } from './Button';
import { Reveal } from './Reveal';

export function Hero() {
  const scrollToEnrollment = () => {
    document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Top padding sits below the full-size fixed header
  return (
    <section className="bg-white pt-[calc(var(--header-full)+48px)] md:pt-[calc(var(--header-full)+96px)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <Reveal delay={0.1}>
          <h1 className="font-serif font-medium text-brand-navy text-[clamp(3rem,8.6vw,7.75rem)] leading-[0.98] tracking-[-0.025em] max-w-[1220px]">
            Sixteen years of watching students grow.
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 mt-10 md:mt-14 lg:items-end">
            <p className="lg:col-span-5 text-lg md:text-[22px] leading-[1.6] text-brand-slate">
              Studywise has been teaching small groups of students since 2010, from their first years of school through
              to VCE. Many families have been with us for most of that time.
            </p>
            <div className="lg:col-start-7 lg:col-span-6 flex flex-col sm:flex-row sm:items-center lg:justify-end gap-6 sm:gap-8">
              <Button variant="primary" onClick={scrollToEnrollment}>
                Book a free assessment
              </Button>
              <Button variant="secondary" onClick={scrollToPrograms} className="self-start sm:self-auto">
                See programs and fees
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <figure className="mt-14 md:mt-20">
            <img
              src="/1.jpeg"
              alt="The Studywise Clyde North centre at Balla Balla Community Centre"
              className="w-full h-[260px] md:h-[420px] lg:h-[560px] object-cover rounded-t-[999px] border-[5px] border-brand-sky bg-brand-photo"
            />
            <figcaption className="mt-4 text-sm text-brand-muted">Our Clyde North centre.</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
