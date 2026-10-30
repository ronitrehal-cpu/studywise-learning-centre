import { Button } from './Button';
import { Reveal } from './Reveal';

const benefits = [
  'Comprehensive Maths & English assessment',
  'Identify strengths and areas for improvement',
  'Personalised learning recommendations',
  'No obligation or commitment required'
];

export function AssessmentCTA() {
  const scrollToEnrollment = () => {
    const form = document.getElementById('enrollment');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#enrollment';
    }
  };

  return (
    <section className="bg-brand-navy text-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
          <Reveal className="lg:col-span-6">
            <h2 className="font-serif font-medium text-white text-4xl md:text-[52px] leading-[1.05] tracking-tight">
              Start with a free assessment.
            </h2>
            <p className="mt-6 text-lg md:text-xl leading-[1.6] text-[#DCE6EF] max-w-xl">
              A relaxed Maths and English assessment that shows where your child is now, and where we'd start.
            </p>
          </Reveal>

          <Reveal className="lg:col-start-8 lg:col-span-5" delay={0.1}>
            <ul className="text-[17px] leading-[1.6] text-white">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className={`py-4 border-t border-white/15 ${index === benefits.length - 1 ? 'border-b' : ''}`}
                >
                  {benefit}
                </li>
              ))}
            </ul>
            <Button variant="inverse" onClick={scrollToEnrollment} className="mt-8 w-full sm:w-auto">
              Book a free assessment
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
