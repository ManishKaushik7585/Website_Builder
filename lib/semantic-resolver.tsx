import React, { ReactNode } from 'react';
import { isSemanticText, isSemanticAsset, isSemanticCollection, isSemanticAction, SemanticAsset } from '@/config/semantic-content';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { MediaSlot } from '@/components/media/MediaSlot';
import { AssetConfig } from '@/config/assets';

function resolveTextContent(item: any): string {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (isSemanticText(item)) return item.content;
  return '';
}

export function resolveSemanticNode(item: any): ReactNode {
  if (!item) return null;
  if (React.isValidElement(item)) return item;
  
  if (isSemanticText(item)) {
    if (item.role === 'heading') return <Heading>{item.content}</Heading>;
    if (item.role === 'eyebrow') return <Text variant="small" className="uppercase tracking-widest text-gray-500">{item.content}</Text>;
    if (item.role === 'caption' || item.role === 'metadata') return <Text variant="small" className="text-gray-500">{item.content}</Text>;
    if (item.role === 'quote') return <Text variant="large" className="italic border-l-4 border-gray-300 pl-4 py-2">{item.content}</Text>;
    if (item.role === 'manifesto') return <Heading level={2} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">{item.content}</Heading>;
    // Default body
    return <Text>{item.content}</Text>;
  }
  
  if (isSemanticAsset(item)) {
    const assetConfig: AssetConfig = {
      id: `asset-${Math.random().toString(36).substring(7)}`,
      type: item.type as any,
      role: 'feature',
      src: item.src,
      alt: item.alt || item.subject,
      decorative: item.dominance === 'minimal',
      priority: item.priority === 'eager',
      position: item.focalPoint || 'center',
      fit: item.treatment === 'contained' ? 'contain' : 'cover',
    };
    
    // We wrap it in a relative container so Next Image 'fill' works correctly if needed.
    // If the compositional primitive provides its own styling, this div expands to fill it.
    return (
      <div className="w-full h-full relative min-h-[300px]" data-semantic="asset">
        <MediaSlot asset={assetConfig} className="w-full h-full absolute inset-0" />
      </div>
    );
  }

  if (isSemanticAction(item)) {
    return (
      <a href={item.href || '#'} className={`inline-block px-6 py-3 rounded-md font-medium transition-colors ${
        item.variant === 'primary' ? 'bg-black text-white hover:bg-gray-800' :
        item.variant === 'secondary' ? 'bg-gray-100 text-black hover:bg-gray-200' :
        item.variant === 'outline' ? 'border-2 border-black text-black hover:bg-gray-50' :
        'text-black hover:underline'
      }`}>
        {item.label}
      </a>
    );
  }

  if (isSemanticCollection(item)) {
    return (
      <div className="flex flex-col gap-4">
        {item.items.map((subItem, idx) => (
          <React.Fragment key={idx}>{resolveSemanticNode(subItem)}</React.Fragment>
        ))}
      </div>
    );
  }

  // Fallback for strings
  if (typeof item === 'string') {
    return <Text>{item}</Text>;
  }

  // Fallback for arrays
  if (Array.isArray(item)) {
    return item.map((subItem, idx) => (
      <React.Fragment key={idx}>{resolveSemanticNode(subItem)}</React.Fragment>
    ));
  }

  return null;
}

export function resolveEntityList(items: any[]): ReactNode[] {
  if (!items || !Array.isArray(items)) return [];
  return items.map(item => resolveSemanticNode(item)).filter(Boolean);
}

// Section Adapters: Mapping JSON props to Component-ready props
export const sectionAdapters: Record<string, (props: any) => any> = {
  hero: (props) => ({
    ...props,
    title: resolveTextContent(props.title),
    description: resolveTextContent(props.description),
    eyebrow: resolveTextContent(props.eyebrow),
    media: props.media ? resolveSemanticNode(props.media) : undefined,
    actions: props.actions ? resolveSemanticNode(props.actions) : undefined,
  }),
  features: (props) => ({
    ...props,
    title: resolveTextContent(props.title),
    description: resolveTextContent(props.description),
    items: props.items ? resolveEntityList(props.items) : undefined,
  }),
  socialProof: (props) => ({
    ...props,
    logos: props.logos ? resolveSemanticNode(props.logos) : undefined,
    testimonials: props.testimonials ? resolveSemanticNode(props.testimonials) : undefined,
  }),
  manifesto: (props) => ({
    ...props,
    content: props.content ? resolveSemanticNode(props.content) : undefined,
  }),
  gallery: (props) => ({
    ...props,
    title: resolveTextContent(props.title),
    items: props.items ? resolveEntityList(props.items) : undefined,
  }),
  editorial: (props) => ({
    ...props,
    primary: props.primary ? resolveSemanticNode(props.primary) : undefined,
    supporting: props.supporting ? resolveSemanticNode(props.supporting) : undefined,
  }),
  metrics: (props) => ({
    ...props,
    title: resolveTextContent(props.title),
    // Metrics expects {value: string, label: string}[], which is serializable, but if they use semantic entities we need to resolve inner strings
    metrics: Array.isArray(props.metrics) ? props.metrics.map((m: any) => ({
      value: resolveTextContent(m.value) || m.value,
      label: resolveTextContent(m.label) || m.label,
    })) : [],
  }),
  mediaNarrative: (props) => ({
    ...props,
    media: props.media ? resolveSemanticNode(props.media) : undefined,
    content: props.content ? resolveSemanticNode(props.content) : undefined,
  }),
};

export function resolveSectionProps(sectionType: string, props: any): any {
  const adapter = sectionAdapters[sectionType];
  if (adapter) {
    return adapter(props);
  }
  // If no specific adapter exists, just return the props (or we could default to recursively parsing)
  // Per rule: The resolver must know what each section expects.
  // We'll pass through unknown sections to avoid breaking legacy code.
  return props;
}
