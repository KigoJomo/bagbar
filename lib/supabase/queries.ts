import { supabase } from "./client";

// lib/supabase/queries.ts
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