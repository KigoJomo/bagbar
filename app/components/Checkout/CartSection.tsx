'use client';

import { useShop } from '@/context/ShopContext';
import { FC } from 'react';
import CtaBanner from '../CtaBanner';
import { CartItem } from '../CartView';

const CartSection: FC = () => {
  const { cart, updateCartQuantity, removeFromCart, updatingCart } = useShop();
  console.log(cart);

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
