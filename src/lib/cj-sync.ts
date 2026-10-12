/**
 * CJ Dropshipping Catalog Synchronization Engine
 * Automatically fetches real product data, photos, SKUs, and pricing from CJ OpenAPI
 */

import { getCjProductDetail, searchCjProducts } from './cj-client.ts';
import type { CjProductDetail } from './cj-client.ts';
import type { Product } from '../types/product.ts';
import fs from 'fs';
import path from 'path';

export interface CjProductMapping {
  id: string;
  cj_pid: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  badge: string;
  laser_type: string;
  recommended_power: string;
  fallback_image?: string;
}

/**
 * Curated list of laser maker blanks linked to authentic CJ Dropshipping products
 */
export const CJ_PRODUCT_MAPPINGS: CjProductMapping[] = [
  // 1. Metal & Aluminum
  {
    id: 'prod_metal_cards_100',
    cj_pid: 'F6F054F3-9440-4FCE-9844-31512596B2CC',
    category_id: 'cat_metal',
    name: 'Anodized Aluminum Metal Business Cards (Pack of 100)',
    slug: 'anodized-aluminum-metal-business-cards-100',
    description: 'High-precision 0.22mm matte anodized aluminum cards. Delivers razor-sharp silver contrast when engraved with Diode, Fiber, or CO2 lasers. Rounded safety corners, burr-free edges.',
    badge: 'Bestseller',
    laser_type: 'Diode / Fiber / CO2',
    recommended_power: '10W+ (Speed 3000mm/min, Power 40%)',
    fallback_image: '/products/metal_cards.jpg',
  },
  {
    id: 'prod_pet_tags_50',
    cj_pid: '2096841637189410817',
    category_id: 'cat_metal',
    name: 'Stainless Steel Dog Tag & Pendant Blanks (50-Pack)',
    slug: 'stainless-steel-dog-tag-pendant-blanks-50pack',
    description: 'Mirror-polished surgical grade stainless steel tags with pre-drilled holes. Impervious to rust and scratches. Ideal for dark annealing marks or fiber deep engraving.',
    badge: 'High Profit',
    laser_type: 'Fiber / Diode / Infrared',
    recommended_power: '10W Diode (Speed 1200mm/min, 90% Power)',
    fallback_image: '/products/pet_tags.jpg',
  },
  {
    id: 'prod_metal_wallet_clip',
    cj_pid: '1669613206655995904',
    category_id: 'cat_metal',
    name: 'Slim Metal Card Holder & Smart Wallet Blanks (10-Pack)',
    slug: 'slim-metal-card-holder-smart-wallet-blanks-10pack',
    description: 'Minimalist spring-steel and aircraft aluminum smart wallet blanks. Smooth bead-blasted surface designed for laser personalized logos and initials.',
    badge: 'Trending',
    laser_type: 'Fiber / Diode',
    recommended_power: 'Speed 2000mm/min, Power 50%',
    fallback_image: '/products/money_clips.jpg',
  },
  {
    id: 'prod_stainless_flasks_5',
    cj_pid: 'FD6C2E42-A8F9-4772-B5F8-4660D972FF85',
    category_id: 'cat_metal',
    name: 'Matte Stainless Steel Pocket Flagon & Flasks (5-Pack, 6oz/8oz)',
    slug: 'matte-stainless-steel-pocket-flagon-flasks-5pack',
    description: 'Laser-grade matte black and brushed stainless steel hip flasks with leak-proof screw caps. Top choice for wedding parties, groomsmen gifts, and personalized merchandise.',
    badge: 'Top Gift',
    laser_type: 'Fiber / Diode (Coated)',
    recommended_power: 'Diode 10W (Speed 2500mm/min, Power 45%)',
    fallback_image: '/products/flasks.jpg',
  },

  // 2. Drinkware & Tumblers
  {
    id: 'prod_skinny_tumblers_8',
    cj_pid: '1854038925204410368',
    category_id: 'cat_drinkware',
    name: 'Straight Skinny Stainless Tumblers with Straw (20oz, 8-Pack)',
    slug: 'straight-skinny-stainless-tumblers-with-straw-20oz-8pack',
    description: 'Completely straight double-wall vacuum insulated blank tumblers without taper. Specifically engineered for seamless rotary laser engraving and sublimation.',
    badge: 'Rotary Ready',
    laser_type: 'Diode 10W+ / CO2 / Fiber',
    recommended_power: 'Rotary Speed 2400mm/min, Power 50%',
    fallback_image: '/products/skinny_tumblers.jpg',
  },
  {
    id: 'prod_ceramic_coffee_mugs',
    cj_pid: '1416372412932558848',
    category_id: 'cat_drinkware',
    name: 'Premium Ceramic Coffee Mug Blanks (11oz/15oz, 6-Pack)',
    slug: 'premium-ceramic-coffee-mug-blanks-6pack',
    description: 'Specially coated high-density ceramic mugs designed for high-contrast laser etching and sublimation. Dishwasher and microwave safe.',
    badge: 'High Contrast',
    laser_type: 'CO2 / Diode 20W+ / Fiber',
    recommended_power: 'Speed 1200mm/min, Power 85%',
    fallback_image: '/products/ceramic_mugs.jpg',
  },
  {
    id: 'prod_rotary_roller_jig',
    cj_pid: 'D2FF4A4C-6FA2-4A8D-86D6-B5D8D3C1B4F5',
    category_id: 'cat_accessories',
    name: 'Universal Laser Rotary Roller Attachment with Adjustable Leveler',
    slug: 'universal-laser-rotary-roller-attachment',
    description: 'Plug-and-play Y-axis rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. Engrave cylinders from 5mm to 150mm diameter effortlessly.',
    badge: 'Maker Must-Have',
    laser_type: 'Universal Diode & CO2',
    recommended_power: 'Standard Motor Driver Cable Included',
    fallback_image: '/products/rotary_roller.jpg',
  },

  // 3. Wood & Natural Slate
  {
    id: 'prod_wood_craft_plywood',
    cj_pid: '2507310855531621100',
    category_id: 'cat_wood',
    name: 'Premium Laser Craft Plywood Sheets (3mm, 15-Pack, 300x300mm)',
    slug: 'premium-laser-craft-plywood-sheets-3mm-15pack',
    description: 'A-grade Baltic and French style craft plywood sheets. Minimal internal voids, non-toxic exterior grade glue formulation ensuring charred-free laser cuts.',
    badge: 'Zero Void',
    laser_type: 'CO2 / Diode (All Wattages)',
    recommended_power: '10W Diode (Cut 4mm/s 100% 2-pass)',
    fallback_image: '/products/basswood_sheets.jpg',
  },
  {
    id: 'prod_stoneware_wood_coasters',
    cj_pid: '2505191146161626100',
    category_id: 'cat_wood',
    name: 'Solid Hardwood & Stoneware Coaster Blanks (12-Pack)',
    slug: 'solid-hardwood-stoneware-coaster-blanks-12pack',
    description: 'Hand-finished solid wood and absorbent stoneware drink coasters. Flat sanded ready for laser pyrography, personal monograms, and wedding favors.',
    badge: 'Natural Wood',
    laser_type: 'Diode / CO2',
    recommended_power: 'Diode 5W+ (Speed 3500mm/min, Power 35%)',
    fallback_image: '/products/wood_coasters.jpg',
  },

  // 4. Leather & Travel
  {
    id: 'prod_passport_holders_10',
    cj_pid: '1BA30466-381C-44A5-8A86-8A2DFDF29A4C',
    category_id: 'cat_leather',
    name: 'RFID-Blocking Leatherette Passport Holder Covers (10-Pack)',
    slug: 'rfid-blocking-leatherette-passport-holder-covers-10pack',
    description: 'Slim travel passport covers with internal card slots and built-in RFID shielding. Engrave travel maps, quotes, and names effortlessly.',
    badge: 'Travel Trend',
    laser_type: 'Diode / CO2',
    recommended_power: 'Speed 3000mm/min, Power 25%',
    fallback_image: '/products/passport_holder.jpg',
  },
  {
    id: 'prod_leather_keychains_25',
    cj_pid: '1430828670343319552',
    category_id: 'cat_leather',
    name: 'Handcrafted Premium Leatherette Keychains with Heavy Duty Rivet (25-Pack)',
    slug: 'handcrafted-premium-leatherette-keychains-25pack',
    description: 'Durable PU leatherette key fobs fitted with antique bronze split rings. High contrast char when engraved with 450nm blue diode or CO2 lasers.',
    badge: 'Quick Engrave',
    laser_type: 'Diode / CO2 / Fiber',
    recommended_power: '5W Diode (Speed 2500mm/min, Power 30%)',
    fallback_image: '/products/leather_keychains.jpg',
  },
  {
    id: 'prod_vintage_leather_keyrings',
    cj_pid: '1570305352606953472',
    category_id: 'cat_leather',
    name: 'Vintage Braided Leather Keyring Blanks with Alloy Clip (20-Pack)',
    slug: 'vintage-braided-leather-keyring-blanks-20pack',
    description: 'Supple braided leather keychains with quick-release zinc alloy clasps. Elegant luxury aesthetic for laser etched brand tags.',
    badge: 'Luxury Feel',
    laser_type: 'Diode / CO2',
    recommended_power: 'Speed 2800mm/min, Power 25%',
    fallback_image: '/products/luggage_tags.jpg',
  },

  // 5. Acrylic & LED Lamps
  {
    id: 'prod_led_night_light_bases',
    cj_pid: '22A95739-E5F1-4D94-8288-3EFF67AB64CF',
    category_id: 'cat_acrylic',
    name: 'Solid Wood LED Night Light Bases with USB Cable & Switch (5-Pack)',
    slug: 'solid-wood-led-night-light-bases-with-usb-cable-switch-5pack',
    description: 'Warm white / RGB illuminated natural beech bases with 5mm precision slot for laser engraved acrylic sheets. Powered by standard USB.',
    badge: 'Top Selling',
    laser_type: 'Universal Slot Size',
    recommended_power: 'Fits 3mm - 4mm Acrylic Panels',
    fallback_image: '/products/led_base.jpg',
  },
  {
    id: 'prod_crystal_flower_led_light',
    cj_pid: '1759800388972187648',
    category_id: 'cat_acrylic',
    name: 'Crystal Glass Ball & Acrylic LED Display Base Night Light',
    slug: 'crystal-glass-ball-acrylic-led-display-base-night-light',
    description: 'Illuminated solid wooden pedestal stand with optical acrylic/crystal display. Stunning 3D lighting effect for custom maker engravings.',
    badge: 'New Arrival',
    laser_type: 'CO2 / Diode',
    recommended_power: '3D Laser Sub-surface or Surface Etch',
    fallback_image: '/products/acrylic_sheets.jpg',
  },

  // 6. Jewelry & Keepsakes
  {
    id: 'prod_rainbow_dog_tag_necklace',
    cj_pid: '2406100213401621400',
    category_id: 'cat_jewelry',
    name: 'Rainbow Titanium & Stainless Steel Dog Tag Necklaces (20-Pack)',
    slug: 'rainbow-titanium-stainless-steel-dog-tag-necklaces-20pack',
    description: 'Eye-catching dual-layer iridescent titanium stainless steel pendant blanks. Mirror polished surface produces vivid laser markings.',
    badge: 'Vibrant Finish',
    laser_type: 'Fiber / Diode 10W+',
    recommended_power: 'Speed 1000mm/min, Power 95%',
    fallback_image: '/products/bar_necklaces.jpg',
  },
  {
    id: 'prod_punk_stainless_necklaces',
    cj_pid: 'E936CC77-8C7A-4B28-B3FD-E427E4093347',
    category_id: 'cat_jewelry',
    name: 'Geometric Stainless Steel Bar & Plate Necklaces (15-Pack)',
    slug: 'geometric-stainless-steel-bar-plate-necklaces-15pack',
    description: 'Heavy duty 316L hypoallergenic surgical stainless steel geometric blank pendants with rolo chains. Polished and scratch resistant.',
    badge: 'Jeweler Grade',
    laser_type: 'Fiber / Diode / Infrared 1064nm',
    recommended_power: 'Fiber 20W (Speed 1500mm/min, 60kHz)',
    fallback_image: '/products/charm_bracelets.jpg',
  },
];

