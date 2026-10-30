import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import { testimonials, Testimonial } from '../data/testimonialData';

interface TestimonialsProps {
  featuredName?: string;
  supportingNames?: string[];
  /** Photo path without extension; expects a .webp and a .jpg fallback (see public/images/) */
  imageBase?: string;
  imageAlt?: string;
  imagePosition?: string;
}

const byName = (name: string) => testimonials.find((t) => t.name === name);

function attribution(testimonial: Testimonial) {
  return testimonial.descriptor ? `${testimonial.name}, ${testimonial.descriptor.toLowerCase()}` : `${testimonial.name}, parent`;
}

// Below md: a native scroll-snap row (next card peeks in) with dots; md and up: the 3-column grid
function SupportingQuotes({ items }: { items: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    // The scroller is the cards' offsetParent, so card.offsetLeft - padding is the card's snap position
    const update = () => {
      const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
      const distances = cardRefs.current.map((card) => (card ? Math.abs(card.offsetLeft - padding - scroller.scrollLeft) : Infinity));
      setActive(distances.indexOf(Math.min(...distances)));
    };
    scroller.addEventListener('scroll', update, { passive: true });
    return () => scroller.removeEventListener('scroll', update);
  }, []);

  const scrollToCard = (index: number) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const padding = parseFloat(getComputedStyle(scroller).paddingLeft) || 0;
    scroller.scrollTo({ left: card.offsetLeft - padding, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      <div
        ref={scrollerRef}
        tabIndex={0}
        role="region"
        aria-label="More from Studywise families"
        className="relative flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-hide -mx-6 px-6 scroll-px-6 md:mx-0 md:px-0 md:scroll-px-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-navy"
      >
        {items.map((testimonial, index) => (
          <figure
            key={testimonial.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="snap-start shrink-0 w-[85vw] md:w-auto border-t border-brand-rule pt-6"
          >
            <blockquote className="font-serif text-brand-navy text-lg md:text-xl leading-[1.45] md:leading-[1.45]">“{testimonial.text}”</blockquote>
            <figcaption className="mt-4 text-sm text-brand-muted">{testimonial.name}</figcaption>
          </figure>
        ))}
      </div>
      {items.length > 1 && (
        <div className="flex justify-center gap-1 mt-5 md:hidden">
          {items.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => scrollToCard(index)}
              aria-label={`Show quote ${index + 1} of ${items.length}`}
              aria-current={index === active}
              className="p-2"
            >
              <span className={`block w-2 h-2 rounded-full transition-colors duration-300 ${index === active ? 'bg-brand-navy' : 'bg-brand-rule'}`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export function Testimonials({
  featuredName = 'Nitin Patel',
  supportingNames = ['Shehbaaz Sandhu', 'Himani Desai', 'Roop Brar'],
  imageBase = '/images/maths-worksheet',
  imageAlt = 'A child working through a maths worksheet with a pencil',
  imagePosition = 'object-center'
}: TestimonialsProps) {
  const featured = byName(featuredName) ?? testimonials[0];
  const supporting = supportingNames.map(byName).filter((t): t is Testimonial => !!t && t !== featured).slice(0, 3);

  return (
    <section className="bg-white py-14 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-6 lg:items-center">
          <Reveal className="lg:col-span-4">
            <picture className="block">
              <source srcSet={`${imageBase}.webp`} type="image/webp" />
              <img
                src={`${imageBase}.jpg`}
                alt={imageAlt}
                width={900}
                height={1125}
                className={`w-full h-[220px] md:h-[440px] object-cover ${imagePosition} rounded-t-[999px] bg-brand-photo`}
              />
            </picture>
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <figure>
              <blockquote className="font-serif italic font-normal text-brand-navy text-[22px] md:text-[30px] xl:text-[36px] leading-[1.3] md:leading-[1.25] tracking-tight">
                “{featured.text}”
              </blockquote>
              <figcaption className="mt-6 md:mt-8 text-base text-brand-slate">{attribution(featured)}</figcaption>
            </figure>
          </Reveal>
        </div>

        {supporting.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-12 md:mt-24">
              <SupportingQuotes items={supporting} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
