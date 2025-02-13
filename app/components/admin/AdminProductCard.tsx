// app/components/admin/AdminProductCard.tsx
'use client';

import { useViewPreference } from '@/context/ViewPreferenceContext';
import { Product } from '@/types/declarations';
import Image from 'next/image';
import Link from 'next/link';

interface AdminProductCardProps {
  product: Product;
  className?: string;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({
  product,
  className,
}) => {
  const { viewType } = useViewPreference();

  if (viewType === 'list') {
    return (
      <div
        className={`flex items-center p-2 md:border-b border-foreground-faded  md:bg-transparent hover:bg-foreground-faded fade-in transition-all duration-300 ${className}`}>
        <Link
          href={`/admin/products/${product.id}`}
          className={`w-full flex items-center gap-4 group`}>
          <div className="w-full md:w-[57%] flex items-center gap-4">
            <Image
              src={product.images[0]}
              alt={`bag bar | ${product.name}`}
              width={500}
              height={500}
              className="w-24 md:w-12 h-24 md:h-12 flex-shrink-0"
            />
            <h4 className="hidden md:flex group-hover:text-accent transition-all duration-300">
              {product.name}
            </h4>

            <div className="w-full flex md:hidden flex-col gap-4">
              <h4 className="group-hover:text-accent transition-all duration-300">
                {product.name}
              </h4>
              <div className="flex gap-1">
                <p className="w-1/2 text-sm">
                  {product.stock} Units
                </p>
                <p className="text-sm">Ksh {product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <p className="w-44 text-sm hidden md:flex">
            Ksh {product.price.toLocaleString()}
          </p>

          <p className="w-32 text-sm hidden md:flex">{product.stock} Units</p>

          <div className="hidden md:flex w-[10%]"></div>
        </Link>
      </div>
    );
  }

  // Default "grid" view
  return (
    <div
      className={`w-full aspect-[3/4] relative fade-in transition-all duration-300 ${className}`}>
      <Link
        href={`/admin/products/${product.id}`}
        className="w-full aspect-[3/4] overflow-hidden grid grid-cols-1 grid-rows-1 relative group">
        <div className="w-full col-span-1 row-span-1 z-[1]">
          <Image
            src={product.images[1] || product.images[0]}
            alt={`bag bar | ${product.name}`}
            width={1000}
            height={1000}
            className="w-full aspect-[3/4] group-hover:scale-105 transition-all duration-300"
          />
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-[2] transparent-gradient to-transparent pointer-events-none"></div>
        <div className="col-span-1 row-span-1 p-2 z-[3]">
          <h4 className="product-card-title">{product.name}</h4>
          <div className="w-full flex justify-between items-center">
            <p className="product-card-price pl-2 border-l-4 border-accent">
              Stock: {product.stock} Units
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminProductCard;
