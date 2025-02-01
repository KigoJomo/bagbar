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
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      showToast('Please login to save favorites', 'error')
      return
    }

    try {
      await toggleFavorite(product)
      showToast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        'success'
      )
    } catch (error) {
      showToast('Failed to update favorites', 'error')
      console.error('Favorites error:', error)
    }
  }, [isLoggedIn, isFavorite, product, toggleFavorite, showToast])

  return (
    <button
      className={`flex items-center justify-center gap-4 *:text-background py-2 ${
        showText
          ? 'px-4 rounded-none bg-foreground md:hover:bg-foreground-light'
          : 'px-2 rounded-full bg-black/10 backdrop-blur-3xl shadow-2xl md:hover:*:fill-accent md:hover:*:stroke-accent'
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
