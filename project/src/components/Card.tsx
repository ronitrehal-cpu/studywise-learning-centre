import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
