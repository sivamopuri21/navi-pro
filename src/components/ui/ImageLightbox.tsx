"use client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Props {
  images: string[];
  open: boolean;
  index?: number;
  onClose: () => void;
}

export function ImageLightbox({ images, open, index = 0, onClose }: Props) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images.map((src) => ({ src }))}
    />
  );
}
