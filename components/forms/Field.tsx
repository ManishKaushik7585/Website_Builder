import React from 'react';
import { Label } from './Label';
import { Stack } from '../layout/Stack';
import { Text } from '../typography/Text';

export interface FieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const Field = ({ id, label, description, error, children, className }: FieldProps) => {
  return (
    <Stack gap="sm" className={className}>
      <Label htmlFor={id}>{label}</Label>
      {description && <Text variant="small" className="text-gray-500" id={`${id}-description`}>{description}</Text>}
      {children}
      {error && <Text className="text-red-500 font-medium text-sm" id={`${id}-error`}>{error}</Text>}
    </Stack>
  );
};
