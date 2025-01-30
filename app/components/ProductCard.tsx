import { Product } from '@/types/declarations';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FavsButton from './FavsButton';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  return (
    <div className="w-full aspect-[3/4] relative">
      <FavsButton
        product={product}
        className="absolute z-[4] top-2 right-2"
        // showText
      />
      <Link
        href={`/products/${product.id}`}
        key={product.id}
        className={`w-full aspect-[3/4] overflow-hidden fade-in grid grid-cols-1 grid-rows-1 relative group ${className}`}>
        <div className="w-full col-span-1 row-span-1 z-[1]">
          <Image
            src={product.images[1]}
            alt={`bag bar | ${product.name}`}
            width={1000}
            height={1000}
            className="w-full aspect-[3/4] group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-[2] transparent-gradient pointer-events-none"></div>
        <div className="col-span-1 row-span-1 p-2 z-[3]">
          <h4 className="">{product.name}</h4>
          <div className="w-full flex justify-between items-center">
            <p className="capitalize ml-2 pl-2 border-l-4 border-accent">
              ksh {product.price.toLocaleString()}
            </p>
            <MoveRight strokeWidth={1} width={32} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
