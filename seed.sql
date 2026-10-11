-- Initial Seed Data for LaserSupply.org

INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
('cat_blanks', 'Laser Blanks', 'laser-blanks', 'Precision cut and prepared blanks ready for diode, CO2, and fiber lasers.'),
('cat_wood', 'Laser Wood & Sheets', 'laser-wood', 'Premium knot-free basswood and birch plywood engineered specifically for clean laser cutting.'),
('cat_metal', 'Metal & Anodized Cards', 'metal-blanks', 'Laser-safe coated and anodized metals for high-contrast fiber and diode marking.'),
('cat_bundles', 'Starter Bundles', 'starter-bundles', 'Curated material bundles with pre-tested laser power and speed settings.');

INSERT OR IGNORE INTO products (id, name, slug, category_id, description, price, compare_at_price, cost_price, supplier_sku, badge, laser_type, recommended_power, images) VALUES
(
  'prod_metal_cards_100',
  'Anodized Aluminum Metal Business Cards (Pack of 100)',
  'anodized-aluminum-metal-business-cards-100',
  'cat_metal',
  'High-precision 0.22mm matte black anodized aluminum cards. Delivers razor-sharp silver-white contrast when engraved with Diode, Fiber, or CO2 lasers. Rounded safety corners, 100% burr-free edges.',
  29.99,
  45.00,
  10.50,
  'CJ-BLANK-MET-01',
  'Bestseller',
  'Diode / Fiber / CO2',
  '10W+ (Speed 3000mm/m, Power 40%)',
  '["https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80"]'
),
(
  'prod_basswood_3mm_10',
  'Premium Grade 3mm Basswood Plywood Sheets (10-Pack, 300x300mm)',
  'premium-grade-3mm-basswood-sheets-10pack',
  'cat_wood',
  'Triple-inspected, warp-resistant basswood sheets with zero internal glue voids. Yields clean, burn-free cuts without scorching or sticky residue. Flatness guaranteed.',
  27.99,
  39.00,
  11.20,
  'CJ-BLANK-WD-02',
  'EU Stock',
  'Diode / CO2',
  '10W+ (Cut: 10W @ 250mm/m, 100% 1 pass)',
  '["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"]'
),
(
  'prod_tumbler_matte_black',
  'Laserable Matte Black Stainless Steel Tumbler (20oz / 600ml)',
  'laserable-matte-black-stainless-steel-tumbler-20oz',
  'cat_blanks',
  'Double-wall vacuum insulated food-grade stainless steel with ultra-durable powder coating. The coating removes crisply under laser for mirror-like stainless steel reveal. Fits standard rotary attachments.',
  24.99,
  34.99,
  8.90,
  'CJ-BLANK-TUMB-03',
  'Hot Margin',
  'Diode / Fiber / CO2',
  'Diode 10W+ Rotary (Speed 1800mm/m, 80% Power)',
  '["https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80"]'
),
(
  'prod_leather_keychains_20',
  'Full-Grain Genuine Leather Keychain Blanks (20-Pack with Brass Rings)',
  'full-grain-leather-keychain-blanks-20pack',
  'cat_blanks',
  'Pre-cut premium veg-tan leather tags ready for laser branding and cutting. Engraves with deep, crisp, dark contrast and authentic rustic aroma. Includes antique brass split rings.',
  21.99,
  32.00,
  6.80,
  'CJ-BLANK-LTH-04',
  'High Margin',
  'Diode / CO2',
  'Diode 5W+ (Speed 4000mm/m, 30% Power)',
  '["https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"]'
),
(
  'prod_honeycomb_bed_400',
  'Heavy-Duty Aluminum Honeycomb Laser Bed (400x400mm with Steel Backing)',
  'heavy-duty-aluminum-honeycomb-laser-bed-400x400',
  'cat_blanks',
  'Essential laser accessory for clean cuts. Quick heat dissipation and smoke evacuation prevents back-flash reflections and scorching on the underside of your work. Includes aluminum desktop protection plate.',
  59.99,
  85.00,
  24.50,
  'CJ-ACC-HNY-05',
  'Essential Tool',
  'Universal (xTool, Creality, Ortur, Atomstack)',
  'Compatible with all 300x300 - 400x400 diode frames',
  '["https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"]'
),
(
  'prod_starter_bundle',
  'Ultimate Laser Maker Pro Starter Box (135+ Mixed Blanks & Materials)',
  'ultimate-laser-maker-pro-starter-box',
  'cat_bundles',
  'The complete European maker launch pack: 100x Matte Black Metal Cards, 10x 3mm Basswood Sheets, 20x Leather Keychains, 5x Acrylic Test Plates + Printable LightBurn / LaserGRBL Settings Card.',
  69.99,
  110.00,
  26.00,
  'CJ-BNDL-START-06',
  'Best Value',
  'Diode / Fiber / CO2',
  'Includes Full Settings Cheatsheet for all wattages',
  '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"]'
);
