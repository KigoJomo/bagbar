'use client';
import { useAuth } from '@/context/AuthContext';
import { useShop } from '@/context/ShopContext';
import { useToast } from '@/context/toast-context';
import { Product } from '@/types/declarations';
import { Heart } from 'lucide-react';
import React, { useCallback } from 'react';

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
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const { favorites, toggleFavorite } = useShop()
  const isFavorite = favorites.includes(product.id)

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      showToast('Please login to save favorites', 'error')
      return
    }

    try {
      await toggleFavorite(product.id)
      showToast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        'success'
      )
    } catch (error) {
      showToast('Failed to update favorites', 'error')
      console.error('Favorites error:', error)
    }
  }, [isLoggedIn, isFavorite, product.id, toggleFavorite, showToast])

  return (
    <button
      className={`flex items-center justify-center gap-4 bg-foreground *:text-background py-2 ${
        showText
          ? 'px-4 rounded-none hover:bg-foreground-light'
          : 'px-2 rounded-full hover:*:fill-accent hover:*:stroke-accent'
      } ${className} cursor-pointer transition-all duration-300`}
      onClick={handleClick}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
      <Heart
        size={16}
        className={`${
          isFavorite
            ? 'fill-accent stroke-accent'
            : 'fill-transparent stroke-background'
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
