import { Product } from '@/types/declarations';
import React from 'react';
import ProductCard from './ProductCard';

interface HorizontalGalleryProps {
  products: Product[];
}

const HorizontalGallery: React.FC<HorizontalGalleryProps> = ({ products }) => {
  return (
    <div className="w-full flex gap-4 overflow-x-scroll scrollbar-hidden">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          className="w-1/3 md:w-1/5"
          product={product}
        />
      ))}
    </div>
  );
};

export default HorizontalGallery;
