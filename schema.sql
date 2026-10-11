-- Cloudflare D1 Database Schema for LaserSupply.org

-- 1. Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL, -- in EUR (e.g. 29.99)
  compare_at_price REAL, -- regular price for strike-through discount
  cost_price REAL, -- CJ Dropshipping supplier cost
  supplier_sku TEXT, -- CJ SKU or ID
  supplier_url TEXT,
  in_stock INTEGER DEFAULT 1,
  badge TEXT, -- 'Bestseller', 'Hot', 'EU Stock'
  laser_type TEXT, -- 'Diode / CO2 / Fiber'
  recommended_power TEXT, -- e.g. '10W - 40W'
  images TEXT NOT NULL, -- JSON array of image URLs
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 3. Product Variants (e.g., Pack of 10, Pack of 50, Color options)
CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL, -- '100 pcs - Matte Black'
  sku TEXT NOT NULL,
  price REAL NOT NULL,
  inventory_quantity INTEGER DEFAULT 999,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 4. Customer Orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- Stripe Checkout Session ID or custom order #
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  shipping_address TEXT NOT NULL, -- JSON object
  total_amount REAL NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payment_status TEXT NOT NULL, -- 'paid', 'pending', 'failed'
  fulfillment_status TEXT DEFAULT 'unfulfilled', -- 'unfulfilled', 'sent_to_supplier', 'shipped'
  supplier_order_id TEXT, -- CJ Dropshipping Order Number
  tracking_number TEXT,
  tracking_url TEXT,
  items TEXT NOT NULL, -- JSON array of ordered items
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
