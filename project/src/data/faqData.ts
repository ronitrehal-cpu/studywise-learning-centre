export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  {
    category: 'Enrolment & Getting Started',
    question: 'How do I enrol my child?',
    answer: `You can enrol by clicking "Book a free assessment" on our website, calling us at 03 8774 7303, or visiting one of our centres. We'll guide you through the process, discuss your child's needs, and help you choose the right program.`
  },
  {
    category: 'Enrolment & Getting Started',
    question: 'Do you offer a free assessment?',
    answer: `Yes! We offer a free assessment to understand your child's current level and learning goals. This helps us recommend the most suitable program and class for their needs.`
  },
  {
    category: 'Enrolment & Getting Started',
    question: 'Can my child try a class before enrolling?',
    answer: `Absolutely! We encourage trial sessions so your child can experience our teaching style and classroom environment. Contact us to arrange a trial class at either our Cranbourne West or Clyde North location.`
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
    category: 'Contact & Locations',
    question: 'Where are your centres located?',
    answer: `We have two convenient locations: Cranbourne West (5 Biara Court, Cranbourne West VIC 3977) and Clyde North (Balla Balla Community Centre, Clyde North VIC 3978).`
  },
  {
    category: 'Contact & Locations',
    question: 'How can I contact Studywise?',
    answer: `You can call us at 03 8774 7303 or 0430 095 076, email us at admin@studywiselearning.com.au, or visit one of our centres. We're here to answer your questions and help you find the right program for your child.`
  }
];

// Questions shown in the homepage preview, in order
export const previewQuestions = [
  'How do I enrol my child?',
  'What year levels do you tutor?',
  'Do you offer a free assessment?'
];
