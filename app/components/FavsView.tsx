'use client';
import { useShop } from '@/context/ShopContext';
import Image from 'next/image';
import React from 'react';
import { Product } from '@/types/declarations';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import FavsButton from './FavsButton';
import CtaButton from './CtaButton';

interface FavsViewProps {
  className?: string;
  onClose: () => void;
}

const FavsView: React.FC<FavsViewProps> = ({ className, onClose }) => {
  const { favorites } = useShop();

  return (
    <div className={`w-full h-[90%] flex flex-col gap-4 ${className}`}>
      <h4 className="capitalize">Favorites ({favorites.length})</h4>

      <hr className="border-foreground-faded" />

      {favorites.length === 0 ? (
        <p className="text-center py-8">Your favorites list is empty</p>
      ) : (
        <div className="w-full h-full overflow-y-scroll flex flex-col gap-4 pb-4 scrollbar-hidden">
          {favorites.map((product) => (
            <FavItem key={product.id} product={product} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
};

interface FavItemProps {
  product: Product;
  onClose: () => void;
}

const FavItem: React.FC<FavItemProps> = ({ product, onClose }) => {

  return (
    <div className="w-full group flex gap-2 pb-4 border-b border-foreground-faded">
      <div className="w-1/4 aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[1]}
          alt={product.name}
          width={200}
          height={200}
          className="w-full aspect-[9/16] md:aspect-[3/4] group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="w-3/4 aspect-[9/4] flex flex-col justify-between">
        <h5 className="capitalize font-semibold">{product.name}</h5>

        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center justify-between pr-6 relative">
            <p className="italic">Ksh {product.price.toLocaleString()}</p>
            <div className="absolute right-6 border bg-background px-2 aspect-square rounded-full flex items-center pointer-events-none z-[5]">
              <Trash2 size={16} />
            </div>
            <FavsButton product={product} className="z-[4]" />
          </div>
        </div>

        <Link href={`/products/${product.id}`} onClick={onClose}>
          <CtaButton
            label="view this item"
            secondary
            className="*:text-xs py-1"
          />
        </Link>
      </div>
    </div>
  );
};

export default FavsView;
