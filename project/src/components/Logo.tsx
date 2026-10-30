import { useNavigate } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  /** Crest height in px */
  size?: number;
  subline?: string;
  className?: string;
}

// Real crest, trimmed from public/final-studywise-logo.jpg by `npm run brand-assets` (211 x 224 px)
const CREST_SRC = '/studywise-crest.png';
const CREST_RATIO = 211 / 224;

function Crest({ size, onDark }: { size: number; onDark: boolean }) {
  const img = (
    <img
      src={CREST_SRC}
      alt="Studywise Learning Centre crest"
      width={Math.round(size * CREST_RATIO)}
      height={size}
      className="block flex-shrink-0"
      style={{ width: Math.round(size * CREST_RATIO), height: size }}
    />
  );

  // The crest has a white background, so on navy it sits on a small white backing
  return onDark ? <span className="flex-shrink-0 rounded-md bg-white p-1.5">{img}</span> : img;
}

export function Logo({ variant = 'light', size = 52, subline = 'Learning Centre', className = '' }: LogoProps) {
  const navigate = useNavigate();
  const isDark = variant === 'dark';

  return (
    <a
      href="/"
      aria-label="Studywise Learning Centre home"
      className={`inline-flex items-center gap-3 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <Crest size={size} onDark={isDark} />
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-serif font-semibold text-2xl tracking-tight ${isDark ? 'text-white' : 'text-brand-navy'}`}>
          Studywise
        </span>
        <span
          className={`font-sans font-semibold text-[9.5px] uppercase tracking-[0.3em] mt-1 ${
            isDark ? 'text-[#B9D7EE]' : 'text-brand-muted'
          }`}
        >
          {subline}
        </span>
      </span>
    </a>
  );
}
