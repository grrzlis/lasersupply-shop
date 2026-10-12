import fs from 'fs';
import { searchCjProducts, getCjProductDetail } from '../src/lib/cj-client.ts';

// Žodynas kiekvienam iš 24 produktų, kad surastume tikslų lazerinių ruošinių (blank) tiekėją CJ sistemoje
const SEARCH_MAPPING: Record<string, string[]> = {
  'prod_pet_tags_50': ['pet id tag blank', 'metal pet tag blank', 'dog tag blank', 'pet tag stainless'],
  'prod_metal_bottle_openers_30': ['bottle opener blank', 'metal bottle opener blank', 'flat bottle opener'],
  'prod_metal_money_clips_10': ['money clip blank', 'metal money clip blank', 'wallet clip blank'],
  'prod_military_dogtags_50': ['military dog tag blank', 'dog tag blank metal', 'anodized dog tag', 'aluminum dog tag'],
  'prod_metal_bookmarks_20': ['metal bookmark blank', 'brass bookmark blank', 'bookmark blank'],
  'prod_stainless_flasks_10': ['hip flask matte black', 'stainless steel flask 8oz', 'hip flask blank'],
  'prod_basswood_3mm_20': ['basswood sheet', 'plywood sheet laser', 'balsa wood sheet', 'wood sheet laser'],
  'prod_slate_coasters_12': ['slate coaster', 'slate stone coaster', 'round slate coaster'],
  'prod_acacia_cutting_boards_3': ['acacia cutting board', 'wood cutting board blank', 'charcuterie board'],
  'prod_bamboo_boards_4': ['bamboo cutting board', 'bamboo cheese board', 'bamboo board'],
  'prod_wood_coasters_round_20': ['wood coaster round', 'wooden coaster blank', 'beechwood coaster'],
  'prod_wood_slices_bark_50': ['wood slice bark', 'pine wood slices', 'natural wood slices craft'],
  'prod_bamboo_pen_cases_10': ['bamboo pen box', 'bamboo ballpoint pen', 'wood pen set'],
  'prod_solid_wine_boxes_3': ['wooden wine box', 'pine wine box', 'wine bottle box slide'],
  'prod_leatherette_patches_100': ['leather hat patch', 'leatherette patch', 'blank hat patch adhesive'],
  'prod_leather_keychains_50': ['leather keychain blank', 'leather key ring blank', 'leather key fob'],
  'prod_leatherette_journals_5': ['leatherette notebook', 'pu leather notebook a5', 'leather journal blank'],
  'prod_luggage_tags_20': ['leather luggage tag blank', 'pu luggage tag blank', 'luggage tag laser'],
  'prod_cast_acrylic_3mm_10': ['clear acrylic sheet 3mm', 'cast acrylic sheet', 'plexiglass sheet blank'],
  'prod_led_wood_bases_5': ['wood led lamp base', 'wooden night light base', 'led base acrylic'],
  'prod_acrylic_night_plates_10': ['acrylic sheet lamp base', 'acrylic plate led base', 'cast acrylic night light'],
  'prod_matte_black_acrylic_10': ['black acrylic sheet', 'matte black acrylic', 'opaque black acrylic sheet'],
  'prod_silicone_watch_bands_10': ['silicone watch band laser', 'engravable watch band', 'silicone apple watch band'],
  'prod_ceramic_tiles_24': ['ceramic tile blank', 'white ceramic tile coaster', 'sublimation ceramic tile']
};

async function matchAll() {
  console.log('--- Pradedamas 24 prekių suporavimas su CJ Dropshipping ---');

  const content = fs.readFileSync('src/lib/products.ts', 'utf-8');
  const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
  if (!match) throw new Error('Nerastas PRODUCTS masyvas');

  const products = JSON.parse(match[1]);
  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    if (SEARCH_MAPPING[p.id]) {
      console.log(`\n[${i+1}/${products.length}] Ieškoma CJ atitikmens: "${p.name}" (${p.id})...`);
      const keywords = SEARCH_MAPPING[p.id];
      let bestItem: any = null;

      for (const kw of keywords) {
        try {
          const res = await searchCjProducts(kw, { size: 10 });
          if (res && res.length > 0) {
            // Pasirenkame pirmą tinkamiausią prekę
            bestItem = res[0];
            console.log(`   -> Rasta pagal raktažodį "${kw}": ${bestItem.nameEn} (SKU: ${bestItem.sku}, ID: ${bestItem.id})`);
            break;
          }
        } catch (e: any) {
          console.warn(`   Klaida ieškant "${kw}": ${e.message}`);
        }
      }

      if (bestItem) {
        // Gauname pilną informaciją (detalizuotas nuotraukas ir variantus)
        let detailImages: string[] = [];
        try {
          const detail = await getCjProductDetail(bestItem.id);
          if (detail && detail.productImageSet && detail.productImageSet.length > 0) {
            detailImages = detail.productImageSet.slice(0, 4);
          }
        } catch (err) {}

        const primaryImg = bestItem.bigImage;
        const allImages = detailImages.length > 0 ? detailImages : [primaryImg];

        // Atnaujiname prekės duomenis
        p.supplier_sku = bestItem.sku;
        p.cj_pid = bestItem.id;
        p.images = allImages;
        updatedCount++;
        console.log(`   [Pavyko] Priskirtas SKU: ${p.supplier_sku}, Nuotrauka: ${p.images[0]}`);
      } else {
        console.log(`   [Praleista] Nerasta tiesioginio atitikmens pagal raktažodžius.`);
      }
    }
  }

  // Išsaugome atnaujintą products.ts
  const updatedTs = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync('src/lib/products.ts', updatedTs, 'utf-8');

  console.log(`\n======================================================`);
  console.log(`Suporavimas baigtas! Sėkmingai atnaujinta prekių: ${updatedCount} iš 24.`);
  console.log(`======================================================`);
}

matchAll().catch(console.error);
