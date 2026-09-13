'use client';

import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import { executeSafeViewTransition } from '@/utils/transitions';

export interface LinkProps extends NextLinkProps, Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
  variant?: 'default' | 'subtle' | 'button';
  isExternal?: boolean;
  enableViewTransition?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'default', isExternal, enableViewTransition = false, className, children, onClick, href, ...props }, ref) => {
    const router = useRouter();
    const isExternalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Respect explicitly passed onClick handlers
      if (onClick) {
        onClick(e);
      }

      // Do not intercept if default was prevented, or if it's an external link
      if (e.defaultPrevented || isExternal) return;

      // Do not intercept modified clicks (Ctrl, Cmd, Shift, Alt) so native browser tabs work
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      if (enableViewTransition && typeof href === 'string') {
        e.preventDefault();
        
        // Execute hardened transition wrapper
        executeSafeViewTransition(() => {
          router.push(href);
        });
      }
    };

    return (
      <NextLink
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm',
          variant === 'default' && 'text-slate-600 hover:underline',
          variant === 'subtle' && 'text-slate-900 hover:opacity-80',
          variant === 'button' && 'inline-flex items-center justify-center px-4 py-2 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors',
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
