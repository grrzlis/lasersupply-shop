import fs from 'fs';

interface RawItem {
  brand: string;
  title: string;
  handle: string;
  price: number;
  compare_at_price: number;
  sku: string;
  image: string;
  images: string[];
}

const raw: RawItem[] = JSON.parse(fs.readFileSync('scripts/multi-brand-filtered.json', 'utf8'));

function cleanTitle(t: string): string {
  return t
    .replace(/^(cloudray|sculpfun|ortur|twotrees|omtech)\s+/i, '')
    .replace(/【[^】]+】/g, '')
    .trim();
}

function getCategory(title: string): string {
  const t = title.toLowerCase();
  if (
    t.includes('lens') ||
    t.includes('mirror') ||
    t.includes('glasses') ||
    t.includes('protective') ||
    t.includes('shield') ||
    t.includes('goggle') ||
    t.includes('window')
  ) {
    return 'cat_optics_safety';
  }
  if (
    t.includes('wood') ||
    t.includes('plywood') ||
    t.includes('plaque') ||
    t.includes('board') ||
    t.includes('coaster')
  ) {
    return 'cat_wood';
  }
  if (
    t.includes('metal') ||
    t.includes('aluminum') ||
    t.includes('sheet') ||
    t.includes('card') ||
    t.includes('steel') ||
    t.includes('tag')
  ) {
    return 'cat_metal';
  }
  if (
    t.includes('tumbler') ||
    t.includes('cup') ||
    t.includes('mug') ||
    t.includes('bottle') ||
    t.includes('flask')
  ) {
    return 'cat_drinkware';
  }
  if (
    t.includes('acrylic') ||
    t.includes('light') ||
    t.includes('lamp') ||
    t.includes('base')
  ) {
    return 'cat_acrylic';
  }
  if (t.includes('leather') || t.includes('patch') || t.includes('keychain')) {
    return 'cat_leather';
  }
  return 'cat_hardware';
}

function getLaserType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('co2')) return 'CO2 Laser (10.6um)';
  if (t.includes('fiber') || t.includes('mopa')) return 'Fiber / MOPA Laser (1064nm)';
  if (t.includes('uv')) return 'UV Laser (355nm)';
  if (t.includes('diode')) return 'Diode Laser (450nm)';
  return 'Universal Diode & CO2';
}

function translateTitleLt(brand: string, title: string): string {
  const clean = cleanTitle(title);
  const lt = clean
    .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'aliuminio korio stalas')
    .replace(/air assist pump|air compressor|air pump/gi, 'oro pūtimo kompresorius Air Assist')
    .replace(/rotary roller|rotary attachment|rotary axis/gi, 'sukamasis ritinėlis cilindrams')
    .replace(/focus lens|laser lens/gi, 'fokusavimo lęšis')
    .replace(/reflective mirror|molybdenum mirror/gi, 'atspindintys veidrodžiai')
    .replace(/safety glasses|safety goggles/gi, 'apsauginiai akiniai meistrams')
    .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'dūmų ištraukimo sistema')
    .replace(/enclosure|foldable enclosure/gi, 'ugniai atspari apsauginė palapinė')
    .replace(/stepper motor driver|stepper driver/gi, 'žingsninio variklio valdiklis')
    .replace(/laser module/gi, 'lazerio optinis modulis')
    .replace(/extension kit/gi, 'darbo zonos išplėtimo komplektas')
    .replace(/cleaning wipes/gi, 'lęšių valymo servetėlės')
    .replace(/cutting head/gi, 'lazerio pjovimo galvutė');

  return `${brand} ${lt}`;
}

const selected100 = raw.slice(0, 100).map((it, idx) => {
  const brand = it.brand;
  const fullName = `${brand} ${cleanTitle(it.title)}`;
  const category_id = getCategory(it.title);
  const price = Math.round(it.price * 1.35 * 100) / 100;
  const compare_at = Math.round(price * 1.35 * 100) / 100;
  const slug = `${brand}-${it.handle}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    id: `prod_${brand.toLowerCase()}_${idx + 1}`,
    name: fullName,
    slug,
    category_id,
    description: `Official ${brand} professional laser accessory. Precision-engineered for maker workshops and production laser cutting. Compatible with LightBurn, LaserGRBL, and industry standard machines.`,
    price,
    compare_at_price: compare_at,
    cost_price: it.price,
    supplier_sku: it.sku || `${brand.toUpperCase()}-${idx + 1}`,
    badge: `${brand} Original`,
    laser_type: getLaserType(it.title),
    recommended_power: `High Quality Verified ${brand} Component`,
    images: it.images && it.images.length > 0 ? it.images : [it.image],
    cj_pid: it.sku || `${brand.toUpperCase()}-${idx + 1}`,
    name_i18n: {
      en: fullName,
      lt: translateTitleLt(brand, it.title),
    },
    description_i18n: {
      en: `Official ${brand} professional laser accessory. Precision-engineered for maker workshops and production laser cutting. Compatible with LightBurn, LaserGRBL, and industry standard machines.`,
      lt: `Originalus ${brand} profesionalus lazerio komponentas. Sukurtas dirbtuvėms ir gamybiniam pjovimui/graviravimui. Suderinamas su LightBurn ir populiariausiomis staklėmis.`,
    },
  };
});

console.log('Paruošta prekių:', selected100.length);
const code = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(selected100, null, 2)};\n`;
fs.writeFileSync('src/lib/products.ts', code, 'utf8');
console.log('Sėkmingai sugeneruotas 100 prekių katalogas src/lib/products.ts!');
