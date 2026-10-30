import { Award, Users, BookOpen, Target, Shield } from 'lucide-react';

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
    icon: Target,
    text: 'Small Group Learning'
  },
  {
    icon: Shield,
    text: 'Safe, Supportive Learning Spaces'
  }
];

export function TrustStrip() {
  return (
    <section className="bg-white py-12 border-y border-brand-rule">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center gap-3">
                <Icon className="w-6 h-6 text-brand-navy" strokeWidth={1.5} />
                <p className="text-sm font-medium text-brand-slate">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
