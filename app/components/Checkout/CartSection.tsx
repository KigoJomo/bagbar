'use client';

import { useShop } from '@/context/ShopContext';
import { FC } from 'react';
import CtaBanner from '../CtaBanner';
import CtaButton from '../CtaButton';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/declarations';

const CartSection: FC = () => {
  const { cart, updateCartQuantity, removeFromCart, updatingCart } = useShop();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart w-full">
      {cart.length === 0 ? (
        <div className="w-full flex flex-col items-center gap-4">
          <p>Your cart is empty!</p>
          <CtaBanner text="Let's add something." link="/products" />
        </div>
      ) : (
        <>
          <h4 className="uppercase text-foreground-light italic mb-4">
            your cart ({cart.length})
          </h4>

          <div className="w-full md:max-h-[60vh] overflow-y-scroll scrollbar-custom md:pr-4 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.product.id} className="">
                <CartItem
                  item={item}
                  onUpdate={(newQty) =>
                    updateCartQuantity(item.product.id, newQty)
                  }
                  onRemove={() => removeFromCart(item.product.id)}
                  upDatingCart={updatingCart}
                />
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-between pt-8">
            <p className="font-bold uppercase">total</p>
            <span className="font-medium text-accent">Ksh {total.toLocaleString()}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSection;



interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
  onClose?: () => void;
  onUpdate: (newQuantity: number) => void;
  onRemove: () => void;
  upDatingCart: boolean;
}

const CartItem: FC<CartItemProps> = ({
  item,
  onClose,
  onUpdate,
  upDatingCart,
}) => {
  return (
    <div className="w-full group flex gap-2 pb-4 border-b border-foreground-faded">
      <div className="w-1/4 aspect-[3/4] md:aspect-square overflow-hidden">
        <Image
          src={item.product.images[1]}
          alt={`${item.product.name} image`}
          width={200}
          height={300}
          className="w-full aspect-[9/16] md:aspect-square group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="w-3/4 aspect-[9/4] md:aspect-[3/1] flex flex-col justify-between">
        <h5 className="capitalize font-semibold truncate">{item.product.name}</h5>

        <div className="flex items-center justify-between">
          <p className="italic">
            Ksh {(item.product.price * item.quantity).toLocaleString()}
          </p>

          <div className="quantity-update-buttons flex items-center gap-2">
            <button
              onClick={() => onUpdate(item.quantity - 1)}
              className={`px-2 border rounded-none md:hover:bg-foreground-faded ${
                upDatingCart && 'cursor-not-allowed opacity-25'
              }`}
              disabled={upDatingCart}>
              -
            </button>
            {upDatingCart ? (
              <div className="w-4 h-4 rounded-full border-t-2 border-l-2 border-b-2 border-r-2 border-foreground border-r-transparent animate-spin"></div>
            ) : (
              <>
                <span>{item.quantity}</span>
              </>
            )}

            <button
              onClick={() => onUpdate(item.quantity + 1)}
              className={`px-2 border rounded-none md:hover:bg-foreground-faded ${
                upDatingCart && 'cursor-not-allowed opacity-25'
              }`}
              disabled={upDatingCart}>
              +
            </button>
          </div>
        </div>

        <Link href={`/products/${item.product.id}`} onClick={onClose}>
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