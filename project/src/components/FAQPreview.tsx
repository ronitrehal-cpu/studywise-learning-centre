import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';
import { Accordion } from './Accordion';
import { faqs, previewQuestions } from '../data/faqData';

export function FAQPreview() {
  const previewFaqs = previewQuestions
    .map((question) => faqs.find((faq) => faq.question === question))
    .filter((faq) => faq !== undefined)
    .slice(0, 5);

  return (
    <section className="bg-white py-14 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              Questions parents ask.
            </h2>
            <Link
              to="/faq"
              className="inline-block mt-4 md:mt-6 text-base font-semibold text-brand-navy underline decoration-brand-orange underline-offset-[6px] hover:text-brand-navyDark"
            >
              All FAQs
            </Link>
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            <Accordion items={previewFaqs} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
