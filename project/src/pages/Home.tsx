import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { TrustStrip } from '../components/TrustStrip';
import { Programs } from '../components/Programs';
import { Subjects } from '../components/Subjects';
import { HowWeTeach } from '../components/HowWeTeach';
import { WhyStudywise } from '../components/WhyStudywise';
import { Testimonials } from '../components/Testimonials';
import { Locations } from '../components/Locations';
import { AssessmentCTA } from '../components/AssessmentCTA';
import { EnrollmentForm } from '../components/EnrollmentForm';
import { FAQPreview } from '../components/FAQPreview';
import { Footer } from '../components/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <TrustStrip />
        <Programs />
        <Subjects />
        <HowWeTeach />
        <div id="why-us" className="scroll-mt-[5.5rem]">
          <WhyStudywise />
        </div>
        <Testimonials />
        <div id="faqs" className="scroll-mt-[5.5rem]">
          <FAQPreview />
        </div>
        <Locations id="locations" />
        <AssessmentCTA />
        <EnrollmentForm />
      </main>
      <Footer />
    </div>
  );
}
