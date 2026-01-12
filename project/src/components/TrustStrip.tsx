import { Award, Users, BookOpen, Globe, Shield } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    text: 'Free Maths & English Assessment'
  },
  {
    icon: Users,
    text: 'Highly Qualified Teachers'
  },
  {
    icon: BookOpen,
    text: 'Curriculum-Aligned Learning'
  },
  {
    icon: Globe,
    text: 'Online & In-Person Classes'
  },
  {
    icon: Shield,
    text: 'Safe, Supportive Learning Spaces'
  }
];

export function TrustStrip() {
  return (
    <section className="bg-white py-12 border-y border-gray-200">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <div className="bg-sky-100 rounded-full p-4">
                  <Icon className="w-6 h-6 text-blue-700" />
                </div>
                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
