
import React from 'react';
import Image from 'next/image';
import { assetRegistry } from '@/registry/assets';
import { AssetConfig } from '@/config/assets';

export interface MediaSlotProps {
  asset?: string | AssetConfig;
  role?: string;
  children?: React.ReactNode;
  className?: string;
}

export const MediaSlot: React.FC<MediaSlotProps> = ({ asset, role, children, className }) => {
  let config: AssetConfig | undefined;
  
  if (typeof asset === 'string') {
    config = assetRegistry[asset];
    if (!config) {
      console.warn(`[AssetRegistry] Unknown asset "${asset}". Falling back safely.`);
      return <div className="hidden" aria-hidden="true" />;
    }
  } else if (asset) {
    config = asset;
  }

  // If explicit children are passed (e.g. custom SVG, Canvas, or arbitrary JSX), render them
  if (children) {
    return <div className={className} data-role={role ?? config?.role}>{children}</div>;
  }

  // If no config and no children, nothing to render
  if (!config) {
    return null;
  }

  // Basic rendering logic based on MediaType
  const fitClass = config.fit ? `object-${config.fit}` : 'object-cover';
  
  // Use explicit focal point if provided, otherwise fallback to position or center
  let objectPosition = 'center';
  if (config.focalPoint) {
    objectPosition = `${config.focalPoint.x}% ${config.focalPoint.y}%`;
  } else if (config.position) {
    objectPosition = config.position;
  }

  if (config.type === 'image' && config.src) {
    return (
      <Image 
        src={config.src} 
        alt={config.decorative ? '' : (config.alt || '')}
        fill
        className={`${fitClass} ${className || ''}`}
        style={{ objectPosition }}
        aria-hidden={config.decorative}
        priority={config.priority}
      />
    );
  }

  // Default fallback for other types that rely on custom rendering in the parent
  return <div className={`w-full h-full bg-gray-100 flex items-center justify-center ${className || ''}`} data-asset-id={config.id}>[${config.type}]</div>;
};
