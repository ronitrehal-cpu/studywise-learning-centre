import { BookOpen, GraduationCap, Trophy, Target } from 'lucide-react';

export interface ProgramData {
  id: string;
  slug: string;
  icon: typeof BookOpen;
  title: string;
  shortDescription: string;
  fullDescription: string;
  whoItsFor: string[];
  focusAreas: string[];
  howItWorks: string[];
}

export const programsData: ProgramData[] = [
  {
    id: 'primary',
    slug: 'primary',
    icon: BookOpen,
    title: 'Primary (Years 1–6)',
    shortDescription: 'Building strong foundations in core subjects with engaging, age-appropriate learning.',
    fullDescription: 'Our Primary program focuses on building essential skills and confidence in core subjects through engaging, age-appropriate learning activities that align with the Australian curriculum.',
    whoItsFor: [
      'Students in Years 1 to 6',
      'Children needing support with foundational literacy and numeracy',
      'Students looking to get ahead and excel in their studies',
      'Learners who benefit from small group or one-on-one attention'
    ],
    focusAreas: ['Maths', 'English', 'Reading & Writing', 'Problem Solving'],
    howItWorks: [
      'Small group sessions with maximum attention for each student',
      'Personalised learning plans tailored to individual needs and abilities',
      'Regular progress assessments and parent communication',
      'Comprehensive resources aligned with the Victorian curriculum'
    ]
  },
  {
    id: 'secondary',
    slug: 'secondary',
    icon: GraduationCap,
    title: 'Secondary (Years 7–10)',
    shortDescription: 'Comprehensive support across key subjects to excel in secondary school.',
    fullDescription: 'Our Secondary program provides comprehensive support across key subjects, helping students build confidence, develop effective study skills, and achieve academic excellence throughout Years 7 to 10.',
    whoItsFor: [
      'Students in Years 7 to 10',
      'Teens seeking to improve grades and understanding',
      'Students preparing for VCE or senior secondary studies',
      'Learners needing help with homework and exam preparation'
    ],
    focusAreas: ['Maths', 'English', 'Science', 'Study Skills'],
    howItWorks: [
      'Expert tutors specialising in secondary curriculum',
      'Targeted support for tests, assignments, and exams',
      'Development of critical thinking and analytical skills',
      'Study techniques and time management strategies'
    ]
  },
  {
    id: 'vce',
    slug: 'vce',
    icon: Trophy,
    title: 'VCE (Years 11–12)',
    shortDescription: 'Specialist VCE tutoring to maximise results and university entrance scores.',
    fullDescription: 'Our VCE program provides specialist tutoring designed to maximise your ATAR score and prepare you for university. We focus on exam techniques, comprehensive content mastery, and strategic study approaches.',
    whoItsFor: [
      'Students in Years 11 and 12',
      'VCE students aiming for high ATARs',
      'Learners preparing for university entrance',
      'Students needing support with challenging VCE subjects'
    ],
    focusAreas: ['Methods', 'General Maths', 'Specialist Maths', 'English', 'Biology', 'Chemistry', 'Physics'],
    howItWorks: [
      'Highly experienced VCE specialist tutors',
      'Comprehensive coverage of study design and exam requirements',
      'Practice with past exams and VCAA materials',
      'Strategic approaches to maximise marks and ATAR outcomes'
    ]
  },
  {
    id: 'selective-entry',
    slug: 'selective-entry',
    icon: Target,
    title: 'Selective Entry',
    shortDescription: 'Targeted preparation for selective school entrance exams.',
    fullDescription: 'Our Selective Entry program provides comprehensive preparation for the Year 8 selective school entrance examination for Year 9 entry into prestigious Victorian selective schools including Melbourne High School, Mac.Robertson Girls\' High School, Nossal High School, and other selective entry high schools.',
    whoItsFor: [
      'Year 8 students preparing for Year 9 selective entry',
      'Students targeting Melbourne High, Mac.Robertson, Nossal, and other selective schools',
      'Families seeking comprehensive exam preparation',
      'Learners aiming to develop advanced reasoning skills'
    ],
    focusAreas: ['Verbal Reasoning', 'Numerical Reasoning', 'Reading Comprehension', 'Writing'],
    howItWorks: [
      'Structured curriculum covering all exam components',
      'Practice with authentic exam-style questions',
      'Timed test simulations to build exam confidence',
      'Regular feedback and progress tracking'
    ]
  },
  {
    id: 'scholarship-preparation',
    slug: 'scholarship-preparation',
    icon: Target,
    title: 'Scholarship Preparation',
    shortDescription: 'Comprehensive coaching for scholarship examinations.',
    fullDescription: 'Our Scholarship Preparation program offers comprehensive coaching for private school scholarship examinations, helping students showcase their academic potential and secure valuable scholarships.',
    whoItsFor: [
      'Students preparing for scholarship exams',
      'Families seeking private school education opportunities',
      'High-achieving students wanting to demonstrate their abilities',
      'Learners preparing for competitive academic assessments'
    ],
    focusAreas: ['Exam Technique', 'Critical Thinking', 'English', 'Maths'],
    howItWorks: [
      'Tailored preparation for specific scholarship requirements',
      'Development of advanced problem-solving skills',
      'Practice with past scholarship papers and similar materials',
      'Interview preparation and presentation skills coaching'
    ]
  },
  {
    id: 'jmss',
    slug: 'jmss',
    icon: Trophy,
    title: 'John Monash Science School',
    shortDescription: 'Specialised preparation for JMSS entrance requirements.',
    fullDescription: 'Our John Monash Science School program provides specialised preparation for the JMSS entrance exam, focusing on the scientific reasoning, mathematics, and writing skills required for successful entry.',
    whoItsFor: [
      'Year 9 students applying for Year 10 JMSS entry',
      'Students with strong interest in STEM subjects',
      'Learners preparing for the competitive JMSS selection process',
      'Future scientists and engineers seeking specialised education'
    ],
    focusAreas: ['Science Reasoning', 'Maths', 'Writing', 'Problem Solving'],
    howItWorks: [
      'Focused preparation for JMSS-specific exam format',
      'Development of scientific thinking and analytical skills',
      'Practice with JMSS-style questions and assessments',
      'Guidance on the application and selection process'
    ]
  }
];

export const getProgramBySlug = (slug: string): ProgramData | undefined => {
  return programsData.find(program => program.slug === slug);
};
