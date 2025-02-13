// types/declarations.d.ts

export interface Product{
  id: string;
  name: string;
  price: number;
  images: string[];
  description?: string
  stock?: number;
}

export interface Order {
  id?: string;
  user_id: string;
  total: number;
  status: string;
  invoice_id: string;
  created_at?: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem{
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}