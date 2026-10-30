import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-sans font-semibold transition-colors duration-200 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-navy text-white rounded hover:bg-brand-navyDark',
    secondary: 'bg-transparent text-brand-navy underline underline-offset-[6px] hover:text-brand-navyDark',
    outline: 'border border-brand-navy text-brand-navy rounded hover:bg-brand-mist'
  };

  // The secondary variant is a text link, so it gets no box padding
  const sizes = {
    sm: variant === 'secondary' ? 'text-sm' : 'px-5 py-3 text-sm',
    md: variant === 'secondary' ? 'text-base' : 'px-7 py-4 text-base',
    lg: variant === 'secondary' ? 'text-lg' : 'px-7 py-4 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
