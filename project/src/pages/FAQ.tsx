import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { Reveal } from '../components/Reveal';
import { ChevronDown, Search, Phone, Mail } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'Enrolment & Getting Started',
    question: 'How do I enrol my child?',
    answer: `You can enrol by clicking "Enrol Now" on our website, calling us at 03 8774 7303, or visiting one of our centres. We'll guide you through the process, discuss your child's needs, and help you choose the right program.`
  },
  {
    category: 'Enrolment & Getting Started',
    question: 'Do you offer a free assessment?',
    answer: `Yes! We offer a free assessment to understand your child's current level and learning goals. This helps us recommend the most suitable program and class for their needs.`
  },
  {
    category: 'Enrolment & Getting Started',
    question: 'Can my child try a class before enrolling?',
    answer: `Absolutely! We encourage trial sessions so your child can experience our teaching style and classroom environment. Contact us to arrange a trial class at either our Cranbourne West or Clyde North location, or join us online.`
  },
  {
    category: 'Enrolment & Getting Started',
    question: 'How are students grouped (by year level or ability)?',
    answer: `Students are grouped based on both year level and ability to ensure they're challenged appropriately. After the initial assessment, we place students in classes where they can thrive and progress at the right pace.`
  },
  {
    category: 'Programs & Subjects',
    question: 'What year levels do you tutor?',
    answer: `We support students from Year 1 to Year 12 across all our programs. Whether your child needs homework help, exam preparation, or selective entry coaching, we have programs tailored to their year level.`
  },
  {
    category: 'Programs & Subjects',
    question: 'What subjects do you cover?',
    answer: `We cover English, Mathematics, Science, and test preparation across primary and secondary levels. We also offer specialized programs for VCE, selective entry exams, scholarship exams, and general academic support.`
  },
  {
    category: 'Programs & Subjects',
    question: 'Do you help with homework and school assessments?',
    answer: `Yes! Our tutors provide homework support and help students prepare for school assessments and exams. We work alongside your child's school curriculum to reinforce what they're learning in class.`
  },
  {
    category: 'Selective Entry & Scholarship',
    question: 'What is the Selective Entry exam and who is it for?',
    answer: `The Selective Entry exam is for Year 8 entry into Victoria's top selective high schools. It tests verbal reasoning, numerical reasoning, reading comprehension, and writing. Our program prepares Year 7 and 8 students for this competitive exam.`
  },
  {
    category: 'Selective Entry & Scholarship',
    question: 'Which schools does your Selective Entry program target?',
    answer: `Our program prepares students for entry into Melbourne High School, Mac.Robertson Girls' High School, Nossal High School, Suzanne Cory High School, and other selective entry schools across Victoria.`
  },
  {
    category: 'Selective Entry & Scholarship',
    question: 'What does your program include (tests, feedback, writing)?',
    answer: `Our Selective Entry program includes regular practice tests under exam conditions, detailed feedback and progress reports, writing skills development, exam technique training, and comprehensive coverage of all test components.`
  },
  {
    category: 'Fees & Payments',
    question: 'How much does it cost?',
    answer: `Our fees vary depending on the program, year level, and session length. We offer competitive rates and flexible payment options. Please contact us at 03 8774 7303 or admin@studywiselearning.com.au for detailed pricing information.`
  },
  {
    category: 'Fees & Payments',
    question: 'Do you have sibling discounts?',
    answer: `Yes, we offer sibling discounts when you enrol multiple children. Contact us to learn more about our family discount rates and payment plans.`
  },
  {
    category: 'Fees & Payments',
    question: 'What payment methods do you accept?',
    answer: `We accept bank transfer, credit card, and direct debit payments. You can pay by term or set up a convenient payment plan. Our team will discuss payment options during enrolment.`
  },
  {
    category: 'Fees & Payments',
    question: 'What happens if we miss a session?',
    answer: `If you need to miss a session, please let us know as soon as possible. We'll work with you to arrange a makeup class or provide resources so your child doesn't fall behind.`
  },
  {
    category: 'Studywise Online',
    question: 'What is Studywise Online?',
    answer: `Studywise Online is our new virtual learning platform that brings the same high-quality tutoring to students anywhere in Australia. Students join live classes via Zoom with experienced tutors and interactive lessons.`
  },
  {
    category: 'Studywise Online',
    question: 'Can students join from anywhere in Australia?',
    answer: `Yes! Studywise Online is available to students across Australia. As long as you have a reliable internet connection and a device with Zoom, your child can join our online classes from anywhere.`
  },
  {
    category: 'Studywise Online',
    question: 'Are online classes the same as in-centre classes?',
    answer: `Our online classes follow the same curriculum, teaching methods, and quality standards as our in-centre classes. Students receive the same level of support, resources, and personalized attention from our experienced tutors.`
  },
  {
    category: 'Studywise Online',
    question: 'How do students receive resources and practice tests?',
    answer: `All learning materials, practice tests, and resources are shared digitally through our online platform. Students can access worksheets, homework, and additional practice materials at any time.`
  },
  {
    category: 'Contact & Locations',
    question: 'Where are your centres located?',
    answer: `We have two convenient locations: Cranbourne West (5 Biara Court, Cranbourne West VIC 3977) and Clyde North (Balla Balla Community Centre, Clyde North VIC 3978). We also offer Studywise Online for students who prefer virtual learning.`
  },
  {
    category: 'Contact & Locations',
    question: 'How can I contact Studywise?',
    answer: `You can call us at 03 8774 7303 or 0430 095 076, email us at admin@studywiselearning.com.au, or visit one of our centres. We're here to answer your questions and help you find the right program for your child.`
  }
];

function AccordionItem({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
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
          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      <main className="pt-20">
      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <Reveal delay={0.1}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600">
                Quick answers about enrolment, programs, fees, and Studywise Online.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </Reveal>

          {groupedFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No questions found. Try a different search term.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {groupedFaqs.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {group.category}
                  </h2>
                  <div className="space-y-3">
                    {group.items.map((faq, itemIndex) => {
                      const globalIndex = faqs.indexOf(faq);
                      return (
                        <AccordionItem
                          key={globalIndex}
                          faq={faq}
                          isOpen={openIndex === globalIndex}
                          onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section background="white">
        <Reveal>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-700 text-center mb-6">
                Call, text, or email us and we'll help you choose the right program.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-700" />
                  <span className="text-gray-700 font-medium">03 8774 7303</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-700" />
                  <span className="text-gray-700 font-medium">0430 095 076</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-700" />
                  <span className="text-gray-700 font-medium">admin@studywiselearning.com.au</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="primary" onClick={() => window.location.href = 'tel:0387747303'}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="primary" onClick={() => window.location.href = 'sms:0430095076'}>
                  <Phone className="w-4 h-4 mr-2" />
                  Text
                </Button>
                <Button variant="primary" onClick={() => window.location.href = 'mailto:admin@studywiselearning.com.au'}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
      </main>
      <Footer />
    </div>
  );
}
