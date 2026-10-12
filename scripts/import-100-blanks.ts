import fs from 'fs';
import { translateTitle, generateLocalizedDescription } from '../src/lib/product-translator.ts';

// 1. Nuskaitome dabartines patvirtintas 14 prekių
const currentContent = fs.readFileSync('src/lib/products.ts', 'utf8');
const match = currentContent.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);
const existingProducts = JSON.parse(match![1]);

// 2. Nuskaitome išfiltruotus švarius CJ ruošinius
const scrapedRaw = JSON.parse(fs.readFileSync('scripts/cj-scraped-blanks.json', 'utf8'));

// Griežtas filtras: pašalinti bet kokius netinkamus daiktus
const blacklist = [
  'top', 'compression', 'keycap', 'rhinestone', 'pearl', 'shoe', 'sneaker',
  'sweater', 't-shirt', 'pants', 'trousers', 'dress', 'clothing', 'coat',
  'jacket', 'skirt', 'brazier', 'mitten', 'glove', 'pet clothes', 'wig',
  'underwear', 'water writing', 'mud blank', 'bag', 'tote'
];

const candidateBlanks = scrapedRaw.filter((item: any) => {
  const n = item.nameEn.toLowerCase();
  return !blacklist.some(b => n.includes(b));
});

console.log('Galimų papildomų CJ ruošinių skaičius:', candidateBlanks.length);

// Sukuriame naujus produktus, kad bendras skaičius būtų ~100
const existingPids = new Set(existingProducts.map((p: any) => p.cj_pid));
const newProducts: any[] = [];

// Atnaujiname esamas 14 prekių su vertimais
for (const p of existingProducts) {
  p.name_i18n = translateTitle(p.name);
  p.description_i18n = generateLocalizedDescription(p.name, p.category_id);
}

for (const item of candidateBlanks) {
  if (existingPids.has(item.id)) continue;
  existingPids.add(item.id);

  // Nustatome kategoriją pagal pavadinimą
  const n = item.nameEn.toLowerCase();
  let category_id = 'cat_jewelry';
  let badge = 'Laser Ready';
  let laser_type = 'Fiber / Diode / Infrared';
  let recommended_power = 'Speed 1200mm/min, Power 80%';

  if (n.includes('wood') || n.includes('coaster') || n.includes('board') || n.includes('bamboo')) {
    category_id = 'cat_wood';
    laser_type = 'Diode / CO2';
    recommended_power = 'Speed 2500mm/min, Power 40%';
  } else if (n.includes('leather') || n.includes('keychain') || n.includes('wallet')) {
    category_id = 'cat_leather';
    laser_type = 'Diode / CO2 / Fiber';
    recommended_power = 'Speed 2800mm/min, Power 30%';
  } else if (n.includes('tag') || n.includes('metal') || n.includes('flask') || n.includes('knife')) {
    category_id = 'cat_metal';
    laser_type = 'Fiber / Diode 10W+';
    recommended_power = 'Speed 1500mm/min, Power 70%';
  } else if (n.includes('lamp') || n.includes('light') || n.includes('acrylic')) {
    category_id = 'cat_acrylic';
    laser_type = 'CO2 / Diode';
    recommended_power = 'Fits Standard Slots';
  }

  // Apskaičiuojame pardavimo kainą
  let cost = 1.80;
  if (item.sellPrice) {
    const parts = item.sellPrice.split('-').map((s: string) => parseFloat(s.trim())).filter((num: number) => !isNaN(num));
    if (parts.length > 0) cost = parts.reduce((a: number, b: number) => a + b, 0) / parts.length;
  }
  const cost_price = Math.round(cost * 100) / 100;
  const price = Math.round((cost_price * 2.2 + 3.49) * 100) / 100;
  const compare_at_price = Math.round((price * 1.4) * 100) / 100;

  const id = `prod_cj_${item.sku.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  const slug = item.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  newProducts.push({
    id,
    name: item.nameEn,
    name_i18n: translateTitle(item.nameEn),
    slug,
    category_id,
    description: generateLocalizedDescription(item.nameEn, category_id).en,
    description_i18n: generateLocalizedDescription(item.nameEn, category_id),
    price,
    compare_at_price,
    cost_price,
    supplier_sku: item.sku,
    badge,
    laser_type,
    recommended_power,
    images: [item.bigImage],
    cj_pid: item.id
  });

  if (existingProducts.length + newProducts.length >= 100) {
    break;
  }
}

const finalCatalog = [...existingProducts, ...newProducts];
console.log('Bendras prekių skaičius naujame kataloge:', finalCatalog.length);

const outContent = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(finalCatalog, null, 2)};\n`;
fs.writeFileSync('src/lib/products.ts', outContent, 'utf8');
console.log('src/lib/products.ts sėkmingai atnaujintas!');
