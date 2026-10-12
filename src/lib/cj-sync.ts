import { getCjProductDetail } from './cj-client';
import type { Product } from '../types/product';

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
}

/**
 * 14 pilnai patvirtintų lazerinių ruošinių ir maker prekių,
 * kurios 100% atitinka CJ tiekėją, turi realų CJ SKU ir CDN nuotraukas.
 */
export const VERIFIED_CJ_PRODUCTS: CjProductMapping[] = [
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
    recommended_power: '10W+ (Speed 3000mm/min, Power 40%)'
  },
  {
    id: 'prod_military_dogtags_50',
    cj_pid: '2096841637189410817',
    category_id: 'cat_metal',
    name: 'Stainless Steel Dog Tag & Pendant Blanks with Chains (50-Pack)',
    slug: 'stainless-steel-dog-tag-pendant-blanks-50pack',
    description: 'Mirror-polished surgical grade stainless steel tags with pre-drilled holes and bead chains. Impervious to rust and scratches. Ideal for dark annealing marks or fiber deep engraving.',
    badge: 'Bulk Pack',
    laser_type: 'Fiber / Diode / Infrared',
    recommended_power: '10W Diode (Speed 1200mm/min, 90% Power)'
  },
  {
    id: 'prod_metal_pocket_knife_5',
    cj_pid: '2507010822111607800',
    category_id: 'cat_metal',
    name: 'Laserable Stainless Steel Folding Pocket Knives (5-Pack)',
    slug: 'laserable-stainless-steel-folding-pocket-knives-5pack',
    description: 'Outdoor high-grade stainless steel folding pocket knives with deep-carry pocket clip. Dual surface: engrave both the blank steel blade and the handle scales.',
    badge: 'High Value',
    laser_type: 'Diode / Fiber / CO2',
    recommended_power: 'Blade: Fiber / IR; Handle: Diode 25%'
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
    recommended_power: 'Speed 2000mm/min, Power 50%'
  },
  {
    id: 'prod_stainless_flasks_5',
    cj_pid: 'FD6C2E42-A8F9-4772-B5F8-4660D972FF85',
    category_id: 'cat_metal',
    name: 'Matte Stainless Steel Pocket Flagon & Hip Flasks (5-Pack, 6oz/8oz)',
    slug: 'matte-stainless-steel-pocket-flagon-flasks-5pack',
    description: 'Laser-grade brushed and coated stainless steel hip flasks with leak-proof screw caps. Top choice for wedding parties, groomsmen gifts, and personalized merchandise.',
    badge: 'Top Gift',
    laser_type: 'Fiber / Diode (Coated)',
    recommended_power: 'Diode 10W (Speed 2500mm/min, Power 45%)'
  },

  // 2. Wood & Natural Slate
  {
    id: 'prod_black_walnut_cutting_board',
    cj_pid: 'FF355ADD-E4FC-4A4E-9E35-073FD124D3CF',
    category_id: 'cat_wood',
    name: 'Solid Black Walnut Wood Cutting & Charcuterie Board Blanks (3-Pack)',
    slug: 'solid-black-walnut-wood-cutting-board-blanks-3pack',
    description: 'Selected premium dark black walnut kitchen cutting boards with ergonomic hanging handle. Smooth sanded, food-safe raw finish, ideal for deep pyrography laser branding.',
    badge: 'Premium Grade',
    laser_type: 'CO2 / Diode',
    recommended_power: '10W Diode (Speed 2200mm/min, Power 40%)'
  },
  {
    id: 'prod_stoneware_wood_coasters',
    cj_pid: '2505191146161626100',
    category_id: 'cat_wood',
    name: 'Solid Hardwood & Stoneware Ceramic Drink Coaster Blanks (12-Pack)',
    slug: 'solid-hardwood-stoneware-coaster-blanks-12pack',
    description: 'Hand-finished solid wood and absorbent ceramic drink coasters. Flat sanded ready for laser pyrography, personal monograms, and wedding favors.',
    badge: 'Natural Wood',
    laser_type: 'Diode / CO2',
    recommended_power: 'Diode 5W+ (Speed 3500mm/min, Power 35%)'
  },

  // 3. Leather & Accessories
  {
    id: 'prod_passport_holders_10',
    cj_pid: '1BA30466-381C-44A5-8A86-8A2DFDF29A4C',
    category_id: 'cat_leather',
    name: 'RFID-Blocking Leatherette Passport Holder Covers (10-Pack)',
    slug: 'rfid-blocking-leatherette-passport-holder-covers-10pack',
    description: 'Slim travel passport covers with internal card slots and built-in RFID shielding. Engrave travel maps, quotes, and names effortlessly.',
    badge: 'Travel Trend',
    laser_type: 'Diode / CO2',
    recommended_power: 'Speed 3000mm/min, Power 25%'
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
    recommended_power: '5W Diode (Speed 2500mm/min, Power 30%)'
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
    recommended_power: 'Speed 2800mm/min, Power 25%'
  },

  // 4. Acrylic & LED Lamp
  {
    id: 'prod_led_night_light_bases',
    cj_pid: '22A95739-E5F1-4D94-8288-3EFF67AB64CF',
    category_id: 'cat_acrylic',
    name: 'Solid Wood LED Night Light Bases with USB Cable & Switch (5-Pack)',
    slug: 'solid-wood-led-night-light-bases-with-usb-cable-switch-5pack',
    description: 'Warm white / RGB illuminated natural beech bases with 5mm precision slot for laser engraved acrylic sheets. Powered by standard USB.',
    badge: 'Top Selling',
    laser_type: 'Universal Slot Size',
    recommended_power: 'Fits 3mm - 4mm Acrylic Panels'
  },

  // 5. Jewelry & Keepsakes
  {
    id: 'prod_rainbow_dog_tag_necklace',
    cj_pid: '2406100213401621400',
    category_id: 'cat_jewelry',
    name: 'Rainbow Titanium & Stainless Steel Dog Tag Necklaces (20-Pack)',
    slug: 'rainbow-titanium-stainless-steel-dog-tag-necklaces-20pack',
    description: 'Eye-catching dual-layer iridescent titanium stainless steel pendant blanks. Mirror polished surface produces vivid laser markings.',
    badge: 'Vibrant Finish',
    laser_type: 'Fiber / Diode 10W+',
    recommended_power: 'Speed 1000mm/min, Power 95%'
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
    recommended_power: 'Fiber 20W (Speed 1500mm/min, 60kHz)'
  },

  // 6. Accessories & Tools
  {
    id: 'prod_rotary_roller_jig',
    cj_pid: 'D2FF4A4C-6FA2-4A8D-86D6-B5D8D3C1B4F5',
    category_id: 'cat_accessories',
    name: 'Universal Laser Rotary Roller Attachment with Adjustable Leveler',
    slug: 'universal-laser-rotary-roller-attachment',
    description: 'Plug-and-play Y-axis rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. Engrave cylinders from 5mm to 150mm diameter effortlessly.',
    badge: 'Maker Must-Have',
    laser_type: 'Universal Diode & CO2',
    recommended_power: 'Standard Motor Driver Cable Included'
  }
];

