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
  body_html?: string;
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

function translateTitle(brand: string, title: string, lang: string): string {
  const clean = cleanTitle(title);

  if (lang === 'lt') {
    return `${brand} ${clean
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
      .replace(/cutting head/gi, 'lazerio pjovimo galvutė')}`;
  }

  if (lang === 'de') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Wabentisch Aluminium')
      .replace(/air assist pump|air compressor|air pump/gi, 'Luftunterstützung Air Assist Kompressor')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Rotationswalze für Zylinder')
      .replace(/focus lens|laser lens/gi, 'Fokuslinse ZnSe')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Molybdän-Reflexionsspiegel')
      .replace(/safety glasses|safety goggles/gi, 'Laserschutzbrille')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Rauchabsaugung Abluftventilator')
      .replace(/enclosure|foldable enclosure/gi, 'Feuerfestes Schutzgehäuse')
      .replace(/stepper motor driver|stepper driver/gi, 'Schrittmotortreiber')
      .replace(/laser module/gi, 'Lasermodul Optik')
      .replace(/extension kit/gi, 'Arbeitsbereich-Erweiterungssatz')
      .replace(/cleaning wipes/gi, 'Optik-Reinigungstücher')
      .replace(/cutting head/gi, 'Laserschneidkopf')}`;
  }

  if (lang === 'fr') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Plateau nid d’abeille aluminium')
      .replace(/air assist pump|air compressor|air pump/gi, 'Compresseur assistance d’air Air Assist')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Module rotatif pour cylindres')
      .replace(/focus lens|laser lens/gi, 'Lentille de focalisation')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Miroirs réfléchissants molybdène')
      .replace(/safety glasses|safety goggles/gi, 'Lunettes de protection laser')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Extracteur de fumée')
      .replace(/enclosure|foldable enclosure/gi, 'Caisson de protection ignifugé')
      .replace(/stepper motor driver|stepper driver/gi, 'Pilote de moteur pas à pas')
      .replace(/laser module/gi, 'Module laser optique')
      .replace(/extension kit/gi, 'Kit d’extension de surface')
      .replace(/cleaning wipes/gi, 'Lingettes nettoyantes pour optiques')
      .replace(/cutting head/gi, 'Tête de découpe laser')}`;
  }

  if (lang === 'es') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Mesa de panal de aluminio')
      .replace(/air assist pump|air compressor|air pump/gi, 'Compresor de asistencia de aire Air Assist')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Rodillo rotatorio para cilindros')
      .replace(/focus lens|laser lens/gi, 'Lente de enfoque')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Espejos reflectantes de molibdeno')
      .replace(/safety glasses|safety goggles/gi, 'Gafas de seguridad láser')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Extractor de humos')
      .replace(/enclosure|foldable enclosure/gi, 'Carcasa protectora ignífuga')
      .replace(/stepper motor driver|stepper driver/gi, 'Controlador de motor paso a paso')
      .replace(/laser module/gi, 'Módulo láser óptico')
      .replace(/extension kit/gi, 'Kit de extensión de área de trabajo')
      .replace(/cleaning wipes/gi, 'Toallitas limpiadoras para óptica')
      .replace(/cutting head/gi, 'Cabezal de corte láser')}`;
  }

  if (lang === 'pl') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Stół roboczy plaster miodu')
      .replace(/air assist pump|air compressor|air pump/gi, 'Kompresor nadmuchu Air Assist')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Rolka obrotowa do cylindrów')
      .replace(/focus lens|laser lens/gi, 'Soczewka skupiająca')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Lustra odbijające molibdenowe')
      .replace(/safety glasses|safety goggles/gi, 'Okulary ochronne laserowe')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Wyciąg oparów i dymu')
      .replace(/enclosure|foldable enclosure/gi, 'Obudowa ochronna ognioodporna')
      .replace(/stepper motor driver|stepper driver/gi, 'Sterownik silnika krokowego')
      .replace(/laser module/gi, 'Optyczny moduł laserowy')
      .replace(/extension kit/gi, 'Zestaw przedłużający pole robocze')
      .replace(/cleaning wipes/gi, 'Chusteczki do czyszczenia optyki')
      .replace(/cutting head/gi, 'Głowica tnąca laserowa')}`;
  }

  if (lang === 'lv') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Šūnu darba galds')
      .replace(/air assist pump|air compressor|air pump/gi, 'Gaisa padeves kompresors Air Assist')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Rotējošais rullītis cilindriem')
      .replace(/focus lens|laser lens/gi, 'Fokusēšanas lēca')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Molibdēna atstarojošie spoguļi')
      .replace(/safety glasses|safety goggles/gi, 'Lāzera aizsargbrilles')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Dūmu nosūcējs')
      .replace(/enclosure|foldable enclosure/gi, 'Ugunsdrošs aizsargkorpuss')
      .replace(/stepper motor driver|stepper driver/gi, 'Soļu motora vadītājs')
      .replace(/laser module/gi, 'Lāzera modulis')
      .replace(/extension kit/gi, 'Darba laukuma pagarinājuma komplekts')
      .replace(/cleaning wipes/gi, 'Optikas tīrīšanas salvetes')
      .replace(/cutting head/gi, 'Lāzergriešanas galva')}`;
  }

  if (lang === 'et') {
    return `${brand} ${clean
      .replace(/honeycomb working table|honeycomb work table|honeycomb bed/gi, 'Kärgstruktuuriga töölaud')
      .replace(/air assist pump|air compressor|air pump/gi, 'Õhupump Air Assist')
      .replace(/rotary roller|rotary attachment|rotary axis/gi, 'Pöörlev rull silindritele')
      .replace(/focus lens|laser lens/gi, 'Fokuseerimislääts')
      .replace(/reflective mirror|molybdenum mirror/gi, 'Molübdeenpeeglid')
      .replace(/safety glasses|safety goggles/gi, 'Laserkaitseprillid')
      .replace(/fume extraction|smoke purifier|exhaust fan/gi, 'Suitsueemaldussüsteem')
      .replace(/enclosure|foldable enclosure/gi, 'Tulekindel kaitsekamber')
      .replace(/stepper motor driver|stepper driver/gi, 'Samm-mootori draiver')
      .replace(/laser module/gi, 'Lasermoodul')
      .replace(/extension kit/gi, 'Tööala laienduskomplekt')
      .replace(/cleaning wipes/gi, 'Optikapuhastuslapid')
      .replace(/cutting head/gi, 'Laserlõikepea')}`;
  }

  return `${brand} ${clean}`;
}

function cleanHtmlToText(html?: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function generateFullDescription(brand: string, title: string, bodyHtml?: string, lang = 'en'): string {
  const textFromHtml = cleanHtmlToText(bodyHtml);
  const clean = cleanTitle(title);

  if (lang === 'lt') {
    return `### Produkto apžvalga ir specifikacija
