import React from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variantMap = {
  primary: 'bg-[var(--color-text-primary)] text-[var(--color-background-primary)] hover:opacity-90',
  secondary: 'bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-gray-200',
  tertiary: 'bg-transparent border border-gray-300 text-[var(--color-text-primary)] hover:bg-gray-50',
  ghost: 'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeMap = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-button)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
