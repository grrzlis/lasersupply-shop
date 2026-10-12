import * as fs from 'fs';
import * as path from 'path';

interface RawShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at: string;
  tags: string[];
  variants: Array<{
    id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string | null;
    fulfillment_service: string;
    inventory_management: string | null;
    option1: string;
    option2: string | null;
    option3: string | null;
  }>;
  images: Array<{
    id: number;
    position: number;
    src: string;
    width: number;
    height: number;
  }>;
  options: Array<{
    name: string;
    position: number;
    values: string[];
  }>;
}

interface Product {
  id: string;
  name: string;
  name_i18n?: Record<string, string>;
  slug: string;
  category_id: string;
  description: string;
  description_i18n?: Record<string, string>;
  price: number;
  compare_at_price?: number;
  cost_price: number;
  supplier_sku: string;
  cj_pid?: string;
  badge?: string;
  laser_type: string;
  recommended_power: string;
  images: string[];
  full_description?: string;
  full_description_i18n?: Record<string, string>;
  specs?: Record<string, string>;
}

// 32 specific filament configurations (material, type, brand, colors, features)
interface FilamentDef {
  brand: 'Polymaker' | 'Elegoo';
  shopifyTitle: string;
  displayNameEn: string;
  displayNameLt: string;
  material: string;
  finishOrType: string;
  diameter: string;
  weight: string;
  printTemp: string;
  bedTemp: string;
  fanSpeed: string;
  speed: string;
  colors: string;
  featuresEn: string[];
  featuresLt: string[];
}

