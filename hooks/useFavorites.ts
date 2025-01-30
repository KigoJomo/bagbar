'use client';

import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function useFavorites(userId: string) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId);

      setFavorites(data?.map((item) => item.product_id) || []);
    };

    if (userId) fetchFavorites();
  }, [userId]);

  const toggleFavorite = async (productId: string) => {
    if (!userId) return;

    if (favorites.includes(productId)) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: userId, product_id: productId });
    }

    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return { favorites, toggleFavorite }
}
