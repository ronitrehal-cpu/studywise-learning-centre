import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

const previewFaqs = [
  {
    question: 'How do I enrol my child?',
    answer: 'You can enrol by clicking "Enrol Now" on our website, calling us at 03 8774 7303, or visiting one of our centres. We\'ll guide you through the process, discuss your child\'s needs, and help you choose the right program.'
  },
  {
    question: 'What year levels do you tutor?',
    answer: 'We support students from Year 1 to Year 12 across all our programs. Whether your child needs homework help, exam preparation, or selective entry coaching, we have programs tailored to their year level.'
  },
  {
    question: 'Do you offer a free assessment?',
    answer: 'Yes! We offer a free assessment to understand your child\'s current level and learning goals. This helps us recommend the most suitable program and class for their needs.'
  }
];

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5 flex-shrink-0 text-brand-navy">
      <path d="M2 10 H18" stroke="currentColor" strokeWidth="1.5" />
      {!open && <path d="M10 2 V18" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  );
}

function AccordionItem({ id, question, answer, isOpen, onToggle, isFirst, isLast }: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div
      className={`border-t ${isFirst ? 'border-brand-ink' : 'border-brand-rule'} ${
        isLast ? 'border-b border-b-brand-rule' : ''
      }`}
    >
      <h3 className="m-0">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          className="w-full py-6 flex items-center justify-between gap-6 text-left font-serif font-medium text-brand-navy text-xl md:text-[22px] leading-snug tracking-tight"
        >
          <span>{question}</span>
          <PlusMinus open={isOpen} />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        hidden={!isOpen}
        className="pb-7"
      >
        <p className="text-[17px] leading-[1.6] text-brand-slate max-w-[640px]">{answer}</p>
      </div>
    </div>
  );
}

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight">
              Questions parents ask.
            </h2>
            <Link
              to="/faq"
              className="inline-block mt-6 text-base font-semibold text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark"
            >
              All FAQs
            </Link>
          </Reveal>

          <Reveal className="lg:col-start-6 lg:col-span-7" delay={0.1}>
            {previewFaqs.slice(0, 5).map((faq, index) => (
              <AccordionItem
                key={faq.question}
                id={`faq-preview-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                isFirst={index === 0}
                isLast={index === Math.min(previewFaqs.length, 5) - 1}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
