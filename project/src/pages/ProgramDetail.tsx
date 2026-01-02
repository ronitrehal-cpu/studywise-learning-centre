import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { getProgramBySlug } from '../data/programData';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { Card } from '../components/Card';

export function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const program = getProgramBySlug(slug || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Card className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Return Home
          </Button>
        </Card>
      </div>
    );
  }

  const Icon = program.icon;

  const scrollToEnrollment = () => {
    navigate('/', { state: { scrollTo: 'enrollment' } });
  };

  const scrollToLocations = () => {
    navigate('/', { state: { scrollTo: 'locations' } });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
              <img
                src="/560d161f-ee6e-4de0-819e-db29e949995a.png"
                alt="Studywise Learning Centre"
                className="h-16 w-16 object-contain"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[1.425rem] md:text-[1.78125rem] font-bold text-gray-900">Studywise</span>
                <span className="text-[10px] md:text-xs font-normal tracking-[0.2em] text-gray-500 uppercase mt-0.5">Learning Centre</span>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <section className="bg-gradient-to-br from-stone-50 to-stone-100 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <button
              onClick={() => navigate('/', { state: { scrollTo: 'programs' } })}
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </button>

            <div className="flex items-start gap-6 mb-6">
              <div className="bg-sky-100 rounded-xl p-4">
                <Icon className="w-12 h-12 text-blue-700" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {program.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Section background="white">
          <div className="max-w-4xl mx-auto space-y-12">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who It's For</h2>
              <ul className="space-y-3">
                {program.whoItsFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Focus Areas</h2>
              <div className="flex flex-wrap gap-3">
                {program.focusAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-sky-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
              <ul className="space-y-3">
                {program.howItWorks.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Locations & Times</h2>
              <p className="text-gray-700 mb-4">
                We offer this program at both our Cranbourne West and Clyde North locations.
                Class times vary by location and age group.
              </p>
              <Button variant="outline" onClick={scrollToLocations}>
                View Locations & Contact Details
              </Button>
            </Card>
          </div>
        </Section>

        <Section background="accent">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-700 to-blue-800 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-sky-50 text-lg mb-8 max-w-2xl mx-auto">
                Enrol now to secure your place, or book a free assessment to discover your child's learning potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" onClick={scrollToEnrollment}>
                  Enrol Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToLocations}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700"
                >
                  Contact Us
                </Button>
              </div>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
}
