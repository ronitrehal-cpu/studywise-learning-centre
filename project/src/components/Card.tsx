import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

// Flat, ruled block. `hover` is kept for API compatibility and no longer adds an effect.
export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border-t border-brand-rule pt-6 ${className}`}>
      {children}
    </div>
  );
}
