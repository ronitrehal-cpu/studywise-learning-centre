import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { Programs } from '../components/Programs';
import { Subjects } from '../components/Subjects';
import { OnlineVsInPerson } from '../components/OnlineVsInPerson';
import { WhyStudywise } from '../components/WhyStudywise';
import { Testimonials } from '../components/Testimonials';
import { Locations } from '../components/Locations';
import { AssessmentCTA } from '../components/AssessmentCTA';
import { EnrollmentForm } from '../components/EnrollmentForm';
import { Footer } from '../components/Footer';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <Programs />
        <Subjects />
        <OnlineVsInPerson />
        <div id="why-studywise">
          <WhyStudywise />
        </div>
        <Testimonials />
        <Locations id="locations" />
        <AssessmentCTA />
        <EnrollmentForm />
      </main>
      <Footer />
    </div>
  );
}
