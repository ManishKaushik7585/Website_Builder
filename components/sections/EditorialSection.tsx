import React, { ReactNode } from 'react';
import { EditorialColumns } from '../composition/EditorialColumns';
import { Reveal } from '../motion/Reveal';

export interface EditorialSectionProps {
  primary: ReactNode; // Usually text/manifesto
  supporting: ReactNode; // Usually an image or smaller text
}

export function EditorialSection({ primary, supporting }: EditorialSectionProps) {
  return (
    <section className="py-24 w-full">
      <Reveal direction="up" duration="base" distance="md">
        <EditorialColumns primaryContent={primary} supportingContent={supporting} />
      </Reveal>
    </section>
  );
}
