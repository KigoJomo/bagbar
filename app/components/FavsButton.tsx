// components/FavsButton.tsx
'use client';

import { Product } from '@/types/declarations';
import { Heart } from 'lucide-react';
import React from 'react';

interface FavsButtonProps {
  className?: string;
  product: Product;
  showText?: boolean;
}

const FavsButton: React.FC<FavsButtonProps> = ({
  className,
  product,
  showText = false,
}) => {
  const toggleFavorite = (product: Product) => {
    console.log(`Toggling favorite for ${product.name}`);
  };
  const isFavorite = false;

  return (
    <button
      className={`flex items-center gap-4 bg-foreground *:text-background py-2 ${showText ? "px-4 rounded-none" : "px-2 rounded-full hover:*:fill-accent hover:*:stroke-accent"} ${className} transition-all duration-300`}
      onClick={() => toggleFavorite(product)}>
      <Heart
        size={16}
        className={`${
          isFavorite ? 'fill-accent stroke-accent' : 'fill-transparent stroke-background'
        } transition-all duration-300`}
      />
      {showText && (
        <p className="text-nowrap transition-all duration-300">
          {isFavorite ? 'Saved to favorites' : 'Add to favorites'}
        </p>
      )}
    </button>
  );
};

export default FavsButton;
