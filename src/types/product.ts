export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  description: string;
  price: number; // in EUR
  compare_at_price?: number;
  cost_price: number;
  supplier_sku: string;
  cj_pid?: string;
  badge?: string;
  laser_type: string;
  recommended_power: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
