import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function StudentPortal() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1 pt-[5.5rem]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-24 md:py-36">
          <h1 className="font-serif font-medium text-brand-navy text-5xl md:text-[72px] leading-[1.02] tracking-[-0.02em]">
            Student portal
          </h1>
          <p className="mt-6 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
            The Studywise student portal is coming soon.
          </p>
          <Link
            to="/"
            className="inline-block mt-10 text-base font-semibold text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
