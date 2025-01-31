export interface Product{
  id: string;
  name: string;
  price: number;
  images: string[];
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
  updated_at: string;
}