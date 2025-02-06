import { Product } from '@/types/declarations';
import React from 'react';
import ProductCard from './ProductCard';

interface HorizontalGalleryProps {
  products: Product[];
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ products }) => {
  return (
    <div className="w-full flex flex-row gap-4 overflow-x-scroll scrollbar-hidden">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          className="max-w-[60vw] md:w-1/4 flex-shrink-0"
          product={product}
        />
      ))}
    </div>
  );
};

export default HorizontalGallery;
