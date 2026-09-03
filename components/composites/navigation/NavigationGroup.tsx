import React from 'react';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';

export interface NavigationGroupProps {
  title: string;
  children: React.ReactNode;
}

export const NavigationGroup = ({ title, children }: NavigationGroupProps) => (
  <Stack gap="md" as="nav" aria-label={title}>
    <Heading level={4} size={6} className="text-gray-500 uppercase tracking-wider">{title}</Heading>
    <Stack gap="sm" as="ul">
      {React.Children.map(children, child => (
        <li className="list-none">{child}</li>
      ))}
    </Stack>
  </Stack>
);
