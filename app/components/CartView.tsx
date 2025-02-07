'use client';
import { useShop } from '@/context/ShopContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import CtaButton from './CtaButton';
import { Product } from '@/types/declarations';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

interface CartViewProps {
  className?: string;
  onClose: () => void;
}

const CartView: React.FC<CartViewProps> = ({ className, onClose }) => {
  const { isLoggedIn } = useAuth();
  const { cart, updateCartQuantity, removeFromCart, updatingCart } = useShop();

  const router = useRouter();

  // Calculate total price
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!isLoggedIn) {
    return (
      <div className={`p-4 ${className}`}>
        <h3 className="">Shopping Cart</h3>
        <p className="text-center py-8">Please log in to view your cart</p>
      </div>
    );
  }

  const proceedToCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <div className={`w-full h-[90%] flex flex-col gap-4 ${className}`}>
      <h4 className="capitalize">Shopping Cart ({cart.length})</h4>

      <hr className="border-foreground-faded" />

      {cart.length === 0 ? (
        <p className="text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="w-full h-full overflow-y-scroll flex flex-col gap-4 pb-4 scrollbar-hidden">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onClose={onClose}
                onUpdate={(newQty) =>
                  updateCartQuantity(item.product.id, newQty)
                }
                onRemove={() => removeFromCart(item.product.id)}
                upDatingCart={updatingCart}
              />
            ))}
          </div>

          <div className="border-t border-foreground-faded pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-medium">Ksh {total.toLocaleString()}</span>
            </div>

            <CtaButton label="Proceed to Checkout" className="w-full" onClick={proceedToCheckout} />
          </div>
        </>
      )}
    </div>
  );
};

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
      <div className="w-1/4 aspect-[3/4] overflow-hidden">
        <Image
          src={item.product.images[1]}
          alt={`${item.product.name} image`}
          width={200}
          height={300}
          className="w-full aspect-[9/16] md:aspect-[3/4] group-hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="w-3/4 aspect-[9/4] flex flex-col justify-between">
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

export default CartView;

export { CartItem };