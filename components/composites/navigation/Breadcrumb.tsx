import React from 'react';
import { Inline } from '../../layout/Inline';
import { Link } from '../../ui/Link';
import { Text } from '../../typography/Text';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="Breadcrumb">
    <Inline as="ol" gap="sm" align="center">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Inline as="li" gap="sm" align="center" key={index}>
            {isLast || !item.href ? (
              <Text variant="small" className="font-semibold" aria-current="page">{item.label}</Text>
            ) : (
              <Link href={item.href} variant="subtle" className="text-sm">{item.label}</Link>
            )}
            {!isLast && <span aria-hidden="true" className="text-gray-400 text-sm">/</span>}
          </Inline>
        );
      })}
    </Inline>
  </nav>
);
