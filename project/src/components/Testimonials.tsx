import { Reveal } from './Reveal';
import { testimonials, Testimonial } from '../data/testimonialData';

const FEATURED_NAME = 'Nitin Patel';
const SUPPORTING_NAMES = ['Shehbaaz Sandhu', 'Himani Desai', 'Roop Brar'];

const byName = (name: string) => testimonials.find((t) => t.name === name);

function attribution(testimonial: Testimonial) {
  return testimonial.descriptor ? `${testimonial.name}, ${testimonial.descriptor.toLowerCase()}` : `${testimonial.name}, parent`;
}

export function Testimonials() {
  const featured = byName(FEATURED_NAME) ?? testimonials[0];
  const supporting = SUPPORTING_NAMES.map(byName).filter((t): t is Testimonial => !!t && t !== featured).slice(0, 3);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 lg:items-center">
          <Reveal className="lg:col-span-4">
            <img
              src="/11.webp"
              alt="A classroom at the Studywise Cranbourne West centre"
              className="w-full h-[320px] md:h-[440px] object-cover object-right rounded-t-[999px] bg-brand-photo"
            />
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <figure>
              <blockquote className="font-serif italic font-normal text-brand-navy text-[26px] md:text-[34px] xl:text-[44px] leading-[1.25] tracking-tight">
                “{featured.text}”
              </blockquote>
              <figcaption className="mt-8 text-base text-brand-slate">{attribution(featured)}</figcaption>
            </figure>
          </Reveal>
        </div>

        {supporting.length > 0 && (
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mt-20 md:mt-24">
              {supporting.map((testimonial) => (
                <figure key={testimonial.name} className="border-t border-brand-rule pt-6">
                  <blockquote className="font-serif text-brand-navy text-xl leading-[1.45]">“{testimonial.text}”</blockquote>
                  <figcaption className="mt-4 text-sm text-brand-muted">{testimonial.name}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