export function calculateRetailPrice(cjPriceString: string): { cost_price: number; price: number; compare_at_price: number } {
  let cost = 4.50;
  if (cjPriceString) {
    const parts = cjPriceString.split('-').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (parts.length > 0) {
      cost = parts.reduce((a, b) => a + b, 0) / parts.length;
    }
  }

  const cost_price = Math.round(cost * 100) / 100;
  // ~50% gross margin + buffer
  const price = Math.round((cost_price * 2.2 + 2.99) * 100) / 100;
  const compare_at_price = Math.round((price * 1.4) * 100) / 100;

  return { cost_price, price, compare_at_price };
}

export async function buildVerifiedCatalog(): Promise<Product[]> {
  const products: Product[] = [];

  for (const item of VERIFIED_CJ_PRODUCTS) {
    console.log(`Fetching CJ detail for ${item.name} (${item.cj_pid})...`);
    try {
      const detail = await getCjProductDetail(item.cj_pid);
      if (detail) {
        const { cost_price, price, compare_at_price } = calculateRetailPrice(detail.sellPrice);

        // Surinkti nuotraukas iš CJ CDN
        let imgs: string[] = [];
        if (detail.productImage) {
          try {
            const parsed = JSON.parse(detail.productImage);
            if (Array.isArray(parsed)) imgs.push(...parsed);
          } catch {
            if (detail.productImage.startsWith('http')) imgs.push(detail.productImage);
          }
        }
        if (Array.isArray(detail.productImageSet)) {
          imgs.push(...detail.productImageSet.filter(x => x && x.startsWith('http')));
        }

        // Unikalios nuotraukos
        imgs = Array.from(new Set(imgs)).slice(0, 4);
        if (imgs.length === 0) {
          imgs = ['https://cf.cjdropshipping.com/20200113/96253264689.jpg'];
        }

        products.push({
          id: item.id,
          name: item.name,
          slug: item.slug,
          category_id: item.category_id,
          description: item.description,
          price,
          compare_at_price,
          cost_price,
          supplier_sku: detail.productSku,
          badge: item.badge,
          laser_type: item.laser_type,
          recommended_power: item.recommended_power,
          images: imgs,
          cj_pid: item.cj_pid
        });
      }
      await new Promise(r => setTimeout(r, 1100)); // QPS limit 1s
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Error syncing ${item.id}:`, msg);
    }

  }

  return products;
}

export async function syncCatalogFromCj(): Promise<{ totalSynced: number; products: Product[] }> {
  const products = await buildVerifiedCatalog();
  return { totalSynced: products.length, products };
}

