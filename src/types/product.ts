export interface Product {
  id: string;
  name: string;
  name_i18n?: Record<string, string>;
  slug: string;
  category_id: string;
  description: string;
  description_i18n?: Record<string, string>;
  price: number; // in EUR
  compare_at_price?: number;
  cost_price: number;
  supplier_sku: string;
  cj_pid?: string;
  aliexpress_product_id?: string;
  aliexpress_sku?: string;
  badge?: string;
  laser_type: string;
  recommended_power: string;
  images: string[];
  full_description?: string;
  full_description_i18n?: Record<string, string>;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
