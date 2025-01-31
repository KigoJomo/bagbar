'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    if (!userId) return

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('product_id')
        .eq('user_id', userId)

      if (!error) {
        setFavorites(data.map(item => item.product_id))
      }
    }

    fetchFavorites()

    const channel = supabase.channel('realtime-favorites')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'favorites'
      }, () => {
        fetchFavorites()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const toggleFavorite = async (productId: string) => {
    if (!userId) return

    try {
      if (favorites.includes(productId)) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .match({ user_id: userId, product_id: productId })
        
        if (!error) {
          setFavorites(prev => prev.filter(id => id !== productId))
        }
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: userId, product_id: productId })
        
        if (!error) {
          setFavorites(prev => [...prev, productId])
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return { favorites, toggleFavorite }
}