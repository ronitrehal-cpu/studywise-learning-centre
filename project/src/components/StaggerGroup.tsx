import { useEffect, useRef, ReactNode, Children, cloneElement, isValidElement } from 'react';

interface StaggerGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerGroup({
  children,
  staggerDelay = 0.1,
  className = ''
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !ref.current) {
      return;
    }

    const childElements = ref.current.children;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            Array.from(childElements).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('reveal-visible');
              }, index * staggerDelay * 1000);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [staggerDelay]);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            style: {
              ...((child.props as any).style || {}),
              opacity: prefersReducedMotion ? 1 : 0,
              transform: prefersReducedMotion ? 'none' : 'translateY(20px)',
              transition: prefersReducedMotion
                ? 'none'
                : 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          } as any);
        }
        return child;
      })}
    </div>
  );
}
