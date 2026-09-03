"use client";
import React, { useState } from 'react';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Box } from '../../layout/Box';

export interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ id, title, children }: AccordionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `${id}-content`;

  return (
    <Stack gap="none" className="border-b border-gray-200 last:border-b-0">
      <Heading level={3} size={5}>
        <button
          id={id}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {title}
          <span aria-hidden="true" className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ↓
          </span>
        </button>
      </Heading>
      <Box
        id={contentId}
        role="region"
        aria-labelledby={id}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </Box>
    </Stack>
  );
};
