// app/components/admin/AdminProductGrid.tsx

import { Product } from "@/types/declarations";
import Image from "next/image";
import Link from "next/link";

interface AdminProductCardProps {
  product: Product;
  className?: string;
}

const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, className }) => {
  return (
    <div className={`w-full aspect-[3/4] relative ${className}`}>
      <Link
        href={`/admin/products/${product.id}`}
        key={product.id}
        className={`w-full aspect-[3/4] overflow-hidden fade-in grid grid-cols-1 grid-rows-1 relative group`}>
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
          <h4 className="product-card-title">{product.name}</h4>
          <div className="w-full flex justify-between items-center">
            <p className="product-card-price capitalize ml-2 pl-2 border-l-4 border-accent">
              ksh {product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdminProductCard;