import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Reveal } from './Reveal';

const subjects = ['Maths', 'English', 'Science', 'VCE', 'Selective Entry', 'Scholarship Exams'];

export function Hero() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const subject = subjects[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === subject) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % subjects.length);
      } else {
        setCurrentText(
          isDeleting
            ? subject.substring(0, currentText.length - 1)
            : subject.substring(0, currentText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting]);

  const scrollToEnrollment = () => {
    document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-stone-50 to-stone-100 pt-24 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4">
                <h1 className="text-[2.1375rem] md:text-[2.85rem] lg:text-[3.5625rem] font-bold text-gray-900 leading-tight">
                  Helping students succeed in{' '}
                  <span className="text-sky-500 inline-block min-w-[280px]">
                    {currentText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl">
                  Curriculum-aligned tutoring for Primary to VCE students — online and in-person.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" onClick={scrollToEnrollment}>
                  Book a Free Assessment
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToPrograms}>
                  View Programs
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} direction="left">
            <div className="relative lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/8500414/pexels-photo-8500414.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Student learning with tutor"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-start gap-3">
                  <div className="bg-sky-100 rounded-full p-3">
                    <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free Assessment</p>
                    <p className="text-sm text-gray-600">Maths & English evaluation</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
