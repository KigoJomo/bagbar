'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useAuth } from '@/context/AuthContext'
import { Product } from '@/types/declarations';

interface CartItem {
  product: Product; // Changed from product_id
  quantity: number;
}

interface ShopState {
  favorites: Product[]
  cart: CartItem[]
}

interface ShopContextType extends ShopState {
  toggleFavorite: (product: Product) => Promise<void>
  addToCart: (productId: string) => Promise<void>
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
}

const ShopContext = createContext<ShopContextType>({
  favorites: [],
  cart: [],
  toggleFavorite: async () => {},
  addToCart: async () => {},
  updateCartQuantity: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {}
})

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [state, setState] = useState<ShopState>({
    favorites: [],
    cart: []
  })

  // Favorites Management
  const fetchFavorites = useCallback(async () => {
    if (!user?.id) {
      setState(prev => ({ ...prev, favorites: [] }));
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          product_id,
          products:product_id (*)
        `)
        .eq('user_id', user.id);
  
      if (error) throw error;
  
      setState(prev => ({
        ...prev,
        favorites: data.map(item => item.products as unknown as Product)
      }));
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  }, [user?.id]);

  const toggleFavorite = useCallback(async (product: Product) => {
    if (!user?.id) return;
  
    try {
      if (state.favorites.some(fav => fav.id === product.id)) {
        await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, product_id: product.id });
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, product_id: product.id });
      }
      await fetchFavorites();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      throw error;
    }
  }, [user?.id, state.favorites, fetchFavorites]);

  // Cart Management
  const fetchCart = useCallback(async () => {
    if (!user?.id) {
      setState(prev => ({ ...prev, cart: [] }));
      return;
    }
  
    try {
      const { data, error } = await supabase
        .from('carts')
        .select(`
          quantity,
          products:product_id (*)
        `)
        .eq('user_id', user.id);
  
      if (error) throw error;
  
      setState(prev => ({
        ...prev,
        cart: data.map(item => ({
          product: item.products as unknown as Product,
          quantity: item.quantity
        }))
      }));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }, [user?.id]);
  

  const addToCart = useCallback(async (productId: string) => {
    if (!user?.id) return

    try {
      const { error } = await supabase
        .from('carts')
        .upsert(
          { 
            user_id: user.id, 
            product_id: productId, 
            quantity: 1 
          },
          { onConflict: 'user_id, product_id' }
        )

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }, [user?.id, fetchCart])

  const updateCartQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user?.id) return

    try {
      if (quantity < 1) {
        await removeFromCart(productId)
        return
      }

      const { error } = await supabase
        .from('carts')
        .update({ quantity })
        .match({ user_id: user.id, product_id: productId })

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error('Failed to update cart quantity:', error)
      throw error
    }
  }, [user?.id, fetchCart])

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user?.id) return

    try {
      const { error } = await supabase
        .from('carts')
        .delete()
        .match({ user_id: user.id, product_id: productId })

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error('Failed to remove from cart:', error)
      throw error
    }
  }, [user?.id, fetchCart])

  const clearCart = useCallback(async () => {
    if (!user?.id) return

    try {
      const { error } = await supabase
        .from('carts')
        .delete()
        .eq('user_id', user.id)

      if (error) throw error
      await fetchCart()
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }, [user?.id, fetchCart])

  // Real-time Subscriptions
  useEffect(() => {
    if (!user?.id) return

    const favoritesChannel = supabase.channel('favorites-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'favorites',
        filter: `user_id=eq.${user.id}`
      }, () => {
        console.log('Favorites updated')
        fetchFavorites()
      })
      .subscribe()

    const cartChannel = supabase.channel('cart-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'carts',
        filter: `user_id=eq.${user.id}`
      }, () => {
        console.log('Cart updated')
        fetchCart()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(favoritesChannel)
      supabase.removeChannel(cartChannel)
    }
  }, [user?.id, fetchFavorites, fetchCart])

  // Initial Data Fetch
  useEffect(() => {
    fetchFavorites()
    fetchCart()
  }, [fetchFavorites, fetchCart])

  return (
    <ShopContext.Provider
      value={{
        favorites: state.favorites,
        cart: state.cart,
        toggleFavorite,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider')
  }
  return context
}