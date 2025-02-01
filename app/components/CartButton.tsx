'use client';
import { Product } from '@/types/declarations';
import { ShoppingCart } from 'lucide-react';
import React, { useCallback } from 'react';
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
  const cartItem = cart.find(item => item.product.id === product.id)
  const isInCart = Boolean(cartItem)

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      showToast('Please login to manage cart', 'error')
      return
    }

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
    }
  }, [isLoggedIn, isInCart, product.id, addToCart, removeFromCart, showToast])

  return (
    <button
      className={`flex items-center justify-center gap-4 *:text-background py-2 ${
        showText 
          ? "px-4 rounded-none bg-accent md:hover:gap-6" 
          : "px-2 rounded-full bg-foreground md:hover:bg-foreground-light md:hover:*:fill-accent md:hover:*:stroke-accent"
      } ${className} transition-all duration-300`}
      onClick={handleClick}
      aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
    >
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
    </button>
  );
};

export default CartButton;