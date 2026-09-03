import React from 'react';
import { Split } from './Split';

export interface EditorialMediaProps {
  content: React.ReactNode;
  media: React.ReactNode;
  imageLeft?: boolean;
}

export function EditorialMedia({ content, media, imageLeft = false }: EditorialMediaProps) {
  return (
    <Split
      ratio="5/7"
      content={imageLeft ? media : content}
      media={imageLeft ? content : media}
      reverseOnMobile
    />
  );
}