const FILAMENTS_DATA: FilamentDef[] = [
  // 1. Polymaker Panchroma Matte PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Matte PLA',
    displayNameEn: 'Polymaker Panchroma™ Matte PLA Filament 1.75mm 1kg (Multi-Color Selection)',
    displayNameLt: 'Polymaker Panchroma™ Matinis PLA Filamentas 1.75mm 1kg (Spalvų Pasirinkimas)',
    material: 'Matte PLA',
    finishOrType: 'Ultra-Matte Low Glare',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '190 - 230 °C',
    bedTemp: '25 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 300 mm/s',
    colors: 'Charcoal Black, Cotton White, Slate Grey, Olive Green, Lava Red, Ocean Blue',
    featuresEn: ['Conceals layer lines seamlessly with deep matte finish', 'Cardboard spool with eco-conscious construction', 'Jammed-free technology ensures smooth extrusion'],
    featuresLt: ['Puikiai paslepia spausdinimo sluoksnius dėka gilaus matinio paviršiaus', 'Ekologiška perdirbamo kartono ritė', 'Apsaugota nuo purkštuko užsikimšimo patentuota Jam-Free technologija'],
  },
  // 2. Polymaker Panchroma Silk PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Silk PLA',
    displayNameEn: 'Polymaker Panchroma™ Silk PLA Filament 1.75mm 1kg (High Gloss Metallic Shine)',
    displayNameLt: 'Polymaker Panchroma™ Šilkinis Silk PLA Filamentas 1.75mm 1kg (Veidrodinis Blizgesys)',
    material: 'Silk PLA',
    finishOrType: 'Silky High Gloss Sheen',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 200 mm/s',
    colors: 'Silk Gold, Silk Silver, Silk Bronze, Silk Ruby, Silk Emerald, Silk Sapphire',
    featuresEn: ['Luxurious satin silk reflections ideal for decorative models and awards', 'Exceptional layer adhesion with silky outer texture', 'Zero warping on PEI surfaces'],
    featuresLt: ['Prabangus šilkinis atspindys dekoratyviniams modeliams, dovanoms ir trofėjams', 'Ypatingai tvirtas tarpsluoksninis sukibimas', 'Nėra deformacijos spausdinant ant PEI pagrindo'],
  },
  // 3. Polymaker Panchroma Dual Silk PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Dual Silk PLA',
    displayNameEn: 'Polymaker Panchroma™ Dual-Color Silk PLA Filament 1.75mm 1kg (Co-Extruded 2-Tone)',
    displayNameLt: 'Polymaker Panchroma™ Dvispalvis Dual Silk PLA Filamentas 1.75mm 1kg (Dvispalvis Šilkas)',
    material: 'Dual-Color Silk PLA',
    finishOrType: '2-Color Dichromatic Silk',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '205 - 235 °C',
    bedTemp: '35 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 180 mm/s',
    colors: 'Gold-Silver, Blue-Green, Red-Gold, Purple-Blue, Black-Rose Gold',
    featuresEn: ['Co-extruded dual-color creates striking color transitions depending on viewing angle', 'Ultra-vibrant pearlescent highlights', 'Optimized for high-detail statues and vases'],
    featuresLt: ['Dvispalvė koekstruzija sukuria dinamišką spalvos keitimąsi sukant modelį', 'Ryškus perlų blizgesys be papildomo dažymo ar lakavimo', 'Idealu vazoms, skulptūroms ir dizaino prototipams'],
  },
  // 4. Polymaker Polymaker™ PLA Pro
  {
    brand: 'Polymaker',
    shopifyTitle: 'Polymaker™ PLA Pro',
    displayNameEn: 'Polymaker™ PLA Pro High-Impact Tough Filament 1.75mm 1kg (ABS-Grade Strength)',
    displayNameLt: 'Polymaker™ PLA Pro Itin Tvirtas Filamentas 1.75mm 1kg (ABS Lygio Smūginis Atsparumas)',
    material: 'PLA Pro (Tough PLA)',
    finishOrType: 'Semi-Gloss Engineering',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '100%',
    speed: '50 - 300 mm/s',
    colors: 'True Black, Cold White, Industrial Grey, Signal Red, Cobalt Blue',
    featuresEn: ['Engineered with impact resistance superior to standard ABS without toxic fumes', 'Easy to print without enclosure like standard PLA', 'Superb rigidity for functional brackets and mechanical fixtures'],
    featuresLt: ['Smūginis atsparumas pranoksta standartinį ABS, be jokių toksiškų garų', 'Spausdinama taip pat lengvai kaip paprastas PLA be uždaros kameros', 'Didžiulis standumas mechaninėms detalėms, laikikliams ir korpusams'],
  },
  // 5. Polymaker PolyLite™ PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyLite™ PLA',
    displayNameEn: 'Polymaker PolyLite™ PLA High Precision Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyLite™ PLA Didelio Tikslumo Filamentas 1.75mm 1kg',
    material: 'Pure Grade PLA',
    finishOrType: 'Classic Satin Gloss',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '190 - 230 °C',
    bedTemp: '25 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 300 mm/s',
    colors: 'Jet Black, Pure White, Silver, Yellow, Teal, Magenta, Orange',
    featuresEn: ['Reliable everyday workhorse filament with high dimensional stability', 'Extracted from natural renewable corn starch resources', 'Minimal stringing and crisp overhang performance'],
    featuresLt: ['Patikimas kasdienis filamentas su itin tiksliais išmatavimais', 'Pagamintas iš aukščiausios kokybės natūralių atsinaujinančių žaliavų', 'Minimalus stygavimas (stringing) ir švarūs perlinkimai'],
  },
  // 6. Polymaker Panchroma™ Galaxy PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Galaxy PLA',
    displayNameEn: 'Polymaker Panchroma™ Galaxy Glitter Sparkle PLA Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker Panchroma™ Galaxy Žėrintis PLA Filamentas su Žvyneliais 1.75mm 1kg',
    material: 'Galaxy Sparkle PLA',
    finishOrType: 'Glitter Embedded Dark Tone',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 200 mm/s',
    colors: 'Galaxy Black, Galaxy Purple, Galaxy Blue, Deep Space Silver',
    featuresEn: ['Embedded micro-glitter particles hide layer boundaries completely', 'Cosmic starry-night effect with deep gloss highlights', 'Non-abrasive formulation safe for standard brass nozzles'],
    featuresLt: ['Mikro žvyneliai pilnai paslepia sluoksnių linijas', 'Kosminio žvaigždėto dangaus efektas su giliais atspindžiais', 'Neabrazyvi formulė — visiškai saugu spausdinti su įprastu žalvariniu antgaliu'],
  },
  // 7. Polymaker Panchroma™ Marble PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Marble PLA',
    displayNameEn: 'Polymaker Panchroma™ Marble Stone Architectural PLA Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker Panchroma™ Marmuro Imitacijos PLA Filamentas 1.75mm 1kg',
    material: 'Architectural Marble PLA',
    finishOrType: 'Matte Real Stone Look',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Net Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 200 mm/s',
    colors: 'Natural White Marble, Granite Grey, Sandstone Beige',
    featuresEn: ['Simulates authentic polished marble and architectural stone', 'Natural fleck distribution without nozzle clogging', 'Ideal for busts, architectural miniatures, and premium interior decor'],
    featuresLt: ['Autentiška poliruoto marmuro ir akmens tekstūros imitacija', 'Smulkios mineralinės dėmelės neužkemša net 0.4mm antgalio', 'Puikiai tinka biustams, architektūriniams maketams ir interjero detalėms'],
  },
  // 8. Polymaker Wood PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Polymaker Wood PLA',
    displayNameEn: 'Polymaker PolyWood™ Wood Fiber Composite PLA Filament 1.75mm 600g',
    displayNameLt: 'Polymaker PolyWood™ Medienos Pluošto Kompozitinis PLA Filamentas 1.75mm 600g',
    material: 'Wood Polymer Composite',
    finishOrType: 'Natural Timber Wood Texture',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '0.6 kg Spool',
    printTemp: '190 - 220 °C',
    bedTemp: '25 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 150 mm/s',
    colors: 'Oak Light, Walnut Dark, Natural Birch',
    featuresEn: ['Contains genuine wood particle foaming technology for authentic timber touch', 'Can be sanded, stained, and painted just like real hardwood', 'Pleasant wood aroma during printing'],
    featuresLt: ['Unikali putojimo technologija atkurianti tikros medienos pojūtį ir tankį', 'Galima šlifuoti, beicuoti ir lakuoti lyg tikrą kietmedį', 'Malonus natūralios medienos aromatas spausdinimo metu'],
  },
  // 9. Polymaker PolyLite™ PLA-CF
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyLite™ PLA-CF',
    displayNameEn: 'Polymaker PolyLite™ PLA-CF Carbon Fiber Reinforced Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyLite™ PLA-CF Anglies Pluoštu Sustiprintas Filamentas 1.75mm 1kg',
    material: 'Carbon Fiber Reinforced PLA',
    finishOrType: 'Matte Carbon Texture',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '210 - 240 °C',
    bedTemp: '35 - 60 °C',
    fanSpeed: '80 - 100%',
    speed: '40 - 250 mm/s',
    colors: 'Carbon Black, Slate Grey, Dark Titanium',
    featuresEn: ['Reinforced with chopped high-modulus carbon fiber for superior bending rigidity', 'Stealth matte surface with virtually invisible layer lines', 'Hardened steel nozzle recommended (0.4mm or larger)'],
    featuresLt: ['Sustiprintas smulkintu didelio modulio anglies pluoštu maksimaliam standumui', 'Matinis „stealth“ paviršius visiškai paslepiantis sluoksnių linijas', 'Rekomenduojama naudoti grūdinto plieno purkštuką (nuo 0.4mm)'],
  },
  // 10. Polymaker Panchroma™ Glow PLA
  {
    brand: 'Polymaker',
    shopifyTitle: 'Panchroma™ Glow PLA',
    displayNameEn: 'Polymaker Panchroma™ Glow-in-the-Dark Luminous PLA Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker Panchroma™ Tamsoje Šviečiantis Glow PLA Filamentas 1.75mm 1kg',
    material: 'Phosphorescent Glow PLA',
    finishOrType: 'Luminescent Afterglow',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 180 mm/s',
    colors: 'Glow Green, Glow Blue, Glow Aqua, Glow Orange',
    featuresEn: ['Charged rapidly by sunlight or UV LEDs, producing intense hours-long luminescence', 'Excels in emergency signage, novelty gifts, and night switches', 'Wear-resistant nozzle recommended for sustained usage'],
    featuresLt: ['Greitai pasikrauna nuo saulės ar UV šviesos ir šviečia tamsoje kelias valandas', 'Idealiai tinka avarinėms nuorodoms, naktiniams jungikliams ir suvenyrams', 'Rekomenduojama naudoti grūdintą purkštuką ilgesniam spausdinimui'],
  },
  // 11. Polymaker Polymaker™ PETG
  {
    brand: 'Polymaker',
    shopifyTitle: 'Polymaker™ PETG',
    displayNameEn: 'Polymaker™ PETG All-Round Chemical & Water Resistant Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker™ PETG Chemijai ir Drėgmei Atsparus Filamentas 1.75mm 1kg',
    material: 'Standard PETG',
    finishOrType: 'Glossy Translucent / Solid',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '230 - 250 °C',
    bedTemp: '70 - 85 °C',
    fanSpeed: '20 - 50%',
    speed: '30 - 200 mm/s',
    colors: 'Solid Black, Solid White, Transparent Clear, Ruby Red, Sapphire Blue',
    featuresEn: ['Combines the ease of PLA with the durability and weather resistance of ABS', 'Safe for water contact, outdoor UV exposure, and light chemical washdown', 'Exceptional interlayer bonding prevents layer splitting'],
    featuresLt: ['Suderina PLA spausdinimo paprastumą su ABS patvarumu bei atsparumu lauko sąlygoms', 'Atsparus drėgmei, UV spinduliams ir buitinei chemijai', 'Ypač stiprus sluoksnių suliejimas neleidžia detalėms skilti pagal siūles'],
  },
  // 12. Polymaker PolyLite™ Translucent PETG
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyLite™ Translucent PETG',
    displayNameEn: 'Polymaker PolyLite™ Translucent PETG High Clarity Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyLite™ Skaidrus Translucent PETG Filamentas 1.75mm 1kg',
    material: 'Translucent Optical PETG',
    finishOrType: 'Glass-Like Light Transmissive',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '235 - 255 °C',
    bedTemp: '75 - 85 °C',
    fanSpeed: '0 - 30%',
    speed: '25 - 150 mm/s',
    colors: 'Clear Transparent, Translucent Red, Translucent Blue, Translucent Green, Amber Orange',
    featuresEn: ['Exceptional light transmittance for lampshades, LED diffusers, and fluid containers', 'High clarity with minimal crystallization haze', 'Watertight prints easily achievable with optimized wall perimeters'],
    featuresLt: ['Ypatingas šviesos pralaidumas šviestuvų gaubtams, LED difuzoriams ir talpoms', 'Stiklo skaidrumas su minimaliu drumstumu', 'Paprasta pasiekti 100% vandens nepralaidumą sureguliavus perimetrų skaičių'],
  },
  // 13. Polymaker Fiberon™ PETG-rCF08
  {
    brand: 'Polymaker',
    shopifyTitle: 'Fiberon™ PETG-rCF08',
    displayNameEn: 'Polymaker Fiberon™ PETG-rCF08 Recycled Carbon Fiber Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker Fiberon™ PETG-rCF08 Perdirbto Anglies Pluošto PETG Filamentas 1.75mm 1kg',
    material: 'PETG + 8% Carbon Fiber',
    finishOrType: 'High-Rigidity Matte Industrial',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '240 - 260 °C',
    bedTemp: '75 - 85 °C',
    fanSpeed: '20 - 50%',
    speed: '40 - 250 mm/s',
    colors: 'Graphite Carbon Black, Industrial Grey',
    featuresEn: ['8% precision-milled carbon fiber boosts tensile modulus and heat deflection to 75°C', 'Superior dimensional stability prevents warping even on large flat parts', 'Eco-engineered using post-industrial recycled carbon fiber'],
    featuresLt: ['8% smulkinto anglies pluošto padidina standumą ir šiluminį atsparumą iki 75°C', 'Ypatingas matmenų stabilumas — detalės nesiriečia net spausdinant didelius plotus', 'Tvariai pagaminta naudojant perdirbtą pramoninį anglies pluoštą'],
  },
  // 14. Polymaker Fiberon™ PETG-ESD
  {
    brand: 'Polymaker',
    shopifyTitle: 'Fiberon™ PETG-ESD',
    displayNameEn: 'Polymaker Fiberon™ PETG-ESD Electrostatic Safe Industrial Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker Fiberon™ PETG-ESD Antistatinis Pramoninis Filamentas 1.75mm 1kg',
    material: 'ESD Electrostatic Dissipative PETG',
    finishOrType: 'Conductive Safe Matte Black',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '240 - 265 °C',
    bedTemp: '75 - 90 °C',
    fanSpeed: '20 - 40%',
    speed: '30 - 180 mm/s',
    colors: 'ESD Black',
    featuresEn: ['Consistent surface resistivity 10^7 - 10^9 ohms protects sensitive electronic PCB assembly', 'Indispensable for cleanrooms, SMT jigs, component trays, and lab enclosures', 'High chemical and alcohol wipe resistance'],
    featuresLt: ['Stabilus paviršiaus atsparumas 10^7 - 10^9 omų apsaugo jautrią elektroniką nuo iškrovų', 'Būtinas elektronikos montavimo šablonams, PCB dėklams ir laboratorijų įrangai', 'Atsparus spiritui, valikliams ir mechaniniam trinčiai'],
  },
  // 15. Polymaker PolyLite™ ABS
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyLite™ ABS',
    displayNameEn: 'Polymaker PolyLite™ ABS Thermal & Impact Resistant Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyLite™ ABS Karščiui ir Smūgiams Atsparus Filamentas 1.75mm 1kg',
    material: 'Pure Engineered ABS',
    finishOrType: 'Acetone Smoothable Matte',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '245 - 265 °C',
    bedTemp: '90 - 105 °C',
    fanSpeed: '0 - 15%',
    speed: '30 - 200 mm/s',
    colors: 'Black, White, Grey, Red, Blue, Orange',
    featuresEn: ['Withstands continuous operating temperatures up to 98°C', 'Can be acetone vapor smoothed to produce injection-mold glass finish', 'High impact toughness for automotive, drone, and tool parts'],
    featuresLt: ['Atlaiko nuolatinę temperatūrą iki 98°C be minkštėjimo ar deformacijos', 'Galima garinti acetonu išgaunant nepriekaištingai lygų lieto plastiko blizgesį', 'Didelis atsparumas smūgiams automobilių detalėms, dronams ir įrankiams'],
  },
  // 16. Polymaker Polymaker™ ABS Pro
  {
    brand: 'Polymaker',
    shopifyTitle: 'Polymaker™ ABS Pro',
    displayNameEn: 'Polymaker™ ABS Pro Anti-Warping High Strength Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker™ ABS Pro Nesiriečiantis Didelio Stiprumo Filamentas 1.75mm 1kg',
    material: 'Modified Low-Warp ABS',
    finishOrType: 'Satin Tough Industrial',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '240 - 260 °C',
    bedTemp: '85 - 100 °C',
    fanSpeed: '0 - 20%',
    speed: '40 - 250 mm/s',
    colors: 'Jet Black, Signal White, Steel Grey',
    featuresEn: ['Formulated with specialized impact modifiers eliminating corner lifting warping', 'Superior interlayer adhesion compared to conventional ABS grades', 'Excellent machinability — drilling, tapping, and milling ready'],
    featuresLt: ['Speciali formulė panaikina kampų rietimąsi ir įtrūkimus auštant', 'Daug kartų geresnis tarpsluoksninis sukibimas lyginant su standartiniu ABS', 'Lengva apdirbti mechaniškai — gręžti, sriegti, šlifuoti ir frezuoti'],
  },
  // 17. Polymaker PolyFlex™ TPU95
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyFlex™ TPU95',
    displayNameEn: 'Polymaker PolyFlex™ TPU95-A High Elasticity Flexible Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyFlex™ TPU95-A Lankstus Elastingas Filamentas 1.75mm 1kg',
    material: 'Thermoplastic Polyurethane 95A',
    finishOrType: 'Rubber-Like Elastic Flex',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '210 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '50 - 100%',
    speed: '20 - 100 mm/s',
    colors: 'Solid Black, Natural White, Neon Orange, Vivid Red, Electric Blue',
    featuresEn: ['Shore hardness 95A provides balanced flexibility and effortless direct-drive feeding', 'High abrasion resistance, tear strength, and chemical durability against oils and greases', 'Unbeatable for gaskets, dampers, phone cases, and drone bumpers'],
    featuresLt: ['Šoro kietumas 95A užtikrina tobulą elastingumą ir lengvą tiekimą ekstruderyje', 'Atsparus trinčiai, plyšimui, tepalams, alyvoms ir kurui', 'Nepakeičiamas tarpinėms, amortizatoriams, telefono dėklams ir dronų apsaugoms'],
  },
  // 18. Polymaker PolyFlex™ TPU90
  {
    brand: 'Polymaker',
    shopifyTitle: 'PolyFlex™ TPU90',
    displayNameEn: 'Polymaker PolyFlex™ TPU90-A Ultra Flexible Soft Rubber Filament 1.75mm 1kg',
    displayNameLt: 'Polymaker PolyFlex™ TPU90-A Ypatingai Minkštas Guminis Filamentas 1.75mm 1kg',
    material: 'Soft Polyurethane TPU 90A',
    finishOrType: 'Soft High Elastic Cushion',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '205 - 225 °C',
    bedTemp: '25 - 50 °C',
    fanSpeed: '40 - 80%',
    speed: '15 - 60 mm/s',
    colors: 'Rubber Black, Milky Translucent',
    featuresEn: ['Ultra-soft 90A Shore durometer yields exceptional vibration damping and elongation >400%', 'Quiet non-slip feet, soft grip handles, and airtight custom seals', 'Superior UV weather endurance without hardening over time'],
    featuresLt: ['Ypatingai minkštas 90A kietumas su daugiau nei 400% pailgėjimu iki trūkimo', 'Slopina vibraciją, tinka neslystančioms kojelėms, rankenoms ir sandariems žiedams', 'Nepraranda elastingumo ir nesutrūkinėja nuo saulės spindulių ar šalčio'],
  },
  // 19. Elegoo PLA Basic
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Basic',
    displayNameEn: 'Elegoo PLA Basic All-Round 3D Printing Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Basic Universalus 3D Spausdinimo Filamentas 1.75mm 1kg',
    material: 'Standard Virgin PLA',
    finishOrType: 'Crisp Gloss Precision',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '190 - 220 °C',
    bedTemp: '40 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 300 mm/s',
    colors: 'Black, White, Grey, Red, Blue, Yellow, Green, Orange, Purple, Brown',
    featuresEn: ['Tangle-free mechanical winding ensures uninterrupted multi-day prints', 'Exceptional value-for-money with stringent ±0.02mm diameter consistency', 'Universal fit on Bambu Lab, Creality, Elegoo Neptune, and Prusa machines'],
    featuresLt: ['Automatinis tikslus suvyniojimas apsaugo nuo persipynimo ilgų spausdinimų metu', 'Geriausias kainos ir kokybės santykis su garantuota ±0.02mm tolerancija', 'Tinka visiems Bambu Lab, Creality, Elegoo Neptune, Anycubic ir Prusa spausdintuvams'],
  },
  // 20. Elegoo Rapid PLA Plus
  {
    brand: 'Elegoo',
    shopifyTitle: 'Rapid PLA Plus',
    displayNameEn: 'Elegoo Rapid PLA+ High-Speed 600mm/s Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo Rapid PLA+ Greitaeigis 600mm/s Filamentas 1.75mm 1kg',
    material: 'Rapid High-Flow PLA+',
    finishOrType: 'High-Flow Low Drag Smooth',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '205 - 230 °C',
    bedTemp: '50 - 65 °C',
    fanSpeed: '100%',
    speed: '100 - 600 mm/s',
    colors: 'Space Grey, Matte Black, Pure White, Crimson Red, Navy Blue',
    featuresEn: ['Formulated for modern ultra-high speed printers (Bambu X1C/P1S, K1 Max, Neptune 4)', 'High melt flow rate prevents underextrusion at velocities up to 600mm/s', 'Enhanced toughness with 2.5x impact strength over regular PLA'],
    featuresLt: ['Sukurta šiuolaikiniams itin greitiems spausdintuvams (Bambu X1C/P1S, K1 Max, Neptune 4)', 'Didelio takumo formulė apsaugo nuo defektų spausdinant net iki 600 mm/s greičiu', '2.5 karto didesnis smūginis atsparumas lyginant su standartiniu PLA'],
  },
  // 21. Elegoo PLA Matte
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Matte',
    displayNameEn: 'Elegoo PLA Matte Non-Reflective Architectural Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Matte Neatspindintis Architektūrinis Filamentas 1.75mm 1kg',
    material: 'Matte PLA',
    finishOrType: 'Velvet Matte Low Sheen',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '190 - 225 °C',
    bedTemp: '40 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 250 mm/s',
    colors: 'Matte Black, Matte White, Slate Grey, Olive Green, Sakura Pink, Lavender Purple',
    featuresEn: ['Soft velvet matte finish eliminates glare and visibly blurs print layers', 'Smooth overhangs with zero post-processing sanding required', 'Non-toxic, low odor printing experience'],
    featuresLt: ['Švelnus aksominis matinis paviršius visiškai pašalina blizgesį ir paslepia sluoksnius', 'Nepriekaištingos briaunos be jokio poreikio papildomam šlifavimui', 'Netoksiškas, be aštraus kvapo, saugus naudoti namų aplinkoje'],
  },
  // 22. Elegoo PLA Silk
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Silk',
    displayNameEn: 'Elegoo PLA Silk Glossy Pearlescent Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Silk Blizgus Šilkinis Perlų Filamentas 1.75mm 1kg',
    material: 'Silk Shiny PLA',
    finishOrType: 'Silky Pearlescent Luster',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '45 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 200 mm/s',
    colors: 'Silk Gold, Silk Silver, Silk Copper, Silk Cyan, Silk Rose Gold, Silk Violet',
    featuresEn: ['High-luster metallic reflection mimics precious metals and lustrous silks', 'Produces breathtaking decorative art, jewelry holders, and custom gifts', 'Consistent flow without foaming or clogging'],
    featuresLt: ['Aukštas metalo atspindžio lygis primena tauriuosius metalus ir šilko audinį', 'Sukurkite kvapą gniaužiančias dekoracijas, papuošalų dėžutes ir dovanas', 'Tolygus lydymasis be burbulų ar purkštuko strigimų'],
  },
  // 23. Elegoo PLA Galaxy
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Galaxy',
    displayNameEn: 'Elegoo PLA Galaxy Sparkle Cosmic Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Galaxy Žvaigždėto Kosmoso Filamentas 1.75mm 1kg',
    material: 'Galaxy Sparkle PLA',
    finishOrType: 'Subtle Stellar Sparkle',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '45 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 250 mm/s',
    colors: 'Galaxy Nebula Black, Galaxy Space Blue, Galaxy Starry Silver',
    featuresEn: ['Infused with fine cosmic glimmer particles creating multidimensional depth', 'Hides layer lines automatically while giving parts a high-end tactile finish', 'Safe for standard 0.4mm brass nozzles'],
    featuresLt: ['Praturtintas smulkiais žėrinčiais dalelių blizgučiais suteikiančiais gilų trimatį efektą', 'Automatiškai paslepia spausdinimo linijas ir suteikia gaminiui prabangos pojūtį', 'Saugus standartiniams 0.4mm žalvariniams purkštukams'],
  },
  // 24. Elegoo PLA Sparkle
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Sparkle',
    displayNameEn: 'Elegoo PLA Sparkle Glitter Crystal Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Sparkle Kristalinis Žėrintis Filamentas 1.75mm 1kg',
    material: 'Glitter Crystal PLA',
    finishOrType: 'High-Density Glitter Gloss',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 225 °C',
    bedTemp: '40 - 60 °C',
    fanSpeed: '100%',
    speed: '35 - 200 mm/s',
    colors: 'Sparkle Emerald, Sparkle Ruby, Sparkle Sapphire, Sparkle Onyx',
    featuresEn: ['Dense glitter concentration reflects ambient light beautifully from all angles', 'Superior layer bonding with no embrittlement', 'Eye-catching solution for gaming miniatures, holiday ornaments, and dice towers'],
    featuresLt: ['Didelis blizgučių tankumas nuostabiai atspindi aplinkos šviesą iš visų kampų', 'Puikus sluoksnių sukibimas be trapumo ar mikroįtrūkimų', 'Ypatingai tinka žaidimų figūrėlėms, šventiniams žaisliukams ir kauliukų bokštams'],
  },
  // 25. Elegoo PLA Glow
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Glow',
    displayNameEn: 'Elegoo PLA Glow in the Dark Night Luminous Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Glow Tamsoje Šviečiantis Fosforinis Filamentas 1.75mm 1kg',
    material: 'Luminescent Night Glow PLA',
    finishOrType: 'Night Phosphor Glow',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '40 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 180 mm/s',
    colors: 'Fluorescent Green Glow, Neon Blue Glow',
    featuresEn: ['Supercharged phosphorescent pigment delivers striking high-intensity green/blue night glow', 'Charges swiftly under standard room light or direct sun', 'Adds nocturnal safety and fun to switches, toys, and nightlights'],
    featuresLt: ['Super-koncentruotas fosforinis pigmentas garantuoja ryškų švytėjimą tamsoje', 'Greitai pasikrauna nuo įprastos kambario lemputės ar saulės šviesos', 'Suteikia saugumo ir išskirtinumo jungikliams, žaislams ir naktinėms lemputėms'],
  },
  // 26. Elegoo PLA Wood
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Wood',
    displayNameEn: 'Elegoo PLA Wood Organic Timber Composite Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Wood Medienos Drožlių Kompozitinis Filamentas 1.75mm 1kg',
    material: 'Wood Polymer Composite',
    finishOrType: 'Warm Organic Wood Texture',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '190 - 220 °C',
    bedTemp: '40 - 60 °C',
    fanSpeed: '100%',
    speed: '30 - 180 mm/s',
    colors: 'Natural Oak, Sandalwood Brown, Light Birch',
    featuresEn: ['Crafted with recycled natural wood fibers for genuine grain appearance', 'Temperature adjustments during printing vary the brown shade like real tree growth rings', 'Accepts wood stains, waxes, and varnishes effortlessly'],
    featuresLt: ['Pagamintas su natūralaus medžio pluoštu, suteikiančiu tikros medienos išvaizdą ir faktūrą', 'Keičiant purkštuko temperatūrą spausdinimo metu galima sukurti medžio rievių efektą', 'Paprasta beicuoti, lakuoti ir apdirbti kaip tikrą medį'],
  },
  // 27. Elegoo PLA Marble
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Marble',
    displayNameEn: 'Elegoo PLA Marble Architectural Stone Effect Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Marble Skulptūrinis Marmuro Efekto Filamentas 1.75mm 1kg',
    material: 'Marble Composite PLA',
    finishOrType: 'Natural Matte Granular Stone',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 225 °C',
    bedTemp: '45 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 220 mm/s',
    colors: 'Classic White Carrara Marble, Grey Granite',
    featuresEn: ['Authentic stone speckled texture produces museum-quality sculpture replicas', 'Completely masks layer striations for effortless presentation-grade prints', 'Smooth flow through standard 0.4mm nozzles with zero clogs'],
    featuresLt: ['Autentiška marmuro faktūra su smulkiomis gyslelėmis kuria muziejinio lygio skulptūras', 'Pilnai paslepia sluoksnių linijas — detalės atrodo kaip iškaltos iš akmens', 'Laisvai teka per įprastus 0.4mm purkštukus be kamščių rizikos'],
  },
  // 28. Elegoo PLA Metallic
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA Metallic',
    displayNameEn: 'Elegoo PLA Metallic Aluminum & Gunmetal Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA Metallic Metalizuotas Aliuminio ir Plieno Filamentas 1.75mm 1kg',
    material: 'Metallic Particle PLA',
    finishOrType: 'Satin Machined Metal Sheen',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '200 - 230 °C',
    bedTemp: '45 - 60 °C',
    fanSpeed: '100%',
    speed: '40 - 220 mm/s',
    colors: 'Machined Aluminum, Gunmetal Iron, Copper Ore',
    featuresEn: ['Fine metal-flake formulation replicates CNC-machined metal finishes', 'Stunning sheen without brittle layer adhesion issues', 'Excellent choice for cosplay armor, robot casings, and functional mechanical parts'],
    featuresLt: ['Smulkios metalizuotos dalelės atkurią CNC frezuoto metalo estetiką', 'Nuostabus blizgesys be plastiko trapumo', 'Puikus pasirinkimas kosplėjaus šarvams, robotikos korpusams ir mechaniniams maketams'],
  },
  // 29. Elegoo PLA-CF
  {
    brand: 'Elegoo',
    shopifyTitle: 'PLA-CF',
    displayNameEn: 'Elegoo PLA-CF Carbon Fiber High Stiffness Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PLA-CF Anglies Pluošto Ypatingo Standumo Filamentas 1.75mm 1kg',
    material: 'Carbon Fiber Infused PLA',
    finishOrType: 'Matte Industrial Carbon',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '210 - 240 °C',
    bedTemp: '50 - 65 °C',
    fanSpeed: '80 - 100%',
    speed: '50 - 300 mm/s',
    colors: 'Matte Carbon Black, Carbon Ash Grey',
    featuresEn: ['Carbon fiber reinforcement delivers superior rigidity, low shrinkage, and zero warping', 'Classy matte texture with unnoticeable layer lines', 'Hardened nozzle required due to carbon fiber stiffness'],
    featuresLt: ['Anglies pluošto armavimas suteikia išskirtinį standumą ir panaikina susitraukimą', 'Prabangus matinis paviršius su visiškai nematomais sluoksniais', 'Reikalingas grūdinto plieno purkštukas'],
  },
  // 30. Elegoo Rapid PETG
  {
    brand: 'Elegoo',
    shopifyTitle: 'Rapid PETG',
    displayNameEn: 'Elegoo Rapid PETG High-Speed Weatherproof Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo Rapid PETG Greitaeigis Orui ir UV Atsparus Filamentas 1.75mm 1kg',
    material: 'High-Flow Rapid PETG',
    finishOrType: 'Semi-Gloss Weather-Tough',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '230 - 260 °C',
    bedTemp: '70 - 85 °C',
    fanSpeed: '20 - 50%',
    speed: '60 - 400 mm/s',
    colors: 'Industrial Black, Solid White, Transparent Clear, Signal Red, Cobalt Blue',
    featuresEn: ['Optimized for fast-paced CoreXY 3D printers with high volumetric extrusion rates', 'UV, moisture, and chemical resistant for rugged functional and outdoor applications', 'Superior impact strength and layer bond integrity'],
    featuresLt: ['Pritaikytas greitiems CoreXY spausdintuvams su dideliu ekstruzijos tūriu', 'Atsparus UV spinduliams, drėgmei ir lauko sąlygoms', 'Didelis atsparumas smūgiams ir patikimas sukibimas tarp sluoksnių'],
  },
  // 31. Elegoo PETG-CF
  {
    brand: 'Elegoo',
    shopifyTitle: 'PETG-CF',
    displayNameEn: 'Elegoo PETG-CF Carbon Fiber Engineering High Heat Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo PETG-CF Anglies Pluošto Inžinerinis Filamentas 1.75mm 1kg',
    material: 'PETG + Carbon Fiber Composite',
    finishOrType: 'Matte Engineering Carbon',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '240 - 270 °C',
    bedTemp: '75 - 85 °C',
    fanSpeed: '20 - 40%',
    speed: '40 - 250 mm/s',
    colors: 'Stealth Black Carbon',
    featuresEn: ['Combines chemical resistance of PETG with structural stiffness of carbon fiber', 'Heat resistance up to 80°C and resistance to fuel, oils, and automotive fluids', 'Outstanding structural strength for drone arms and custom tooling'],
    featuresLt: ['Sujungia PETG cheminį atsparumą su anglies pluošto mechaniniu tvirtumu', 'Terminis atsparumas iki 80°C, atsparus degalams, tepalams ir skysčiams', 'Nepakeičiamas dronų rėmams, tvirtinimo mazgams ir gamybiniams įrankiams'],
  },
  // 32. Elegoo TPU 95A
  {
    brand: 'Elegoo',
    shopifyTitle: 'TPU 95A',
    displayNameEn: 'Elegoo TPU 95A High-Flexibility Wear-Resistant Rubber Filament 1.75mm 1kg',
    displayNameLt: 'Elegoo TPU 95A Lankstus Trinčiai Atsparus Guminis Filamentas 1.75mm 1kg',
    material: 'High-Elasticity TPU 95A',
    finishOrType: 'Flexible Non-Slip Rubber',
    diameter: '1.75 mm (±0.02 mm)',
    weight: '1.0 kg Spool',
    printTemp: '210 - 230 °C',
    bedTemp: '30 - 60 °C',
    fanSpeed: '60 - 100%',
    speed: '20 - 80 mm/s',
    colors: 'Carbon Black, Snow White, Vibrant Red, Electric Blue, Bright Yellow',
    featuresEn: ['Shore 95A elasticity with 450% elongation break resistance', 'Remarkable layer bonding ensures leak-proof gaskets and vibration mounts', 'Wear-resistant formulation with high tear strength'],
    featuresLt: ['Šoro 95A elastingumas su 450% prailginimu iki trūkimo', 'Neįtikėtinai tvirtas suliejimas garantuoja sandarias tarpines ir amortizatorius', 'Ypatingai atsparus trinčiai, nusidėvėjimui ir mechaniniam poveikiui'],
  }
];

