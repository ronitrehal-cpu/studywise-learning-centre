import { Section } from './Section';
import { Card } from './Card';
import { Monitor, Home, Clock, Users, MapPin, Building } from 'lucide-react';

export function OnlineVsInPerson() {
  return (
    <Section background="accent">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Learn Your Way
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the learning format that works best for your family
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="bg-gradient-to-br from-white to-stone-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-sky-100 rounded-xl p-3">
              <Monitor className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Online Tutoring</h3>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Flexible scheduling to fit your family's routine</span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Learn from the comfort of home</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Same qualified teachers and curriculum</span>
            </li>
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Interactive lessons with digital resources</span>
            </li>
          </ul>
        </Card>

        <Card className="bg-gradient-to-br from-white to-stone-50">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 rounded-xl p-3">
              <Building className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">In-Person Tutoring</h3>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Building className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Safe, comfortable classroom environments</span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Small group learning for better engagement</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Cranbourne West & Clyde North locations</span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">Face-to-face interaction with teachers</span>
            </li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}
