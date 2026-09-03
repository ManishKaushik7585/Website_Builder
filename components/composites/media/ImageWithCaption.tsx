import React from 'react';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { MediaFrame } from '../../media/MediaFrame';

export interface ImageWithCaptionProps {
  image: React.ReactNode;
  caption: string;
}

export const ImageWithCaption = ({ image, caption }: ImageWithCaptionProps) => (
  <Stack gap="sm" as="figure" className="m-0">
    <MediaFrame radius="md">{image}</MediaFrame>
    <Text as="figcaption" variant="small" className="text-gray-500" align="center">{caption}</Text>
  </Stack>
);
