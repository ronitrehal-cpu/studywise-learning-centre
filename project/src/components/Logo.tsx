import { useNavigate } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  /** Crest height in px */
  size?: number;
  /** CSS height for the crest (e.g. a CSS variable); overrides size for display, size still sets the intrinsic dimensions */
  crestHeight?: string;
  subline?: string;
  className?: string;
}

// Real crest with a transparent background, made from public/final-studywise-logo.jpg by `npm run brand-assets`.
// The page uses small WebPs (240px tall up to an 80px display, 540px above that); every current browser
// supports WebP. public/studywise-crest.png (509 x 540) stays for anything that needs a PNG, such as the
// logo in structured data.
const CREST_RATIO = 509 / 540;
const crestWebp = (size: number) => (size <= 80 ? '/studywise-crest-240.webp' : '/studywise-crest-540.webp');

export function Crest({ size, cssHeight, className = '' }: { size: number; cssHeight?: string; className?: string }) {
  const width = Math.round(size * CREST_RATIO);
  return (
    <img
      src={crestWebp(size)}
      alt="Studywise Learning Centre crest"
      width={width}
      height={size}
      className={`block flex-shrink-0 ${className}`}
      style={cssHeight ? { height: cssHeight, width: 'auto' } : { width, height: size }}
    />
  );
}

export function Logo({ variant = 'light', size = 64, crestHeight, subline = 'Learning Centre', className = '' }: LogoProps) {
  const navigate = useNavigate();
  const isDark = variant === 'dark';

  return (
    <a
      href="/"
      aria-label="Studywise Learning Centre home"
      className={`inline-flex items-center gap-4 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <Crest size={size} cssHeight={crestHeight} className="transition-[height] duration-200 ease-out motion-reduce:transition-none" />
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
