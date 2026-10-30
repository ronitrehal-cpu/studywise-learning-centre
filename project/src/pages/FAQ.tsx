import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { Accordion } from '../components/Accordion';
import { faqs } from '../data/faqData';

const container = 'max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20';
const textLink = 'text-brand-navy underline decoration-brand-orange underline-offset-4 decoration-1 hover:text-brand-navyDark';

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFaqs = categories.map(category => ({
    category,
    items: filteredFaqs.filter(faq => faq.category === category)
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-[var(--header-full)]">
        <section className="pt-16 md:pt-24 pb-20 md:pb-28">
          <div className={container}>
            <Reveal delay={0.1}>
              <h1 className="font-serif font-medium text-brand-navy text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[1] tracking-[-0.025em]">
                Questions parents ask
              </h1>
              <p className="mt-8 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
                Quick answers about enrolment, programs, fees, and more.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 mt-14 md:mt-20">
              <div className="lg:col-span-4">
                <label htmlFor="faq-search" className="block text-[15px] font-semibold text-brand-ink mb-2">
                  Search questions
                </label>
                <input
                  id="faq-search"
                  type="search"
                  placeholder="e.g. fees, selective entry"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-[52px] px-4 rounded bg-white border border-brand-rule text-base text-brand-ink placeholder:text-brand-muted outline-none focus:ring-2 focus:ring-brand-navy focus:border-brand-navy"
                />
              </div>

              <div className="lg:col-start-6 lg:col-span-7">
                {groupedFaqs.length === 0 ? (
                  <p className="text-lg text-brand-slate">No questions found. Try a different search term.</p>
                ) : (
                  <div className="space-y-16">
                    {groupedFaqs.map((group) => (
                      <div key={group.category}>
                        <h2 className="font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight mb-6">
                          {group.category}
                        </h2>
                        <Accordion items={group.items} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className={container}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 pt-10 border-t border-brand-ink">
              <h2 className="lg:col-span-4 font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight">
                Still have a question?
              </h2>
              <div className="lg:col-start-6 lg:col-span-7">
                <ul className="text-lg leading-[1.6] text-brand-slate">
                  <li className="py-3 border-t border-brand-rule">
                    Call <a href="tel:0387747303" className={textLink}>03 8774 7303</a>
                  </li>
                  <li className="py-3 border-t border-brand-rule">
                    Call or text <a href="tel:0430095076" className={textLink}>0430 095 076</a>
                  </li>
                  <li className="py-3 border-y border-brand-rule">
                    Email{' '}
                    <a href="mailto:admin@studywiselearning.com.au" className={`${textLink} break-all`}>
                      admin@studywiselearning.com.au
                    </a>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="mt-8 w-full sm:w-auto"
                  onClick={() => { window.location.href = '/#enrollment'; }}
                >
                  Book a free assessment
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
