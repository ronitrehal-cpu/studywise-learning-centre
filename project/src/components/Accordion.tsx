import { useState, useId } from 'react';

interface AccordionEntry {
  question: string;
  answer: string;
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="w-5 h-5 flex-shrink-0 text-brand-navy">
      <path d="M2 10 H18" stroke="currentColor" strokeWidth="1.5" />
      {!open && <path d="M10 2 V18" stroke="currentColor" strokeWidth="1.5" />}
    </svg>
  );
}

// Ruled question/answer list: ink rule on top, light rules between, one item open at a time
export function Accordion({ items }: { items: AccordionEntry[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const id = `${baseId}-${index}`;
        return (
          <div
            key={item.question}
            className={`border-t ${index === 0 ? 'border-brand-ink' : 'border-brand-rule'} ${
              index === items.length - 1 ? 'border-b border-b-brand-rule' : ''
            }`}
          >
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-button`}
                className="w-full py-6 flex items-center justify-between gap-6 text-left font-serif font-medium text-brand-navy text-xl md:text-[22px] leading-snug tracking-tight"
              >
                <span>{item.question}</span>
                <PlusMinus open={isOpen} />
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-button`} hidden={!isOpen} className="pb-7">
              <p className="text-[17px] leading-[1.6] text-brand-slate max-w-[640px]">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