Šis oficialus **${brand}** komponentas yra sukurtas profesionalioms dirbtuvėms bei didelio tikslumo lazerinio graviravimo ir pjovimo darbams. Įrenginys pasižymi pramoninio lygio surinkimo kokybe, atsparumu temperatūros svyravimams ir ilgaamžiškumu.

#### Pagrindiniai privalumai:
- **Gamintojo garantija ir originalumas:** 100% originali ${brand} gamyklos komplektacija su patikrintais tolerancijos parametrais.
- **Platus suderinamumas:** Pilnai suderinamas su populiariausia valdymo programine įranga (LightBurn, LaserGRBL) bei standartinėmis staklėmis (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Aukštas efektyvumas:** Sumažina medžiagų broką, apsaugo optinius komponentus nuo dūmų bei užtikrina tolygų, švarų rezultatą kiekvieno ciklo metu.

#### Techninis aprašymas:
${textFromHtml.length > 80 ? textFromHtml.slice(0, 700) + '...' : `Originalus ${clean} komplektas, paruoštas greitam pajungimui pagal gamintojo instrukcijas.`}

#### Rekomenduojama priežiūra:
Reguliariai nuvalykite dulkes ir dūmų apnašas nepūkuojančia servetėle. Naudokite tik gamintojo nurodytus įtampos bei apkrovos parametrus.`;
  }

  return `### Product Overview & Technical Specifications
The official **${brand}** component is engineered for professional laser workshops and high-precision CNC laser applications. Manufactured under strict quality control standards, it ensures maximum durability, thermal stability, and exact tolerances.

#### Key Features:
- **Authentic Brand Engineering:** 100% genuine ${brand} factory equipment ensuring true-to-spec performance and longevity.
- **Universal Compatibility:** Fully supported across leading laser control software (LightBurn, LaserGRBL) and mainstream desktop/industrial frames (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2 systems).
- **Workshop Reliability:** Reduces operational wear, protects sensitive focal optics from soot buildup, and delivers clean, repeatable processing passes.

#### Manufacturer Details:
${textFromHtml.length > 80 ? textFromHtml.slice(0, 700) + '...' : `Authentic ${clean} assembly, pre-calibrated and ready for plug-and-play installation.`}

#### Maintenance & Usage Guidelines:
Keep optical and moving contact surfaces free of debris using lint-free optical wipes. Adhere to specified voltage and duty cycles for maximum lifespan.`;
}

const descriptions: Record<string, (brand: string) => string> = {
  en: (brand) => `Official ${brand} professional laser accessory. Precision-engineered for maker workshops and production laser cutting. Fully compatible with LightBurn and popular European machines.`,
  lt: (brand) => `Originalus ${brand} profesionalus lazerio komponentas. Sukurtas dirbtuvėms ir gamybiniam pjovimui/graviravimui. Suderinamas su LightBurn ir populiariausiomis staklėmis.`,
  de: (brand) => `Offizielles ${brand} Profi-Laserzubehör. Entwickelt für Maker-Werkstätten und präzise Fertigung. Voll kompatibel mit LightBurn und gängigen Lasern.`,
  fr: (brand) => `Accessoire laser professionnel officiel ${brand}. Conçu avec précision pour les ateliers de fabrication et la découpe laser. Compatible LightBurn.`,
  es: (brand) => `Accesorio láser profesional oficial de ${brand}. Diseñado para talleres de grabado y corte de precisión. Totalmente compatible con LightBurn.`,
  pl: (brand) => `Oficjalne profesjonalne akcesorium laserowe ${brand}. Precyzyjnie wykonane dla pracowni i produkcji. W pełni kompatybilne z oprogramowaniem LightBurn.`,
  lv: (brand) => `Oficiāls ${brand} profesionāls lāzera piederums. Paredzēts darbnīcām un precīzai lāzergriešanai. Savietojams ar LightBurn programmatūru.`,
  et: (brand) => `Ametlik ${brand} professionaalne laseri lisatarvik. Täppistöötluseks ja tootmiseks. Täielikult ühilduv LightBurn tarkvaraga.`,
};

const selected100 = raw.slice(0, 100).map((it, idx) => {
  const brand = it.brand;
  const fullNameEn = `${brand} ${cleanTitle(it.title)}`;
  const category_id = getCategory(it.title);
  const price = Math.round(it.price * 1.35 * 100) / 100;
  const compare_at = Math.round(price * 1.35 * 100) / 100;
  const slug = `${brand}-${it.handle}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const name_i18n: Record<string, string> = {
    en: fullNameEn,
    lt: translateTitle(brand, it.title, 'lt'),
    de: translateTitle(brand, it.title, 'de'),
    fr: translateTitle(brand, it.title, 'fr'),
    es: translateTitle(brand, it.title, 'es'),
    pl: translateTitle(brand, it.title, 'pl'),
    lv: translateTitle(brand, it.title, 'lv'),
    et: translateTitle(brand, it.title, 'et'),
  };

  const description_i18n: Record<string, string> = {
    en: descriptions.en(brand),
    lt: descriptions.lt(brand),
    de: descriptions.de(brand),
    fr: descriptions.fr(brand),
    es: descriptions.es(brand),
    pl: descriptions.pl(brand),
    lv: descriptions.lv(brand),
    et: descriptions.et(brand),
  };

  const full_description_i18n: Record<string, string> = {
    en: generateFullDescription(brand, it.title, it.body_html, 'en'),
    lt: generateFullDescription(brand, it.title, it.body_html, 'lt'),
  };

  const specs: Record<string, string> = {
    Brand: brand,
    'Laser Type': getLaserType(it.title),
    Compatibility: 'LightBurn, LaserGRBL, xTool, Ortur, Creality, Atomstack, CO2',
    SKU: it.sku || `${brand.toUpperCase()}-${idx + 1}`,
    Certification: 'CE / RoHS Standard',
    Warranty: '12 Months Manufacturer Warranty',
  };

  return {
    id: `prod_${brand.toLowerCase()}_${idx + 1}`,
    name: fullNameEn,
    slug,
    category_id,
    description: descriptions.en(brand),
    price,
    compare_at_price: compare_at,
    cost_price: it.price,
    supplier_sku: it.sku || `${brand.toUpperCase()}-${idx + 1}`,
    badge: `${brand} Original`,
    laser_type: getLaserType(it.title),
    recommended_power: `Verified ${brand} Component`,
    images: it.images && it.images.length > 0 ? it.images : [it.image],
    cj_pid: it.sku || `${brand.toUpperCase()}-${idx + 1}`,
    name_i18n,
    description_i18n,
    full_description: full_description_i18n.en,
    full_description_i18n,
    specs,
  };
});

console.log('Paruošta 100 prekių su max išsamiais aprašymais ir techninėmis specifikacijomis!');
const code = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(selected100, null, 2)};\n`;
fs.writeFileSync('src/lib/products.ts', code, 'utf8');
console.log('Sėkmingai atnaujintas src/lib/products.ts su išsamiais aprašymais!');
