import { Section } from './Section';
import { Calculator, BookText, FlaskConical, Brain } from 'lucide-react';

const subjects = [
  {
    icon: Calculator,
    name: 'Maths',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: BookText,
    name: 'English',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: FlaskConical,
    name: 'Science',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Brain,
    name: 'Reasoning',
    description: 'Verbal & Numerical',
    color: 'bg-amber-100 text-amber-600'
  }
];

export function Subjects() {
  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Subjects We Teach
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert instruction across core curriculum subjects
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {subjects.map((subject, index) => {
          const Icon = subject.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <div className={`${subject.color} rounded-2xl p-6 w-24 h-24 flex items-center justify-center`}>
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">{subject.name}</p>
                {subject.description && (
                  <p className="text-sm text-gray-600">{subject.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
