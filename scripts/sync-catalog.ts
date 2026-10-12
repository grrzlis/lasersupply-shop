/**
 * Automated CJ Dropshipping Catalog Sync CLI Script
 * Run with: node scripts/sync-catalog.ts
 */

import { getCjProductDetail } from '../src/lib/cj-client.ts';
import { CJ_PRODUCT_MAPPINGS, calculateRetailPrice } from '../src/lib/cj-sync.ts';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('🚀 Starting CJ Dropshipping automated catalog sync...');

  const productsPath = path.resolve(process.cwd(), 'src/lib/products.ts');
  const existingCode = fs.readFileSync(productsPath, 'utf8');

  let updatedCount = 0;
  let skippedCount = 0;

  // Read current products array
  // We will selectively update the items that are mapped to CJ
  const syncResults = new Map();

  for (const mapping of CJ_PRODUCT_MAPPINGS) {
    try {
      console.log(`📡 Fetching CJ product ${mapping.cj_pid} (${mapping.name.slice(0, 30)}...)...`);
      const detail = await getCjProductDetail(mapping.cj_pid);
      if (detail) {
        const { cost_price, price, compare_at_price } = calculateRetailPrice(detail.sellPrice);

        // Collect authentic CJ images
        const cjImages = [];
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

        const images = cjImages.length > 0 ? cjImages.slice(0, 4) : [mapping.fallback_image];

        syncResults.set(mapping.id, {
          id: mapping.id,
          cj_pid: mapping.cj_pid,
          name: mapping.name,
          slug: mapping.slug,
          category_id: mapping.category_id,
          description: mapping.description,
          price,
          compare_at_price,
          cost_price,
          supplier_sku: detail.productSku || `CJ-${mapping.cj_pid}`,
          badge: mapping.badge,
          laser_type: mapping.laser_type,
          recommended_power: mapping.recommended_power,
          images,
        });

        updatedCount++;
        console.log(`✅ Synced: ${mapping.name} -> SKU: ${detail.productSku}, Price: €${price}, Images: ${images.length}`);
      } else {
        console.warn(`⚠️ No detail returned for PID: ${mapping.cj_pid}`);
        skippedCount++;
      }
    } catch (err) {
      console.error(`❌ Error fetching ${mapping.cj_pid}:`, (err as any).message);
      skippedCount++;
    }

    // Friendly delay to respect CJ OpenAPI rate limits
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\n🎉 CJ Sync Complete! Successfully synced ${updatedCount} products (${skippedCount} skipped).`);

  // Read and parse current products array safely without module resolver dependency
  const code = fs.readFileSync(productsPath, 'utf8')
    .replace(/^import\s+.*$/m, '')
    .replace(/^export const PRODUCTS: Product\[\] =/m, 'const PRODUCTS =');
  const getProducts = new Function(code + '; return PRODUCTS;');
  const currentProducts = getProducts();
  const updatedCatalog = currentProducts.map((p: any) => {
    if (syncResults.has(p.id)) {
      const synced = syncResults.get(p.id);
      return {
        ...p,
        ...synced,
      };
    }
    return p;
  });

  // Also append any new CJ products from syncResults that weren't in currentProducts
  const existingIds = new Set(currentProducts.map((p: any) => p.id));
  for (const [id, synced] of syncResults.entries()) {
    if (!existingIds.has(id)) {
      updatedCatalog.push(synced);
      console.log(`✨ Added NEW product from CJ: ${synced.name}`);
    }
  }

  const fileOutput = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(
    updatedCatalog,
    null,
    2
  )};\n`;

  fs.writeFileSync(productsPath, fileOutput, 'utf8');
  console.log(`💾 Successfully updated and saved src/lib/products.ts with ${updatedCatalog.length} products!`);
}

run().catch((err) => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
