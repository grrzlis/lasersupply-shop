import fs from 'fs';

const content = fs.readFileSync('src/lib/products.ts', 'utf-8');
const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
const products = JSON.parse(match[1]);

console.log('=== VISOS PREKĖS SU NUOTRAUKOMIS ===');
products.forEach((p, idx) => {
  const isLocal = (p.images || []).some(x => !x.startsWith('http'));
  console.log(`${idx + 1}. [${p.id}] ${p.name}`);
  console.log(`   Kategorija: ${p.category_id}`);
  console.log(`   Nuotraukos (${p.images?.length || 0}):`, p.images);
  console.log(`   Yra vietinė nuotrauka: ${isLocal}`);
  console.log('----------------------------------------------------');
});
