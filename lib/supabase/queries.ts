// lib/supabase/queries.ts

import { Order, OrderItem } from "@/types/declarations";
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

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const createNewOrder = async (order: Order, items: OrderItem[]) => {
  console.log(`Creating new order for user ${order.user_id}...`);

  // 1. Insert the new order into the "orders" table.
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select('*')
    .single();

  if (orderError) {
    console.error("Error inserting order into 'orders' table:", orderError);
    throw new Error(`Order insertion failed: ${orderError.message}`);
  }

  console.log("Order created successfully with ID:", orderData.id);

  // 2. Prepare and insert the order items.
  const itemsToInsert = items.map(item => ({
    ...item,
    order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsToInsert);

  if (itemsError) {
    console.error("Error inserting order items into 'order_items' table:", itemsError);
    throw new Error(`Order items insertion failed: ${itemsError.message}`);
  }

  console.log("Order items created successfully for order ID:", orderData.id);

  // 3. Clear the user's cart once the order is successfully created.
  const { error: cartError } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', order.user_id);

  if (cartError) {
    console.error("Error clearing cart for user:", order.user_id, cartError);
    throw new Error(`Cart clearance failed: ${cartError.message}`);
  }

  console.log("Cart cleared successfully for user:", order.user_id);

  // 4. Update product stock for each order item.
  const updateStockPromises = items.map(async (item) => {
    // Fetch the current stock for the product.
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('stock')
      .eq('id', item.product_id)
      .single();
    if (productError) {
      console.error(`Error fetching product ${item.product_id} stock:`, productError);
      throw new Error(productError.message);
    }
    const currentStock = productData.stock || 0;
    const newStock = currentStock - item.quantity;
    // Ensure newStock is not negative.
    if (newStock < 0) {
      console.error(`Insufficient stock for product ${item.product_id}. Current stock: ${currentStock}, requested: ${item.quantity}`);
      throw new Error(`Insufficient stock for product ${item.product_id}`);
    }
    // Update the product's stock.
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', item.product_id);
    if (updateError) {
      console.error(`Error updating stock for product ${item.product_id}:`, updateError);
      throw new Error(updateError.message);
    }
    console.log(`Stock updated for product ${item.product_id}: ${currentStock} -> ${newStock}`);
  });

  await Promise.all(updateStockPromises);

  return orderData;
};

export const updateOrderStatus = async ({ invoice_id, status }: { invoice_id: string; status: string; }) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('invoice_id', invoice_id);

    if (error) {
      console.error(`Error updating order with invoice_id ${invoice_id}:`, error);
      throw error;
    }

    console.log(`Order with invoice_id ${invoice_id} updated successfully to status '${status}'`);
    return data;
  } catch (err) {
    console.error('updateOrderStatus encountered an error:', err);
    throw err;
  }
};

export const getUserOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching orders for user ${userId}:`, error);
    throw new Error(`Error fetching orders: ${error.message}`);
  }

  return data || [];
};

export const getOrderItems = async (orderId: string) => {
  const { data, error } = await supabase
    .from('order_items')
    .select(`
      *,
      product:products (
        id,
        name,
        price,
        images
      )
    `)
    .eq('order_id', orderId);

  if (error) {
    console.error(`Error fetching order items for order ${orderId}:`, error);
    throw new Error(`Error fetching order items: ${error.message}`);
  }

  return data || [];
};