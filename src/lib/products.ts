import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1. CLOUDRAY PROFESSIONAL LASER HARDWARE & WORKING TABLES
  // =========================================================================
  {
    id: 'prod_cloudray_honeycomb_table_400',
    name: 'Cloudray Pro Aluminum Honeycomb Working Table with Galvanized Steel Plate (400x400mm)',
    slug: 'cloudray-pro-aluminum-honeycomb-working-table-400x400mm',
    category_id: 'cat_hardware',
    description: 'Official Cloudray laser honeycomb work table. Heavy-duty aluminum grid frame engineered with millimeter measurement scales and corner bumpers. Includes a solid galvanized steel sheet to protect your workbench from laser burns and soot. Fast smoke dissipation prevents underside material charring.',
    price: 54.90,
    compare_at_price: 74.90,
    cost_price: 26.50,
    supplier_sku: 'CR-HB-400-EU',
    badge: 'Bestseller #1',
    laser_type: 'Universal Diode & CO2 (xTool, Creality, Ortur, Sculpfun, Atomstack, Omtech)',
    recommended_power: 'Heavy Duty Frame with Precision Millimeter Rulers',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/products/HoneycombTable_1.jpg?v=1623460960&width=1200'
    ],
    cj_pid: 'CR-HB-400',
    name_i18n: {
      en: 'Cloudray Pro Aluminum Honeycomb Working Table with Galvanized Steel Plate (400x400mm)',
      lt: 'Cloudray profesionalus aliuminio korio stalas su plienine apsaugine plokšte (400x400mm)'
    },
    description_i18n: {
      en: 'Official Cloudray laser honeycomb work table. Heavy-duty aluminum grid frame engineered with millimeter measurement scales and corner bumpers. Includes a solid galvanized steel sheet to protect your workbench from laser burns and soot. Fast smoke dissipation prevents underside material charring.',
      lt: 'Originalus Cloudray korio stalas lazeriniam pjovimui ir graviravimui. Tvirtas aliuminio rėmas su milimetrine liniuote. Komplekte yra cinkuota plieno plokštė stalo apsaugai. Greitas dūmų ištraukimas apsaugo ruošinių nugarėlę nuo apdegimo ir geltonavimo.'
    }
  },
  {
    id: 'prod_cloudray_honeycomb_table_500',
    name: 'Cloudray Pro Large Aluminum Honeycomb Table with Steel Backing Plate (500x500mm)',
    slug: 'cloudray-pro-aluminum-honeycomb-table-500x500mm',
    category_id: 'cat_hardware',
    description: 'Large-format Cloudray honeycomb working bed for expanded work areas (500x500mm). Perfect for larger laser cutters like xTool S1, Falcon 2, and CO2 machines. Includes heavy-gauge galvanized steel desktop shield.',
    price: 69.90,
    compare_at_price: 94.90,
    cost_price: 34.00,
    supplier_sku: 'CR-HB-500-EU',
    badge: 'Large Format',
    laser_type: 'Universal Diode & CO2',
    recommended_power: 'Expanded 500x500mm Working Area',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/products/HoneycombTable_1.jpg?v=1623460960&width=1200'
    ],
    cj_pid: 'CR-HB-500',
    name_i18n: {
      en: 'Cloudray Pro Large Aluminum Honeycomb Table with Steel Backing Plate (500x500mm)',
      lt: 'Cloudray didelio formato aliuminio korio stalas su plieno plokšte (500x500mm)'
    },
    description_i18n: {
      en: 'Large-format Cloudray honeycomb working bed for expanded work areas (500x500mm). Perfect for larger laser cutters like xTool S1, Falcon 2, and CO2 machines. Includes heavy-gauge galvanized steel desktop shield.',
      lt: 'Didelio formato (500x500mm) Cloudray korio stalas su plienine apsaugine plokšte. Puikiai tinka didesnio ploto diodinėms staklėms ir CO2 lazeriams.'
    }
  },
  {
    id: 'prod_cloudray_air_compressor_pump',
    name: 'Cloudray Electromagnetic Air Assist Compressor Pump (ACO Series, 60W / 70L/min)',
    slug: 'cloudray-electromagnetic-air-assist-pump-60w',
    category_id: 'cat_hardware',
    description: 'Genuine Cloudray high-flow electromagnetic air compressor pump. Produces powerful continuous airflow to the laser cutting nozzle, instantly blowing away hot smoke and charred debris. Yields razor-sharp, ultra-clean wood and acrylic cuts without edge burning.',
    price: 48.90,
    compare_at_price: 68.00,
    cost_price: 23.00,
    supplier_sku: 'CR-AIR-ACO-60W',
    badge: 'Clean Cut Must-Have',
    laser_type: 'Universal 220V/240V EU Plug for Diode & CO2 Lasers',
    recommended_power: 'Power: 60W, Flow: >70L/min, Pressure: >0.035MPa',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/products/Air-Compressor-1.jpg?v=1658479228&width=1000'
    ],
    cj_pid: 'CR-AIR-60W',
    name_i18n: {
      en: 'Cloudray Electromagnetic Air Assist Compressor Pump (ACO Series, 60W / 70L/min)',
      lt: 'Cloudray elektromagnetinis oro pūtimo kompresorius („Air Assist“ 60W / 70L/min)'
    },
    description_i18n: {
      en: 'Genuine Cloudray high-flow electromagnetic air compressor pump. Produces powerful continuous airflow to the laser cutting nozzle, instantly blowing away hot smoke and charred debris. Yields razor-sharp, ultra-clean wood and acrylic cuts without edge burning.',
      lt: 'Originalus Cloudray elektromagnetinis kompresorius lazeriniam apdirbimui. Galingas 70L/min oro srautas nupučia dūmus ir nuodegulius tiesiai iš pjovimo taško – mediena lieka švari, o akrilo briaunos skaidrios.'
    }
  },
  {
    id: 'prod_rotary_roller_jig',
    name: 'Cloudray CNC All-Metal Y-Axis Laser Rotary Roller with Multi-Level Adjustment',
    slug: 'cloudray-all-metal-y-axis-laser-rotary-roller',
    category_id: 'cat_hardware',
    description: 'Plug-and-play Y-axis dual-wheel rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. 7-position adjustable rollers engrave tumblers, bottles, mugs, and pens from 4mm to 160mm diameter effortlessly.',
    price: 36.90,
    compare_at_price: 49.90,
    cost_price: 15.00,
    supplier_sku: 'CJJZGJHJ00008',
    badge: 'Tumbler Essential',
    laser_type: 'Universal Diode & CO2 Y-Axis',
    recommended_power: 'NEMA 17 Stepper Motor, Includes 4 Riser Legs',
    images: [
      'https://cf.cjdropshipping.com/15306336/3735674278050.jpg'
    ],
    cj_pid: 'D2FF4A4C-6FA2-4A8D-86D6-B5D8D3C1B4F5',
    name_i18n: {
      en: 'Cloudray CNC All-Metal Y-Axis Laser Rotary Roller with Multi-Level Adjustment',
      lt: 'Cloudray metalinis CNC sukamasis ritinėlis cilindriniams daiktams (Y-ašis)'
    },
    description_i18n: {
      en: 'Plug-and-play Y-axis dual-wheel rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. 7-position adjustable rollers engrave tumblers, bottles, mugs, and pens from 4mm to 160mm diameter effortlessly.',
      lt: 'Tvirtas metalinis rotacinis ritinėlis cilindriniams daiktams (termosams, stiklinėms, buteliams). Lengvai prijungiamas prie xTool, Ortur, Creality, Atomstack ir CO2 staklių Y ašies.'
    }
  },
  {
    id: 'prod_cloudray_exhaust_inline_fan',
    name: 'Cloudray Industrial High-Velocity Smoke Exhaust Inline Fan (100mm / 4-Inch)',
    slug: 'cloudray-industrial-smoke-exhaust-inline-fan-4inch',
    category_id: 'cat_hardware',
    description: 'Heavy duty inline exhaust fan designed for laser cutter smoke extraction systems. Moves up to 220 CFM with low vibration and high static pressure to pull laser fumes outside via flexible ducting.',
    price: 42.90,
    compare_at_price: 59.90,
    cost_price: 19.50,
    supplier_sku: 'CR-FAN-100-EU',
    badge: 'Odor & Smoke Free',
    laser_type: 'Universal 100mm (4") Ducting',
    recommended_power: 'High Airflow 220 CFM, Low Noise Impeller',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/products/Industrial-Fan_1.jpg'
    ],
    cj_pid: 'CR-FAN-100',
    name_i18n: {
      en: 'Cloudray Industrial High-Velocity Smoke Exhaust Inline Fan (100mm / 4-Inch)',
      lt: 'Cloudray pramoninis dūmų ištraukimo ventiliatorius lazerinėms staklėms (100mm)'
    },
    description_i18n: {
      en: 'Heavy duty inline exhaust fan designed for laser cutter smoke extraction systems. Moves up to 220 CFM with low vibration and high static pressure to pull laser fumes outside via flexible ducting.',
      lt: 'Galingas kanalo tipo dūmų ištraukimo ventiliatorius lazeriams. Užtikrina 220 CFM trauką, efektyviai pašalina dūmus bei kvapus pro langą ar ventiliacijos angą.'
    }
  },

  // =========================================================================
  // 2. CLOUDRAY OPTICS, MIRRORS & LENS CARE
  // =========================================================================
  {
    id: 'prod_cloudray_znse_lens_20mm',
    name: 'Cloudray USA CVD ZnSe Optical Laser Focus Lens (Dia: 20mm, FL: 50.8mm / 2.0")',
    slug: 'cloudray-usa-cvd-znse-laser-focus-lens-dia-20mm-fl-50-8mm',
    category_id: 'cat_optics_safety',
    description: 'Genuine USA CVD Zinc Selenide (ZnSe) optical focus lens for CO2 laser cutting and engraving machines (30W - 150W). Precision double-sided AR (Anti-Reflective) coating delivers ultra-high >99.5% laser transmittance and micro-sized focal spot.',
    price: 26.90,
    compare_at_price: 36.00,
    cost_price: 11.50,
    supplier_sku: 'CR-LENS-USA-20-50',
    badge: 'High Repeat Orders',
    laser_type: 'CO2 Laser (10.6um Wavelength)',
    recommended_power: 'Double-Sided AR Coating, Transmittance >99.5%',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/files/CO2-Focus-Lens-2.jpg?v=1697189733&width=1000'
    ],
    cj_pid: 'CR-LENS-20',
    name_i18n: {
      en: 'Cloudray USA CVD ZnSe Optical Laser Focus Lens (Dia: 20mm, FL: 50.8mm / 2.0")',
      lt: 'Cloudray USA CVD ZnSe CO2 lazerio fokusavimo lęšis (D: 20mm, F: 50.8mm)'
    },
    description_i18n: {
      en: 'Genuine USA CVD Zinc Selenide (ZnSe) optical focus lens for CO2 laser cutting and engraving machines (30W - 150W). Precision double-sided AR (Anti-Reflective) coating delivers ultra-high >99.5% laser transmittance and micro-sized focal spot.',
      lt: 'Originalus Cloudray ZnSe (cinko selenido) lęšis CO2 lazerinėms staklėms (30W–150W). Dvišalė antirefleksinė danga praleidžia >99.5% spindulio energijos ir užtikrina itin smulkų, aštrų pjovimo tašką.'
    }
  },
  {
    id: 'prod_cloudray_mo_mirrors_3pack',
    name: 'Cloudray Molybdenum (Mo) Ultra-Durable Reflective Mirrors (Dia: 20mm / 25mm, 3-Pack)',
    slug: 'cloudray-molybdenum-mo-reflective-mirrors-3pack',
    category_id: 'cat_optics_safety',
    description: 'Solid Molybdenum high-durability reflective laser mirrors for CO2 laser machines. Uncoated 100% solid polished metal makes them impervious to scratching and capable of enduring extreme heat and harsh workshop wiping.',
    price: 24.90,
    compare_at_price: 35.00,
    cost_price: 9.80,
    supplier_sku: 'CR-MO-MIRROR-3PK',
    badge: 'Scratch Resistant',
    laser_type: 'CO2 Lasers (40W - 150W)',
    recommended_power: 'Solid Molybdenum Metal, 3-Piece Set',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/products/sku_93aa5470-1997-4df0-9777-b43d0376fbd2.jpg?v=1723543196&width=1000'
    ],
    cj_pid: 'CR-MO-MIRROR',
    name_i18n: {
      en: 'Cloudray Molybdenum (Mo) Ultra-Durable Reflective Mirrors (Dia: 20mm / 25mm, 3-Pack)',
      lt: 'Cloudray molibdeno (Mo) atspindintys veidrodžiai CO2 lazeriams (3 vnt. rinkinys)'
    },
    description_i18n: {
      en: 'Solid Molybdenum high-durability reflective laser mirrors for CO2 laser machines. Uncoated 100% solid polished metal makes them impervious to scratching and capable of enduring extreme heat and harsh workshop wiping.',
      lt: 'Masyvaus poliruoto molibdeno (Mo) veidrodžiai CO2 lazerinėms staklėms. Neturi lengvai pažeidžiamų dangų – itin atsparūs įbrėžimams, karščiui ir dažnam valymui.'
    }
  },
  {
    id: 'prod_cloudray_safety_glasses_od6',
    name: 'Cloudray CE Certified Laser Protection Safety Goggles (OD 6+, 190-540nm & 800-1100nm)',
    slug: 'cloudray-ce-certified-laser-safety-goggles-od6',
    category_id: 'cat_optics_safety',
    description: 'European CE EN207 certified safety glasses engineered by Cloudray. Specifically blocks dangerous 405nm-450nm blue diode laser radiation and 1064nm infrared fiber lasers. Optical Density OD 6+ with wraparound side coverage shields eyes from diffuse and specular reflections.',
    price: 22.90,
    compare_at_price: 32.00,
    cost_price: 7.80,
    supplier_sku: 'CR-SAFETY-OD6',
    badge: 'CE EN207 Certified',
    laser_type: 'Diode 450nm / Fiber 1064nm / UV',
    recommended_power: 'OD 6+ Protection Rating with Hard Case & Cleaning Cloth',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/files/Laser-Safety-Goggles-1_87ffcb54-7fbb-48ad-84f4-bf34f4a5304e.jpg?v=1735870054&width=1000'
    ],
    cj_pid: 'CR-GLASSES-OD6',
    name_i18n: {
      en: 'Cloudray CE Certified Laser Protection Safety Goggles (OD 6+, 190-540nm & 800-1100nm)',
      lt: 'Cloudray CE sertifikuoti apsauginiai lazerio akiniai meistrams (OD 6+, 190-540nm / 800-1100nm)'
    },
    description_i18n: {
      en: 'European CE EN207 certified safety glasses engineered by Cloudray. Specifically blocks dangerous 405nm-450nm blue diode laser radiation and 1064nm infrared fiber lasers. Optical Density OD 6+ with wraparound side coverage shields eyes from diffuse and specular reflections.',
      lt: 'Sertifikuoti CE EN207 apsauginiai akiniai darbui su mėlynaisiais diodiniais (450nm) ir skaiduliniais Fiber (1064nm) lazeriais. OD 6+ optinis tankis su pilna šonine apsauga nuo pavojingų atspindžių.'
    }
  },
  {
    id: 'prod_cloudray_lens_cleaning_wipes',
    name: 'Cloudray Pre-Moistened Optical Lens Cleaning Wipes for Laser Optics (50-Pack)',
    slug: 'cloudray-optical-lens-cleaning-wipes-50pack',
    category_id: 'cat_optics_safety',
    description: 'Lint-free pre-saturated optical cleaning wipes formulated specifically for ZnSe lenses, protective glass shields, and mirrors. Dissolves smoke soot, sticky wood resins, and oil without scratching or leaving residue.',
    price: 11.90,
    compare_at_price: 16.50,
    cost_price: 3.80,
    supplier_sku: 'CR-WIPES-50',
    badge: 'High Margin Add-on',
    laser_type: 'Safe for all Optical Glasses & Mirrors',
    recommended_power: '50 Individually Sealed Foil Packets',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/files/Lens-Cleaning-Wipe-2.jpg?v=1727170758&width=1000'
    ],
    cj_pid: 'CR-WIPES-50',
    name_i18n: {
      en: 'Cloudray Pre-Moistened Optical Lens Cleaning Wipes for Laser Optics (50-Pack)',
      lt: 'Cloudray optinių lęšių ir veidrodžių valymo servetėlės (50 vnt. pakuotė)'
    },
    description_i18n: {
      en: 'Lint-free pre-saturated optical cleaning wipes formulated specifically for ZnSe lenses, protective glass shields, and mirrors. Dissolves smoke soot, sticky wood resins, and oil without scratching or leaving residue.',
      lt: 'Specialios nepūkuojančios drėgnos servetėlės lazerio optikai. Švelniai ir greitai nuvalo dūmų apnašas, medžio dervas bei dulkes nuo ZnSe lęšių ir apsauginių stikliukų jų nesubraižant.'
    }
  },

  // =========================================================================
  // 3. LASER MARKING CONSUMABLES & COLOR PAPERS
  // =========================================================================
  {
    id: 'prod_cloudray_color_marking_paper',
    name: 'Cloudray Laser Marking Color Transfer Paper for Glass, Ceramics & Metal (5-Sheet Pack)',
    slug: 'cloudray-laser-marking-color-transfer-paper-5pack',
    category_id: 'cat_metal',
    description: 'Enables diode and fiber lasers to engrave vivid permanent black, blue, and gold colors onto transparent glass mugs, ceramic plates, tiles, and stainless steel. Soak in water, apply, laser engrave, and peel clean.',
    price: 14.90,
    compare_at_price: 21.00,
    cost_price: 4.50,
    supplier_sku: 'CR-MARK-PAPER-5',
    badge: 'Trending Craft',
    laser_type: 'Diode / Fiber / CO2 on Glass, Ceramic & Crystal',
    recommended_power: 'Fast Water-Transfer Application',
    images: [
      'https://www.cloudraylaser.com/cdn/shop/files/Transfer-Paper-for-Crafts-1.jpg'
    ],
    cj_pid: 'CR-MARK-PAPER',
    name_i18n: {
      en: 'Cloudray Laser Marking Color Transfer Paper for Glass, Ceramics & Metal (5-Sheet Pack)',
      lt: 'Cloudray lazerinio spalvoto graviravimo popierius stiklui, keramikai ir metalui (5 vnt.)'
    },
    description_i18n: {
      en: 'Enables diode and fiber lasers to engrave vivid permanent black, blue, and gold colors onto transparent glass mugs, ceramic plates, tiles, and stainless steel. Soak in water, apply, laser engrave, and peel clean.',
      lt: 'Leidžia paprastiems diodiniams lazeriams išgauti ryškius juodus ir spalvotus užrašus ant skaidraus stiklo, keramikos ir metalo. Vandens pagrindo perkėlimas – atveria visiškai naują gaminių asortimentą dirbtuvėms.'
    }
  }
];