/**
 * Calculates retail price based on CJ wholesale price with ~50% gross margin + buffer
 */
export function calculateRetailPrice(cjPriceString: string): { cost_price: number; price: number; compare_at_price: number } {
  // Parse price string, which can be "3.35" or "1.94 -- 3.37"
  let cost = 5.00;
  if (cjPriceString) {
    const parts = cjPriceString.split('--').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (parts.length > 0) {
      // Use average if range
      cost = parts.reduce((a, b) => a + b, 0) / parts.length;
    }
  }

  // Margin calculation: ~50% gross margin + shipping buffer
  const cost_price = Math.round(cost * 100) / 100;
  // If wholesale is $3.35 -> retail is approx €10.99
  const price = Math.round((cost_price * 2.0 + 3.99) * 100) / 100;
  const compare_at_price = Math.round((price * 1.45) * 100) / 100;

  return { cost_price, price, compare_at_price };
}

/**
 * Synchronize full catalog by querying CJ Dropshipping API
 */
export async function syncCatalogFromCj(): Promise<{ totalSynced: number; products: Product[] }> {
  const syncedProducts: Product[] = [];

  for (const mapping of CJ_PRODUCT_MAPPINGS) {
    try {
      const detail = await getCjProductDetail(mapping.cj_pid);
      if (detail) {
        const { cost_price, price, compare_at_price } = calculateRetailPrice(detail.sellPrice);

        // Collect authentic CJ images (filtered and deduplicated)
        const cjImages: string[] = [];
        if (detail.productImage && detail.productImage.startsWith('http')) {
          cjImages.push(detail.productImage);
        }
        if (Array.isArray(detail.productImageSet)) {
          for (const img of detail.productImageSet) {
            if (img && img.startsWith('http') && !cjImages.includes(img)) {
              cjImages.push(img);
            }
          }
        }

        // If no CJ images returned, use fallback image
        const images = cjImages.length > 0 ? cjImages.slice(0, 4) : [mapping.fallback_image || '/products/metal_cards.jpg'];

        syncedProducts.push({
          id: mapping.id,
          cj_pid: mapping.cj_pid,
          name: mapping.name,
          slug: mapping.slug,
          category_id: mapping.category_id,
          description: mapping.description,
          price,
          compare_at_price,
          cost_price,
          supplier_sku: detail.productSku || `CJ-${mapping.cj_pid.slice(0, 8)}`,
          badge: mapping.badge,
          laser_type: mapping.laser_type,
          recommended_power: mapping.recommended_power,
          images,
        });
      }
    } catch (err) {
      console.error(`Failed to sync product ${mapping.id} (${mapping.cj_pid}):`, err);
    }
  }

  return { totalSynced: syncedProducts.length, products: syncedProducts };
}
