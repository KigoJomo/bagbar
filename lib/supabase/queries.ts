// lib/supabase/queries.ts

import { supabase } from "./client";

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(4);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const getRandomProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name')
    .limit(4);

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

interface Order {
  user_id: string;
  total: number;
  status: string; // e.g., 'pending', 'completed'
}

interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export const createNewOrder = async (order: Order, items: OrderItem[]) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select('*')
    .single();

  if (orderError) throw orderError;

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(items.map(item => ({
      ...item,
      order_id: orderData.id,
    })));

  if (itemsError) throw itemsError;

  // Clear cart
  await supabase
    .from('carts')
    .delete()
    .eq('user_id', order.user_id);

  return orderData;
};