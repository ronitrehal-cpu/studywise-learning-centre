import { useNavigate } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
}

function LightCrest({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 116" aria-hidden="true" width={size} height={size * 1.16} className="flex-shrink-0">
      <path d="M50 4 L92 16 V58 C92 86 72 104 50 112 C28 104 8 86 8 58 V16 Z" fill="#17325C" />
      <circle cx="50" cy="44" r="19" fill="#6FB3E0" />
      <circle cx="50" cy="44" r="7" fill="#E8692C" />
      <path d="M50 96 V68 M50 75 L41 65 M50 73 L59 63" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DarkCrest({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 116" aria-hidden="true" width={size} height={size * 1.16} className="flex-shrink-0">
      <path d="M50 4 L92 16 V58 C92 86 72 104 50 112 C28 104 8 86 8 58 V16 Z" fill="none" stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="50" cy="44" r="18" fill="none" stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="50" cy="44" r="7" fill="#E8692C" />
      <path d="M50 96 V68 M50 75 L41 65 M50 73 L59 63" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ variant = 'light', size = 40, className = '' }: LogoProps) {
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
      {isDark ? <DarkCrest size={size} /> : <LightCrest size={size} />}
      <span className="flex flex-col justify-center leading-none">
        <span className={`font-serif font-semibold text-2xl tracking-tight ${isDark ? 'text-white' : 'text-brand-navy'}`}>
          Studywise
        </span>
        <span
          className={`font-sans font-semibold text-[9.5px] uppercase tracking-[0.3em] mt-1 ${
            isDark ? 'text-[#B9D7EE]' : 'text-brand-muted'
          }`}
        >
          Learning Centre
        </span>
      </span>
    </a>
  );
}
