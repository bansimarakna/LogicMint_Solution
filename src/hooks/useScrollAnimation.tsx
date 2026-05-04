import { useEffect, useRef } from 'react';

/**
 * Hook for triggering animations on scroll
 * Plays animation when element enters viewport
 * Reverses animation when element leaves viewport
 */
export const useScrollAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element enters viewport - add animation
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          // Element leaves viewport - reset animation
          entry.target.classList.remove('animate-in');
          entry.target.classList.add('animate-out');
        }
      },
      {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return elementRef;
};

/**
 * Hook for parallax scroll effect
 * Creates a depth effect by moving elements at different speeds
 */
export const useParallax = (offset = 50) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrollY = window.scrollY;
        elementRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return elementRef;
};

/**
 * Hook for staggered animations on multiple children
 * Each child animates with a slight delay
 */
export const useStaggerAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('[data-animate-child]');
          children.forEach((child, index) => {
            (child as HTMLElement).style.setProperty('--stagger-index', String(index));
            (child as HTMLElement).classList.add('stagger-animate-in');
            (child as HTMLElement).classList.remove('stagger-animate-out');
          });
        } else {
          const children = entry.target.querySelectorAll('[data-animate-child]');
          children.forEach((child) => {
            (child as HTMLElement).classList.remove('stagger-animate-in');
            (child as HTMLElement).classList.add('stagger-animate-out');
          });
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return containerRef;
};
