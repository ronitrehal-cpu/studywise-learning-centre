import React, { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Reveal } from '../components/Reveal';
import { Timeline } from '../components/Timeline';
import { WhyStudywise } from '../components/WhyStudywise';
import { Testimonials } from '../components/Testimonials';
import { AssessmentCTA } from '../components/AssessmentCTA';

const container = 'max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20';
const bodyText = 'text-lg leading-[1.6] text-brand-slate';

const differences = [
  {
    title: 'Personalised learning',
    description: 'Every student learns differently. Our approach adapts to individual needs, strengths, and learning styles.'
  },
  {
    title: 'Curriculum-aligned teaching',
    description: 'Our programs are carefully aligned with the Australian curriculum to complement school learning.'
  },
  {
    title: 'Experienced educators',
    description: 'Our qualified teachers bring deep subject knowledge and a passion for helping students succeed.'
  },
  {
    title: 'Small group focus',
    description: 'Small class sizes ensure every student receives the attention and support they need.'
  },
  {
    title: 'Progress tracking',
    description: 'Clear feedback and regular progress updates keep students and parents informed.'
  },
  {
    title: 'Exam readiness',
    description: 'Building both knowledge and confidence to help students perform their best when it matters.'
  }
];

const steps = [
  {
    title: 'Understanding goals',
    description: 'We start by understanding each student\'s current level, challenges, and academic goals.'
  },
  {
    title: 'Program placement',
    description: 'Students are placed in the right program with the right support for their needs.'
  },
  {
    title: 'Consistent learning',
    description: 'Regular weekly sessions build knowledge, skills, and confidence over time.'
  },
  {
    title: 'Feedback and improvement',
    description: 'Ongoing assessment and feedback help students understand their progress and areas for growth.'
  },
  {
    title: 'Confidence and results',
    description: 'Students develop both academic skills and the confidence to tackle new challenges.'
  }
];

const values = [
  { title: 'Growth', description: 'Every student can improve with the right support.' },
  { title: 'Consistency', description: 'Regular practice builds lasting understanding.' },
  { title: 'Clarity', description: 'Clear explanations make learning accessible.' },
  { title: 'Confidence', description: 'Success builds the confidence to achieve more.' }
];

// Heading on the left, content at reading width on the right, thin rule above
function StorySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-20">
      <div className={container}>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 pt-10 border-t border-brand-rule">
            <h2 className="lg:col-span-4 font-serif font-medium text-brand-navy text-[28px] md:text-[34px] leading-tight tracking-tight">
              {title}
            </h2>
            <div className="lg:col-start-6 lg:col-span-7 max-w-[680px]">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LabelledList({ items, numbered = false }: { items: { title: string; description: string }[]; numbered?: boolean }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.title}
          className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-6 border-t ${
            index === 0 ? 'border-brand-ink' : 'border-brand-rule'
          } ${index === items.length - 1 ? 'border-b border-b-brand-rule' : ''}`}
        >
          <h3 className="font-serif font-semibold text-brand-navy text-xl md:text-[22px] leading-snug tracking-tight">
            {numbered && <span className="text-brand-muted font-normal mr-2">{index + 1}.</span>}
            {item.title}
          </h3>
          <p className={bodyText}>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-[5.5rem]">
        <section className="pt-16 md:pt-24 pb-4">
          <div className={container}>
            <Reveal delay={0.1}>
              <h1 className="font-serif font-medium text-brand-navy text-[clamp(2.75rem,6.2vw,5.5rem)] leading-[1] tracking-[-0.025em]">
                Our story
              </h1>
              <p className="mt-8 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
                Studywise has been teaching small groups of students in Melbourne's south-east since 2010. Many of our
                families have been with us for years, some for every stage of school.
              </p>
            </Reveal>
          </div>
        </section>

        <StorySection title="How it began">
          <div className={`space-y-5 ${bodyText}`}>
            <p>
              Studywise Learning Centre was built on a simple yet powerful belief: every student has the potential to
              excel when given the right support, guidance, and learning environment.
            </p>
            <p>
              What began as a small tutoring service has grown into a trusted learning centre serving students across
              multiple locations. Over the years, we've helped thousands of students build confidence, master
              challenging concepts, and achieve their academic goals.
            </p>
            <p>
              Our success comes from maintaining a student-first approach. We take the time to understand each
              learner's unique needs, adapt our teaching methods accordingly, and create a supportive environment where
              students feel comfortable asking questions and taking on new challenges.
            </p>
            <p>
              Today, Studywise continues to evolve, incorporating the latest educational research and teaching
              practices while staying true to our core values of personalised learning, academic excellence, and
              genuine care for every student's success.
            </p>
          </div>
        </StorySection>

        <section className="bg-brand-mist py-20 md:py-28 my-4">
          <div className={container}>
            <Reveal>
              <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] leading-[1.05] tracking-tight mb-12 md:mb-16">
                Our story so far
              </h2>
              <Timeline />
            </Reveal>
          </div>
        </section>

        <StorySection title="Mission and vision">
          <div className="space-y-8">
            <div>
              <h3 className="font-serif font-semibold text-brand-navy text-[22px] leading-snug tracking-tight mb-2">Our mission</h3>
              <p className={bodyText}>
                To provide high-quality, personalised education that empowers students to achieve academic success,
                build confidence, and develop a genuine love for learning.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-semibold text-brand-navy text-[22px] leading-snug tracking-tight mb-2">Our vision</h3>
              <p className={bodyText}>
                To be the leading learning centre known for transforming students' academic journeys, fostering lifelong
                learners, and making quality education accessible to all.
              </p>
            </div>
          </div>
        </StorySection>

        <StorySection title="Lighting a fire">
          <figure>
            <blockquote className="font-serif italic text-brand-navy text-[26px] md:text-[32px] leading-[1.3] tracking-tight">
              “Education is not the filling of a pail, but the lighting of a fire.”
            </blockquote>
            <figcaption className="mt-4 text-base text-brand-muted">William Butler Yeats</figcaption>
          </figure>
          <p className={`mt-8 ${bodyText}`}>
            At Studywise, we believe this quote captures the essence of meaningful education. Our goal isn't simply to
            fill students with facts and formulas, but to ignite curiosity, build genuine understanding, and inspire a
            passion for learning. We focus on helping students develop confidence and critical thinking skills that
            extend far beyond the classroom, empowering them to become independent, enthusiastic learners.
          </p>
        </StorySection>

        <StorySection title="The Studywise difference">
          <LabelledList items={differences} />
        </StorySection>

        <StorySection title="How we work with each student">
          <LabelledList items={steps} numbered />
        </StorySection>

        <StorySection title="Our values">
          <LabelledList items={values} />
        </StorySection>

        <WhyStudywise />

        <Testimonials
          featuredName="Shehbaaz Sandhu"
          supportingNames={[]}
          image="/2.jpeg"
          imageAlt="The hall at the Studywise Clyde North centre"
          imagePosition="object-center"
        />

        <AssessmentCTA />
      </main>
      <Footer />
    </div>
  );
}
