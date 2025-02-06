'use client';
import { Product } from '@/types/declarations';
import { ShoppingCart } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useShop } from '@/context/ShopContext';
import { useToast } from '@/context/toast-context';
import { useAuth } from '@/context/AuthContext';

interface CartButtonProps {
  className?: string;
  product: Product;
  showText?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({
  className,
  product,
  showText = false,
}) => {
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const { cart, addToCart, removeFromCart } = useShop();
  const [loading, setLoading] = useState(false);
  const cartItem = cart.find(item => item.product.id === product.id)
  const isInCart = Boolean(cartItem)

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      showToast('Please login to manage cart', 'error')
      return
    }

    setLoading(true);
    try {
      if (isInCart) {
        await removeFromCart(product.id)
        showToast('Removed from cart', 'success')
      } else {
        await addToCart(product.id)
        showToast('Added to cart', 'success')
      }
    } catch (error) {
      showToast('Failed to update cart', 'error')
      console.error('Cart error:', error)
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, isInCart, product.id, addToCart, removeFromCart, showToast])

  return (
    <button
      className={`flex items-center justify-center gap-4 *:text-background py-2 ${
        showText 
          ? "px-4 rounded-none bg-accent md:hover:gap-6" 
          : "px-2 rounded-full bg-foreground md:hover:bg-foreground-light md:hover:*:fill-accent md:hover:*:stroke-accent"
      } ${className} transition-all duration-300 relative`}
      onClick={handleClick}
      aria-label={loading ? 'Processing...' : isInCart ? 'Remove from cart' : 'Add to cart'}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg 
            className="animate-spin h-5 w-5 text-background" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <ShoppingCart
            size={16}
            className={`${
              isInCart ? 'fill-foreground stroke-foreground' : 'fill-transparent stroke-background'
            } transition-all duration-300`}
          />
          {showText && (
            <p className="text-nowrap transition-all duration-300">
              {isInCart ? `Added to Cart (${cartItem?.quantity})` : 'Add to Cart'}
            </p>
          )}
        </>
      )}
    </button>
  );
};

export default CartButton;