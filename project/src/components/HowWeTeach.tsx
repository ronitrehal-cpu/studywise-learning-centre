import { Section } from './Section';
import { Card } from './Card';
import { Target, Users, UserCheck, Building, GraduationCap, CalendarCheck } from 'lucide-react';

export function HowWeTeach() {
  return (
    <Section background="accent">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How We Teach
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A structured, in-centre approach designed to maximise student success
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-white to-stone-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-sky-100 rounded-xl p-3">
              <Target className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Small Group Learning</h3>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Individual attention in every session</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Strong engagement and accountability</span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Tailored support for each student</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-white to-stone-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 rounded-xl p-3">
              <Building className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Structured, In-Centre Learning</h3>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Distraction-free classroom environment</span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Face-to-face support from experienced tutors</span>
            </li>
            <li className="flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Consistent routines for better results</span>
            </li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}
