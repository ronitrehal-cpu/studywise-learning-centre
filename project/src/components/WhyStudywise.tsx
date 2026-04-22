import { Section } from './Section';
import { Card } from './Card';
import { Button } from './Button';
import { GraduationCap, Heart, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const reasons = [
  {
    icon: GraduationCap,
    title: 'Experienced Educators',
    description: 'Our qualified teachers bring years of expertise and passion for student success.'
  },
  {
    icon: Heart,
    title: 'Personalised Learning',
    description: 'Tailored approach to meet each student\'s unique learning style and pace.'
  },
  {
    icon: BookOpen,
    title: 'High-Quality Resources',
    description: 'Comprehensive learning materials aligned with Australian curriculum standards.'
  },
  {
    icon: Target,
    title: 'Curriculum-Aligned',
    description: 'Programs designed to complement and enhance school-based learning.'
  },
  {
    icon: TrendingUp,
    title: 'Results-Focused',
    description: 'Building confidence and achieving measurable academic improvement.'
  }
];

export function WhyStudywise() {
  const navigate = useNavigate();

  return (
    <Section background="light">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Studywise?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            At Studywise Learning Centre, we're committed to helping every student reach their full potential through expert guidance, proven teaching methods, and a supportive learning environment.
          </p>

          <Button
            variant="outline"
            className="mb-8 w-full sm:w-auto"
            onClick={() => navigate('/about?from=whyus')}
          >
            Learn More About Studywise
          </Button>

          <div className="space-y-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="bg-sky-100 rounded-lg p-3 h-fit">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <Card className="bg-gradient-to-br from-sky-50 to-white">
            <img
              src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Students learning together"
              className="w-full h-auto rounded-lg mb-6"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-blue-700">20+</p>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-blue-700">2,000+</p>
                <p className="text-sm text-gray-600">Students Taught</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-blue-700">10,000+</p>
                <p className="text-sm text-gray-600">Hours of Teaching</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