function generateTranslations(def: FilamentDef, price: number) {
  const shortEn = `Premium ${def.brand} ${def.material} 3D printer filament (1.75mm, 1kg). Engineered for smooth feeding, zero warping, and high interlayer strength. Available in ${def.colors}.`;
  const shortLt = `Aukščiausios kokybės ${def.brand} ${def.material} 3D spausdintuvo filamentas (1.75mm, 1kg). Tikslus skersmuo, puikus sukibimas tarp sluoksnių ir jokio užsikimšimo. Spalvų gama: ${def.colors}.`;
  const shortDe = `Hochwertiges ${def.brand} ${def.material} 3D-Drucker-Filament (1,75 mm, 1 kg). Präziser Durchmesser, hervorragende Zwischenschichthaftung und kein Verstopfen. Farben: ${def.colors}.`;
  const shortFr = `Filament d'imprimante 3D ${def.brand} ${def.material} haute précision (1,75 mm, 1 kg). Extrusion fluide, adhérence parfaite et sans déformation. Couleurs : ${def.colors}.`;
  const shortEs = `Filamento para impresora 3D ${def.brand} ${def.material} de alta precisión (1,75 mm, 1 kg). Extrusión suave, excelente adhesión y sin atascos. Gama de colores: ${def.colors}.`;
  const shortPl = `Wysokiej jakości filament do drukarek 3D ${def.brand} ${def.material} (1,75 mm, 1 kg). Precyzyjna średnica, brak wypaczeń i doskonałe łączenie warstw. Kolory: ${def.colors}.`;
  const shortLv = `Augstākās kvalitātes ${def.brand} ${def.material} 3D printera kvēldiegs (1,75 mm, 1 kg). Precīzs diametrs, teicama starpslāņu saķere un uzticama padeve. Krāsas: ${def.colors}.`;
  const shortEt = `Kvaliteetne ${def.brand} ${def.material} 3D-printeri hõõgniit (1,75 mm, 1 kg). Täpne läbimõõt, suurepärane kihtidevaheline nake ja sujuv printimine. Värvid: ${def.colors}.`;

  const fullEn = `### Technical Specifications & Printing Guidelines
The official **${def.brand} ${def.material}** 1.75mm filament is engineered for high-performance 3D printing across FDM/FFF machines. Manufactured with strict laser-guided diameter control (±0.02mm), it delivers buttery-smooth extrusion without clogs or tangling.

#### Key Features & Advantages:
${def.featuresEn.map(f => `- **${f.split(' ')[0]}**: ${f}`).join('\n')}
- **Spool & Packaging:** Vacuum-sealed with industrial desiccant in heavy-duty moisture-barrier aluminum/poly bag.
- **Universal Printer Compatibility:** 100% compatible with Bambu Lab (X1/P1P/P1S/A1), Creality (Ender, K1/K1C), Elegoo (Neptune 3/4), Prusa (MK3/MK4/XL), Anycubic, and Voron.

#### Recommended Print Parameters:
- **Nozzle Temperature:** ${def.printTemp}
- **Heated Bed Temperature:** ${def.bedTemp}
- **Printing Speed:** ${def.speed}
- **Cooling Fan:** ${def.fanSpeed}
- **Build Surface:** Textured PEI, Smooth PEI, Glass, or Engineering Plate

#### Available Color Options:
${def.colors}`;

  const fullLt = `### Techninė apžvalga ir spausdinimo parametrai
Originalus **${def.brand} ${def.material}** 1.75mm filamentas yra sukurtas profesionaliems bei kasdieniams 3D spausdinimo darbams FDM/FFF technologijos įrenginiuose. Griežta lazerinė tolerancijos kontrolė (±0.02mm) užtikrina sklandų plastiko padavimą be užsikimšimų ar gijų persipynimo.

#### Pagrindiniai privalumai:
${def.featuresLt.map(f => `- **${f.split(' ')[0]}**: ${f}`).join('\n')}
- **Pakuotė:** Hermetiškai supakuota vakuume su drėgmę sugeriančiu silikageliu.
- **Universalus suderinamumas:** Visiškai tinka Bambu Lab (X1/P1P/P1S/A1), Creality (Ender, K1/K1 Max), Elegoo Neptune serijai, Prusa, Anycubic ir Voron.

#### Rekomenduojami spausdinimo nustatymai:
- **Purkštuko temperatūra:** ${def.printTemp}
- **Šildomo stalo temperatūra:** ${def.bedTemp}
- **Spausdinimo greitis:** ${def.speed}
- **Aušinimo ventiliatorius:** ${def.fanSpeed}
- **Spausdinimo pagrindas:** Tekstūrinis PEI, lygus PEI arba stiklas

#### Galimos spalvos:
${def.colors}`;

  return {
    name_i18n: {
      en: def.displayNameEn,
      lt: def.displayNameLt,
      de: def.displayNameEn.replace('Filament', '3D-Drucker Filament'),
      fr: def.displayNameEn.replace('Filament', 'Filament Imprimante 3D'),
      es: def.displayNameEn.replace('Filament', 'Filamento Impresora 3D'),
      pl: def.displayNameEn.replace('Filament', 'Filament do Drukarki 3D'),
      lv: def.displayNameEn.replace('Filament', '3D Printera Kvēldiegs'),
      et: def.displayNameEn.replace('Filament', '3D-printeri Hõõgniit'),
    },
    description_i18n: {
      en: shortEn,
      lt: shortLt,
      de: shortDe,
      fr: shortFr,
      es: shortEs,
      pl: shortPl,
      lv: shortLv,
      et: shortEt,
    },
    full_description: fullEn,
    full_description_i18n: {
      en: fullEn,
      lt: fullLt,
      de: fullEn,
      fr: fullEn,
      es: fullEn,
      pl: fullEn,
      lv: fullLt,
      et: fullEn,
    },
    short_desc: shortEn,
  };
}

