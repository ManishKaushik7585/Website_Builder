import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/utils/cn';

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: 'default' | 'subtle' | 'button';
  isExternal?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'default', isExternal, className, children, ...props }, ref) => {
    const isExternalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <NextLink
        ref={ref}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm',
          variant === 'default' && 'text-[var(--color-text-secondary)] hover:underline',
          variant === 'subtle' && 'text-[var(--color-text-primary)] hover:opacity-80',
          className
        )}
        {...isExternalProps}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);
Link.displayName = 'Link';
