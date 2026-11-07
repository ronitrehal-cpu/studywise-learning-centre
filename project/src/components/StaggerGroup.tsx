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

    if (!ref.current) return;
    const childElements = ref.current.children;

    if (prefersReducedMotion) {
      Array.from(childElements).forEach((child) => {
        (child as HTMLElement).style.transition = 'none';
        child.classList.add('reveal-visible');
      });
      return;
    }

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

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            style: {
              ...((child.props as any).style || {}),
              // The same at build time and in the browser, so the pre-rendered HTML matches.
              // Reduced motion is applied by the effect above.
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          } as any);
        }
        return child;
      })}
    </div>
  );
}
