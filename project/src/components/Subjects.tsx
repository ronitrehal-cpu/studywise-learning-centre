import { Section } from './Section';
import { Calculator, BookText, FlaskConical, Brain } from 'lucide-react';

const subjects = [
  {
    icon: Calculator,
    name: 'Maths',
    color: 'text-brand-navy'
  },
  {
    icon: BookText,
    name: 'English',
    color: 'text-brand-navy'
  },
  {
    icon: FlaskConical,
    name: 'Science',
    color: 'text-brand-navy'
  },
  {
    icon: Brain,
    name: 'Reasoning',
    description: 'Verbal & Numerical',
    color: 'text-brand-navy'
  }
];

export function Subjects() {
  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="font-serif font-medium text-brand-navy text-4xl md:text-[46px] tracking-tight mb-4">
          Our Subjects
        </h2>
        <p className="text-lg text-brand-slate max-w-2xl mx-auto">
          Expert instruction across core curriculum subjects
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <div className={`${subject.color} w-16 h-16 flex items-center justify-center`}>
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <p className="font-serif font-semibold text-brand-navy text-xl">{subject.name}</p>
                {subject.description && (
                  <p className="text-sm text-brand-muted">{subject.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
