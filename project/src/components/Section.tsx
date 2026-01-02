import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'accent';
  id?: string;
}

export function Section({ children, className = '', background = 'white', id }: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    light: 'bg-stone-50',
    accent: 'bg-sky-50'
  };

  return (
    <section id={id} className={`py-16 ${backgrounds[background]} ${className}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
