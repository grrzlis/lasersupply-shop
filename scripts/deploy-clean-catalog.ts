import fs from 'fs';
import { buildVerifiedCatalog } from '../src/lib/cj-sync.ts';

async function run() {
  console.log('=== Generuojamas 100% švarus CJ katalogas ===');
  const products = await buildVerifiedCatalog();

  console.log(`\nSėkmingai gauta patvirtintų prekių: ${products.length}`);
  products.forEach((p, idx) => {
    console.log(`${idx + 1}. ${p.name}`);
    console.log(`   SKU: ${p.supplier_sku} | Nuotraukų: ${p.images.length}`);
    console.log(`   Pagrindinė nuotrauka: ${p.images[0]}`);
  });

  const content = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync('src/lib/products.ts', content, 'utf-8');
  console.log('\n[SĖKMĖ] src/lib/products.ts atnaujintas be jokių senų ar netikrų nuotraukų!');
}

run().catch(console.error);
