"use client";
import React, { useState } from 'react';
import { Inline } from '../../layout/Inline';
import { Label } from '../../forms/Label';
import { cn } from '@/utils/cn';

export interface ToggleProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle = ({ id, label, defaultChecked = false, onChange }: ToggleProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newState = !checked;
    setChecked(newState);
    onChange?.(newState);
  };

  return (
    <Inline gap="sm" align="center">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          checked ? "bg-[var(--color-text-secondary)]" : "bg-gray-300"
        )}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      <Label htmlFor={id} className="cursor-pointer" onClick={handleToggle}>{label}</Label>
    </Inline>
  );
};
