import React from 'react';

type SectionBackground = 'white' | 'mist' | 'navy';

// Older values still used around the site; all render as mist
type LegacyBackground = 'light' | 'accent' | 'gradient' | 'gray';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: SectionBackground | LegacyBackground;
  id?: string;
}

const backgrounds: Record<SectionBackground | LegacyBackground, string> = {
  white: 'bg-white',
  mist: 'bg-brand-mist',
  navy: 'bg-brand-navy text-white',
  light: 'bg-brand-mist',
  accent: 'bg-brand-mist',
  gradient: 'bg-brand-mist',
  gray: 'bg-brand-mist'
};

export function Section({ children, className = '', background = 'white', id }: SectionProps) {
  return (
    <section id={id} className={`py-16 ${backgrounds[background]} ${id ? 'scroll-mt-[var(--header-anchor)]' : ''} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
