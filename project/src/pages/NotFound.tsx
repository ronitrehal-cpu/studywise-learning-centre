import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1 pt-[var(--header-full)]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20 py-24 md:py-36">
          <h1 className="font-serif font-medium text-brand-navy text-5xl md:text-[72px] leading-[1.02] tracking-[-0.02em]">
            Page not found
          </h1>
          <p className="mt-6 text-lg md:text-[22px] leading-[1.6] text-brand-slate max-w-[720px]">
            The page you're looking for has moved or doesn't exist.
          </p>
          <Button variant="primary" className="mt-10" onClick={() => navigate('/')}>
            Back to home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
