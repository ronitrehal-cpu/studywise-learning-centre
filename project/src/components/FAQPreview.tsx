import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { ChevronDown } from 'lucide-react';

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

function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-blue-700 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <Section background="light">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to the most common questions from parents.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3 mb-8">
          {previewFaqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              navigate('/faq');
              window.scrollTo(0, 0);
            }}
          >
            View All FAQs
          </Button>
        </div>
      </div>
    </Section>
  );
}