async function main() {
  console.log('Fetching fresh catalogs from Polymaker and Elegoo...');
  const polyRes = await fetch('https://us.polymaker.com/products.json?limit=250');
  const polyData = (await polyRes.json()) as { products: RawShopifyProduct[] };

  const elegooRes = await fetch('https://www.elegoo.com/products.json?limit=250');
  const elegooData = (await elegooRes.json()) as { products: RawShopifyProduct[] };

  const filamentProducts: Product[] = [];

  for (let i = 0; i < FILAMENTS_DATA.length; i++) {
    const def = FILAMENTS_DATA[i];
    const sourceProducts = def.brand === 'Polymaker' ? polyData.products : elegooData.products;

    const raw = sourceProducts.find(
      p => p.title.trim().toLowerCase() === def.shopifyTitle.toLowerCase()
    );

    if (!raw) {
      console.warn(`Could not find raw product for ${def.brand} "${def.shopifyTitle}"!`);
      continue;
    }

    // Gather high-res images (at least 3, up to 6)
    const rawImages = (raw.images || []).map(img => img.src.split('?')[0]);
    const uniqueImages = Array.from(new Set(rawImages)).filter(Boolean);
    const validImages = uniqueImages.slice(0, 6);

    // Calculate clean pricing (35% markup from raw wholesale)
    const rawPrice = parseFloat(raw.variants[0]?.price || '18.99');
    const costPrice = Math.max(12, rawPrice);
    const retailPrice = Math.round(costPrice * 1.35 * 100) / 100;
    const comparePrice = Math.round(retailPrice * 1.35 * 100) / 100;

    const sku = `FIL-${def.brand.substring(0, 3).toUpperCase()}-${raw.variants[0]?.sku || raw.id}`;
    const slug = `${def.brand.toLowerCase()}-${def.shopifyTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;

    const { name_i18n, description_i18n, full_description, full_description_i18n, short_desc } = generateTranslations(def, retailPrice);

    const product: Product = {
      id: `prod_fil_${i + 1}`,
      name: def.displayNameEn,
      name_i18n,
      slug,
      category_id: 'cat_filament',
      description: short_desc,
      description_i18n,
      price: retailPrice,
      compare_at_price: comparePrice,
      cost_price: costPrice,
      supplier_sku: sku,
      badge: `${def.brand} Certified`,
      laser_type: 'FDM 3D Printing (1.75mm)',
      recommended_power: `${def.printTemp} / Bed: ${def.bedTemp}`,
      images: validImages,
      full_description,
      full_description_i18n,
      specs: {
        Brand: def.brand,
        Material: def.material,
        Diameter: def.diameter,
        'Net Weight': def.weight,
        'Print Temperature': def.printTemp,
        'Bed Temperature': def.bedTemp,
        'Max Speed': def.speed,
        'Color Selection': def.colors,
        Compatibility: 'Bambu Lab, Creality, Elegoo, Prusa, Anycubic, Voron',
        SKU: sku,
        Certification: 'RoHS / REACH Certified',
        Warranty: '100% Quality & Clog-Free Guarantee',
      },
    };

    filamentProducts.push(product);
  }

  console.log(`Generated ${filamentProducts.length} filament products!`);

  // Read existing 100 products from src/lib/products.ts
  const productsFilePath = path.join(process.cwd(), 'src/lib/products.ts');
  const currentContent = fs.readFileSync(productsFilePath, 'utf8');

  // Extract JSON array from export const PRODUCTS: Product[] = [...]
  const jsonMatch = currentContent.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
  if (!jsonMatch) {
    throw new Error('Could not parse existing PRODUCTS array from src/lib/products.ts');
  }

  const existing100: Product[] = JSON.parse(jsonMatch[1]);
  console.log(`Loaded ${existing100.length} existing products from src/lib/products.ts`);

  // Combine 100 existing + 32 filament products = 132 products
  const combinedProducts = [...existing100, ...filamentProducts];

  // Write updated src/lib/products.ts
  const fileOutput = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(combinedProducts, null, 2)};\n`;
  fs.writeFileSync(productsFilePath, fileOutput, 'utf8');

  console.log(`Successfully updated src/lib/products.ts with ${combinedProducts.length} total products (including ${filamentProducts.length} 3D filaments)!`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
