import { Section } from './Section';
import { Button } from './Button';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Comprehensive Maths & English assessment',
  'Identify strengths and areas for improvement',
  'Personalised learning recommendations',
  'No obligation or commitment required'
];

export function AssessmentCTA() {
  const scrollToEnrollment = () => {
    document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section background="accent">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start with a Free Assessment
              </h2>
              <p className="text-sky-50 text-lg mb-6">
                Discover your child's learning potential with our complimentary Maths and English assessment.
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sky-50">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToEnrollment}
              >
                Book Your Free Assessment
              </Button>
            </div>

            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Student taking assessment"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
