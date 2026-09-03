import React from 'react';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Button } from '../../ui/Button';
import { Price } from './Price';
import { MediaFrame } from '../../media/MediaFrame';
import { AspectRatio } from '../../media/AspectRatio';

export interface ProductCardProps {
  image: React.ReactNode;
  title: string;
  description: string;
  price: number;
}

export const ProductCard = ({ image, title, description, price }: ProductCardProps) => (
  <Stack gap="md" className="group">
    <MediaFrame radius="lg" className="bg-gray-100">
      <AspectRatio ratio={1}>{image}</AspectRatio>
    </MediaFrame>
    <Stack gap="sm">
      <Heading level={3} size={5}>{title}</Heading>
      <Text variant="muted" className="line-clamp-2">{description}</Text>
    </Stack>
    <Stack gap="sm" align="start">
      <Price amount={price} />
      <Button variant="secondary" size="sm">Add to Cart</Button>
    </Stack>
  </Stack>
);
