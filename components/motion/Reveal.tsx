"use client";
import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

export interface RevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: 'sm' | 'md' | 'lg';
  duration?: 'fast' | 'base' | 'slow' | 'slower';
  easing?: 'standard' | 'enter' | 'exit' | 'emphasized';
  delay?: 'none' | 'short' | 'medium';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}

export const Reveal = ({
  children,
  direction = 'up',
  distance = 'md',
  duration = 'base',
  easing = 'standard',
  delay = 'none',
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  className,
}: RevealProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold, rootMargin, triggerOnce });
  const prefersReducedMotion = useReducedMotion();

  const getTransform = () => {
    if (prefersReducedMotion) return 'translate3d(0,0,0)';
    if (isIntersecting) return 'translate3d(0,0,0)';
    switch (direction) {
      case 'up': return `translate3d(0, var(--motion-distance-${distance}), 0)`;
      case 'down': return `translate3d(0, calc(-1 * var(--motion-distance-${distance})), 0)`;
      case 'left': return `translate3d(var(--motion-distance-${distance}), 0, 0)`;
      case 'right': return `translate3d(calc(-1 * var(--motion-distance-${distance})), 0, 0)`;
      case 'none': return 'translate3d(0,0,0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isIntersecting ? 1 : 0,
    transform: getTransform(),
    transitionDuration: prefersReducedMotion ? '0ms' : `var(--motion-duration-${duration})`,
    transitionTimingFunction: `var(--motion-ease-${easing})`,
    transitionDelay: prefersReducedMotion ? '0ms' : `var(--motion-delay-${delay})`,
    transitionProperty: 'opacity, transform',
    willChange: isIntersecting ? 'auto' : 'opacity, transform',
  };

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={style} className={cn('block', className)}>
      {children}
    </div>
  );
};
