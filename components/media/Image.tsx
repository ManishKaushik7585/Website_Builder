import React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/utils/cn';

export interface ImageProps extends NextImageProps {
  fallbackSrc?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <NextImage
        ref={ref}
        alt={alt}
        className={cn('object-cover', className)}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';
