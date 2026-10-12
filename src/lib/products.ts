import { Product } from '@/types/product';

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. LASER HARDWARE, MODULES & ACCESSORIES
  // ==========================================
  {
    id: 'prod_cloudray_honeycomb_400',
    name: 'Pro Aluminum Honeycomb Working Bed with Steel Protection Plate (400x400mm)',
    slug: 'pro-aluminum-honeycomb-working-bed-400x400mm',
    category_id: 'cat_hardware',
    description: 'Industrial-grade honeycomb work table engineered for diode and CO2 lasers. Rapid heat dissipation and smoke exhaust design prevent underside scorching. Includes galvanized steel desk protector sheet and 4 corner protectors.',
    price: 49.90,
    compare_at_price: 69.90,
    cost_price: 24.50,
    supplier_sku: 'CR-HB-400-EU',
    badge: 'Pro Essential',
    laser_type: 'Diode / CO2 (xTool, Creality, Ortur, Sculpfun, Atomstack)',
    recommended_power: 'Heavy Duty Frame with Precision Millimeter Rulers',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'CR-HB-400',
    name_i18n: {
      en: 'Pro Aluminum Honeycomb Working Bed with Steel Protection Plate (400x400mm)',
      lt: 'Profesionalus aliuminio korio stalas su plienine apsaugine plokšte (400x400mm)'
    },
    description_i18n: {
      en: 'Industrial-grade honeycomb work table engineered for diode and CO2 lasers. Rapid heat dissipation and smoke exhaust design prevent underside scorching. Includes galvanized steel desk protector sheet and 4 corner protectors.',
      lt: 'Pramoninio lygio korio pagrindo stalas diodiniams ir CO2 lazeriams. Greitas dūmų ištraukimas ir šilumos išsklaidymas apsaugo ruošinių nugarėlę nuo apdegimo. Komplekte – cinkuota plieno plokštė stalo apsaugai.'
    }
  },
  {
    id: 'prod_air_assist_pump_30l',
    name: 'Smart Air Assist Pump Kit with Adjustable Flow Regulator (30L/min)',
    slug: 'smart-air-assist-pump-kit-30l-min',
    category_id: 'cat_hardware',
    description: 'High-pressure silent diaphragm air assist pump. Delivers steady 30L/min high-velocity airflow directly to the cutting zone, eliminating charring, yellow burns, and lens contamination. Compatible with LightBurn M8 solenoid control.',
    price: 39.50,
    compare_at_price: 55.00,
    cost_price: 18.20,
    supplier_sku: 'CR-AIR-30L-EU',
    badge: 'Clean Cut',
    laser_type: 'Universal 12V/24V Diode Lasers',
    recommended_power: 'Airflow: 30 L/min, Pressure: >0.03MPa, Silent <40dB',
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'CR-AIR-30L',
    name_i18n: {
      en: 'Smart Air Assist Pump Kit with Adjustable Flow Regulator (30L/min)',
      lt: 'Oro pūtimo kompresoriaus rinkinys su reguliatoriumi („Air Assist“ 30L/min)'
    },
    description_i18n: {
      en: 'High-pressure silent diaphragm air assist pump. Delivers steady 30L/min high-velocity airflow directly to the cutting zone, eliminating charring, yellow burns, and lens contamination. Compatible with LightBurn M8 solenoid control.',
      lt: 'Tylus diafragminis kompresorius, tiekiantis 30L/min oro srautą tiesiai į lazerio pjovimo tašką. Pašalina suodžius, apsaugo nuo medienos apdegimo ir prailgina lęšio tarnavimo laiką.'
    }
  },
  {
    id: 'prod_rotary_roller_jig',
    name: 'All-Metal CNC Laser Rotary Roller with Height Raisers & Cable Kit',
    slug: 'all-metal-cnc-laser-rotary-roller-kit',
    category_id: 'cat_hardware',
    description: 'Plug-and-play Y-axis dual-wheel rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. 7-position adjustable rollers engrave tumblers, bottles, mugs, and pens from 4mm to 160mm diameter effortlessly.',
    price: 34.90,
    compare_at_price: 49.00,
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
      en: 'All-Metal CNC Laser Rotary Roller with Height Raisers & Cable Kit',
      lt: 'Metalinis CNC sukamasis ritinėlis cilindriniams daiktams (Y-ašis)'
    },
    description_i18n: {
      en: 'Plug-and-play Y-axis dual-wheel rotary module compatible with xTool, Ortur, Creality, Atomstack, and Sculpfun. 7-position adjustable rollers engrave tumblers, bottles, mugs, and pens from 4mm to 160mm diameter effortlessly.',
      lt: 'Greito pajungimo Y-ašies rotacinis modulis, suderinamas su visomis populiariausiomis staklėmis. 7 reguliuojamos padėtys leidžia graviruoti termosus, taures, butelius ir tušinukus nuo 4mm iki 160mm.'
    }
  },
  {
    id: 'prod_honeycomb_holddown_pins',
    name: 'Precision Honeycomb Bed Hold-Down Material Pins (50-Pack)',
    slug: 'precision-honeycomb-bed-hold-down-pins-50pack',
    category_id: 'cat_hardware',
    description: 'Flexible tapered friction pins designed to lock bowed plywood, acrylic, and leather flat onto standard 7.5mm - 9.5mm honeycomb grids. Ensures razor-sharp focal consistency across large engraving jobs.',
    price: 12.90,
    compare_at_price: 18.00,
    cost_price: 3.50,
    supplier_sku: 'HC-PINS-50',
    badge: 'Warp Fixer',
    laser_type: 'Compatible with all Honeycomb Panels',
    recommended_power: 'High-Temperature POM Material',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'HC-PINS-50',
    name_i18n: {
      en: 'Precision Honeycomb Bed Hold-Down Material Pins (50-Pack)',
      lt: 'Medžiagos fiksavimo kaiščiai korio stalui (50 vnt.)'
    },
    description_i18n: {
      en: 'Flexible tapered friction pins designed to lock bowed plywood, acrylic, and leather flat onto standard 7.5mm - 9.5mm honeycomb grids. Ensures razor-sharp focal consistency across large engraving jobs.',
      lt: 'Tvirti kūginiai kaiščiai, skirti išsilenkusios faneros ar akrilo prispaudimui prie korio stalo. Užtikrina idealiai lygų medžiagos paviršių ir tikslų fokusą visame plote.'
    }
  },

  // ==========================================
  // 2. OPTICS & LASER SAFETY
  // ==========================================
  {
    id: 'prod_laser_safety_goggles_od6',
    name: 'Certified Professional Laser Safety Glasses (190-540nm & 800-1100nm, OD 6+ CE)',
    slug: 'certified-laser-safety-glasses-od6-ce',
    category_id: 'cat_optics_safety',
    description: 'European CE certified EN207 optical radiation safety goggles. Specifically designed for 450nm blue diode lasers and 1064nm infrared fiber lasers. Optical Density OD 6+ with high visible light transmission (VLT 30%) and side reflection shields.',
    price: 18.90,
    compare_at_price: 26.50,
    cost_price: 5.80,
    supplier_sku: 'CJJJJTJT56053',
    badge: 'CE EN207 Certified',
    laser_type: 'Diode 405nm-450nm / Fiber 1064nm / CO2',
    recommended_power: 'OD 6+ Protection Rating with Hard Shell Case',
    images: [
      'https://cf.cjdropshipping.com/1613655958249.png',
      'https://cf.cjdropshipping.com/1618573114450.jpg'
    ],
    cj_pid: '13F4F27B-CB94-441E-9472-0537D8F64E96',
    name_i18n: {
      en: 'Certified Professional Laser Safety Glasses (190-540nm & 800-1100nm, OD 6+ CE)',
      lt: 'Sertifikuoti apsauginiai lazerio akiniai meistrams (OD 6+, 190-540nm / 800-1100nm)'
    },
    description_i18n: {
      en: 'European CE certified EN207 optical radiation safety goggles. Specifically designed for 450nm blue diode lasers and 1064nm infrared fiber lasers. Optical Density OD 6+ with high visible light transmission (VLT 30%) and side reflection shields.',
      lt: 'Aukščiausio lygio sertifikuoti apsauginiai akiniai darbui su 450nm mėlynaisiais diodiniais ir 1064nm infraraudonaisiais skaiduliniais lazeriais. OD 6+ optinis tankis su pilna šonine apsauga nuo pavojingų atspindžių.'
    }
  },
  {
    id: 'prod_co2_znse_focus_lens',
    name: 'CVD ZnSe High-Precision Laser Focus Lens (Dia 20mm, FL 50.8mm / 2.0")',
    slug: 'cvd-znse-laser-focus-lens-dia-20mm-fl-50-8mm',
    category_id: 'cat_optics_safety',
    description: 'High-transmittance USA CVD Zinc Selenide (ZnSe) optical focus lens for CO2 laser cutting machines (40W - 150W). Double-sided anti-reflective coating guarantees >99.5% laser transmission and tiny focal spot size.',
    price: 24.50,
    compare_at_price: 35.00,
    cost_price: 9.80,
    supplier_sku: 'CR-LENS-20-50',
    badge: 'Pro Optics',
    laser_type: 'CO2 Laser (10.6um Wavelength)',
    recommended_power: 'Double Sided AR Coating, Diameter 20mm, FL 50.8mm',
    images: [
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'CR-LENS-20',
    name_i18n: {
      en: 'CVD ZnSe High-Precision Laser Focus Lens (Dia 20mm, FL 50.8mm / 2.0")',
      lt: 'CVD ZnSe didelio tikslumo CO2 lazerio fokusavimo lęšis (D: 20mm, F: 50.8mm)'
    },
    description_i18n: {
      en: 'High-transmittance USA CVD Zinc Selenide (ZnSe) optical focus lens for CO2 laser cutting machines (40W - 150W). Double-sided anti-reflective coating guarantees >99.5% laser transmission and tiny focal spot size.',
      lt: 'Aukštos kokybės ZnSe (cinko selenido) lęšis CO2 lazerinėms staklėms. Dvišalė antirefleksinė danga praleidžia >99.5% spindulio, užtikrina itin smulkų pjovimo tašką ir švarų rezultatą.'
    }
  },

  // ==========================================
  // 3. LASERABLE DRINKWARE & TUMBLERS
  // ==========================================
  {
    id: 'prod_matte_tumbler_20oz_6pack',
    name: 'Matte Powder-Coated Double-Wall Stainless Steel Tumbler Blanks (20oz, 6-Pack)',
    slug: 'matte-powder-coated-stainless-steel-tumblers-20oz-6pack',
    category_id: 'cat_drinkware',
    description: 'Vacuum insulated 18/8 food-grade stainless steel tumblers engineered specifically for laser rotary engraving. Ultra-durable powder coat vaporizes cleanly under diode or fiber lasers to reveal shining, brilliant silver steel underneath.',
    price: 36.90,
    compare_at_price: 52.00,
    cost_price: 14.20,
    supplier_sku: 'CJYD1899120',
    badge: '#1 Maker Seller',
    laser_type: 'Diode / Fiber / CO2 Rotary',
    recommended_power: '10W Diode (Speed 2500mm/min, Power 50%, 0.08mm interval)',
    images: [
      'https://cf.cjdropshipping.com/83279168/1932148113812.jpg',
      'https://cf.cjdropshipping.com/83279168/1932148113813.jpg'
    ],
    cj_pid: '8B51FE71-709D-4247-9D6F-14C8360699FA',
    name_i18n: {
      en: 'Matte Powder-Coated Double-Wall Stainless Steel Tumbler Blanks (20oz, 6-Pack)',
      lt: 'Matiniai termo puodelių ruošiniai lazeriniam graviravimui (20oz / 600ml, 6 vnt.)'
    },
    description_i18n: {
      en: 'Vacuum insulated 18/8 food-grade stainless steel tumblers engineered specifically for laser rotary engraving. Ultra-durable powder coat vaporizes cleanly under diode or fiber lasers to reveal shining, brilliant silver steel underneath.',
      lt: 'Dvigubų sienelių vakuuminiai nerūdijančio plieno termo puodeliai su milteliniu padengimu. Lazeriu graviruojant dažai švariai nupjaunami, atverdami blizgantį plieną be jokio pridegimo.'
    }
  },
  {
    id: 'prod_stainless_flasks_5',
    name: 'Matte Black Coated Stainless Steel Pocket Hip Flasks (5-Pack, 8oz)',
    slug: 'matte-black-stainless-steel-hip-flasks-5pack-8oz',
    category_id: 'cat_drinkware',
    description: 'Laser-grade brushed and matte powder-coated stainless steel hip flasks with leak-proof screw caps. Top choice for wedding parties, groomsmen gifts, and personalized merchandise.',
    price: 14.80,
    compare_at_price: 21.00,
    cost_price: 5.15,
    supplier_sku: 'CJJJJTCC01291',
    badge: 'Gift Bestseller',
    laser_type: 'Fiber / Diode 10W+ / CO2',
    recommended_power: 'Speed 2500mm/min, Power 45%',
    images: [
      'https://cf.cjdropshipping.com/2053/1385300482847.jpg',
      'https://cf.cjdropshipping.com/2053/14737211984417.jpg'
    ],
    cj_pid: 'FD6C2E42-A8F9-4772-B5F8-4660D972FF85',
    name_i18n: {
      en: 'Matte Black Coated Stainless Steel Pocket Hip Flasks (5-Pack, 8oz)',
      lt: 'Matinės juodos plieninės kišeninės gertuvės graviravimui (5 vnt., 240ml)'
    },
    description_i18n: {
      en: 'Laser-grade brushed and matte powder-coated stainless steel hip flasks with leak-proof screw caps. Top choice for wedding parties, groomsmen gifts, and personalized merchandise.',
      lt: 'Nerūdijančio plieno gertuvės su matine juoda danga. Populiariausias pasirinkimas vestuvių dovanoms, inicialams ir vyriškiems aksesuarams.'
    }
  },

  // ==========================================
  // 4. WOOD, PLYWOOD & HARDWOOD BLANKS
  // ==========================================
  {
    id: 'prod_basswood_sheets_3mm_20',
    name: 'Premium A-Grade Laser Basswood Plywood Sheets (300x300x3mm, 20-Pack)',
    slug: 'premium-a-grade-laser-basswood-sheets-3mm-20pack',
    category_id: 'cat_wood',
    description: 'Selected multi-layer natural basswood sheets calibrated specifically for laser cutting. Triple-inspected with zero internal glue voids, no warping, and silky smooth pre-sanded faces. Cuts with clean golden edges and minimal smoke charring.',
    price: 28.50,
    compare_at_price: 39.90,
    cost_price: 11.20,
    supplier_sku: 'CJWDSN00142',
    badge: 'Zero Core Voids',
    laser_type: 'Diode 5W+ / CO2',
    recommended_power: '10W Diode: 1 Pass at 350mm/min 100% Power',
    images: [
      'https://cf.cjdropshipping.com/15291264/3371900115049.jpg',
      'https://cf.cjdropshipping.com/15291264/3268846115049.jpg'
    ],
    cj_pid: '9C51FB43-7D1C-466C-BF07-160B5433C401',
    name_i18n: {
      en: 'Premium A-Grade Laser Basswood Plywood Sheets (300x300x3mm, 20-Pack)',
      lt: 'A-Klasės liepos faneros plokštės lazeriniam pjovimui (300x300x3mm, 20 vnt.)'
    },
    description_i18n: {
      en: 'Selected multi-layer natural basswood sheets calibrated specifically for laser cutting. Triple-inspected with zero internal glue voids, no warping, and silky smooth pre-sanded faces. Cuts with clean golden edges and minimal smoke charring.',
      lt: 'Aukščiausios kokybės lygi liepos fanera be klijų kišenių ar šakų. Užtikrina lengvą vieno praėjimo pjovimą, lygius auksinius kraštus ir švarų graviravimą.'
    }
  },
  {
    id: 'prod_solid_wood_parquet_board',
    name: 'End-Grain Hardwood Mosaic Cutting & Serving Board Blanks (2-Pack)',
    slug: 'end-grain-hardwood-mosaic-cutting-board-blanks-2pack',
    category_id: 'cat_wood',
    description: 'Solid heavy mosaic hardwood butcher blocks with natural grain variations. Smooth planed raw surface, ready for laser pyrography branding and food oil finishing.',
    price: 21.90,
    compare_at_price: 30.00,
    cost_price: 8.21,
    supplier_sku: 'CJJJCFCJ00820',
    badge: 'Master Woodcraft',
    laser_type: 'Diode / CO2',
    recommended_power: 'Speed 2000mm/min, Power 45%',
    images: [
      'https://cf.cjdropshipping.com/2058/1037042754775.png',
      'https://cf.cjdropshipping.com/15722784/952632820272.jpg'
    ],
    cj_pid: 'FB3F3312-20B6-4BFB-BBDF-09D78243FEEA',
    name_i18n: {
      en: 'End-Grain Hardwood Mosaic Cutting & Serving Board Blanks (2-Pack)',
      lt: 'Mozaikinio kietmedžio pjaustymo ir serviravimo lentelių ruošiniai (2 vnt.)'
    },
    description_i18n: {
      en: 'Solid heavy mosaic hardwood butcher blocks with natural grain variations. Smooth planed raw surface, ready for laser pyrography branding and food oil finishing.',
      lt: 'Masyvios kietmedžio lentelės su natūraliais medienos raštais. Lygiai nuobliuotas paviršius, idealiai tinkantis giluminiam lazeriniam graviravimui ir aliejavimui.'
    }
  },
  {
    id: 'prod_ceramic_marble_coasters_6',
    name: 'Absorbent Ceramic Stone Coasters with Cork Backing & Metal Stand (Set of 6)',
    slug: 'absorbent-ceramic-stone-coasters-cork-backing-metal-stand-6set',
    category_id: 'cat_wood',
    description: 'Heavy absorbent stoneware ceramic drink coasters with non-slip cork base and black metal organizer holder. High temperature laser marking compatible.',
    price: 8.90,
    compare_at_price: 12.50,
    cost_price: 3.04,
    supplier_sku: 'CJJT2135179',
    badge: 'Complete Set',
    laser_type: 'Diode (with marking compound) / CO2 / UV',
    recommended_power: 'Speed 1200mm/min, Power 65%',
    images: [
      'https://cf.cjdropshipping.com/bb615633-5da4-4ccb-8c4b-ec5c67916d89.jpg',
      'https://cf.cjdropshipping.com/eb594efb-e961-478d-a98b-9ad9db422424.jpg'
    ],
    cj_pid: '1834046188929568768',
    name_i18n: {
      en: 'Absorbent Ceramic Stone Coasters with Cork Backing & Metal Stand (Set of 6)',
      lt: 'Keraminiai sugeriantys padėkliukai su kamštiniu pagrindu ir metaliniu stovu (6 vnt. rinkinys)'
    },
    description_i18n: {
      en: 'Heavy absorbent stoneware ceramic drink coasters with non-slip cork base and black metal organizer holder. High temperature laser marking compatible.',
      lt: 'Sugerintys keraminiai gėrimų padėkliukai su neslystančia kamštine nugarėle ir metaliniu stovu. Tinka graviravimui su žymėjimo pasta arba CO2/UV lazeriu.'
    }
  },

  // ==========================================
  // 5. ANODIZED METALS & CARDS
  // ==========================================
  {
    id: 'prod_metal_cards_100',
    name: 'Matte Black Anodized Aluminum Business Card Blanks (0.22mm, 100-Pack)',
    slug: 'matte-black-anodized-aluminum-business-cards-100pack',
    category_id: 'cat_metal',
    description: 'High-precision 0.22mm matte anodized aircraft aluminum cards. Delivers razor-sharp, brilliant silver contrast when engraved with Diode, Fiber, or CO2 lasers. Rounded safety corners with burr-free chamfered edges.',
    price: 8.90,
    compare_at_price: 12.90,
    cost_price: 1.80,
    supplier_sku: 'CJBHNSNS10796',
    badge: 'Bestseller',
    laser_type: 'Diode / Fiber / CO2',
    recommended_power: '10W+ (Speed 3000mm/min, Power 35%)',
    images: [
      'https://cf.cjdropshipping.com/20200113/1305762905903.jpg',
      'https://cf.cjdropshipping.com/20200113/3688953985970.jpg'
    ],
    cj_pid: 'F6F054F3-9440-4FCE-9844-31512596B2CC',
    name_i18n: {
      en: 'Matte Black Anodized Aluminum Business Card Blanks (0.22mm, 100-Pack)',
      lt: 'Matinio juodo anoduoto aliuminio vizitinių kortelių ruošiniai (100 vnt.)'
    },
    description_i18n: {
      en: 'High-precision 0.22mm matte anodized aircraft aluminum cards. Delivers razor-sharp, brilliant silver contrast when engraved with Diode, Fiber, or CO2 lasers. Rounded safety corners with burr-free chamfered edges.',
      lt: 'Aukščiausio tikslumo 0.22mm anoduoto aliuminio kortelės su užapvalintais kampais. Lazeriu graviruojant atsiveria itin ryškus, švarus sidabrinis kontrastas.'
    }
  },
  {
    id: 'prod_metal_wallet_clip',
    name: 'Minimalist Aluminum Card Holder & RFID Money Clip Blanks (10-Pack)',
    slug: 'minimalist-aluminum-card-holder-money-clip-blanks-10pack',
    category_id: 'cat_metal',
    description: 'Minimalist spring-steel and aircraft aluminum smart wallet blanks. Smooth bead-blasted surface designed for laser personalized logos and initials.',
    price: 11.90,
    compare_at_price: 16.50,
    cost_price: 3.50,
    supplier_sku: 'CJQB1779981',
    badge: 'Trending Tech',
    laser_type: 'Fiber / Diode 10W+',
    recommended_power: 'Speed 2000mm/min, Power 50%',
    images: [
      'https://cf.cjdropshipping.com/09c4a77f-37ad-4d07-8315-e1cafa646a82.jpg',
      'https://cf.cjdropshipping.com/quick/product/d09f7bcb-d95b-478e-bafd-611fb97efcb9.jpg'
    ],
    cj_pid: '1669613206655995904',
    name_i18n: {
      en: 'Minimalist Aluminum Card Holder & RFID Money Clip Blanks (10-Pack)',
      lt: 'Aliuminio kortelių dėklų ir RFID pinigų segtukų ruošiniai (10 vnt.)'
    },
    description_i18n: {
      en: 'Minimalist spring-steel and aircraft aluminum smart wallet blanks. Smooth bead-blasted surface designed for laser personalized logos and initials.',
      lt: 'Spyruoklinio plieno ir aviacinio aliuminio išmaniosios piniginės ruošiniai. Matinis paviršius, idealiai tinkantis asmeniniams logotipams graviruoti.'
    }
  },

  // ==========================================
  // 6. LASER LEATHERETTE & PATCHES
  // ==========================================
  {
    id: 'prod_leatherette_hat_patches_50',
    name: 'Laserable Leatherette Hat Patches with Heat-Activated Adhesive (50-Pack)',
    slug: 'laserable-leatherette-hat-patches-heat-adhesive-50pack',
    category_id: 'cat_leather',
    description: 'Pre-cut laserable faux leather hat patches backed with commercial heat-activated glue backing. Engraves to a deep contrasting black finish without char bleeding. Heat press directly onto trucker hats, beanies, and jackets.',
    price: 19.90,
    compare_at_price: 28.00,
    cost_price: 6.50,
    supplier_sku: 'CJHS1957749',
    badge: 'Apparel Maker',
    laser_type: 'Diode / CO2',
    recommended_power: 'Diode 10W (Speed 3500mm/min, Power 20%)',
    images: [
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'LP-PATCH-50',
    name_i18n: {
      en: 'Laserable Leatherette Hat Patches with Heat-Activated Adhesive (50-Pack)',
      lt: 'Lazerinės odos kepurių antsiuvai su termo klijų pagrindu (50 vnt.)'
    },
    description_i18n: {
      en: 'Pre-cut laserable faux leather hat patches backed with commercial heat-activated glue backing. Engraves to a deep contrasting black finish without char bleeding. Heat press directly onto trucker hats, beanies, and jackets.',
      lt: 'Specialiai lazeriui sukurti odos antsiuvai su pramoniniais termo klijais nugarėlėje. Graviruojant linijos tampa ryškiai juodos. Su termo presu lengvai užklijuojami ant kepurių ir striukių.'
    }
  },
  {
    id: 'prod_leather_keychains_25',
    name: 'Handcrafted Premium Leatherette Keychains with Heavy Duty Rivet (25-Pack)',
    slug: 'premium-leatherette-keychains-rivet-25pack',
    category_id: 'cat_leather',
    description: 'Durable PU leatherette key fobs fitted with antique bronze split rings. High contrast char when engraved with 450nm blue diode or CO2 lasers.',
    price: 9.90,
    compare_at_price: 14.50,
    cost_price: 3.20,
    supplier_sku: '1430828670343319552',
    badge: 'Maker Favorite',
    laser_type: 'Diode / CO2',
    recommended_power: 'Speed 2800mm/min, Power 25%',
    images: [
      'https://cf.cjdropshipping.com/df756355-61ea-4e57-b8a8-f4f1a349e60c.jpg',
      'https://cf.cjdropshipping.com/36e56192-2c2f-4a64-a8c8-38145fa35d1c.jpg'
    ],
    cj_pid: '1430828670343319552',
    name_i18n: {
      en: 'Handcrafted Premium Leatherette Keychains with Heavy Duty Rivet (25-Pack)',
      lt: 'Rankų darbo odiniai raktų pakabukai su kniedėmis (25 vnt.)'
    },
    description_i18n: {
      en: 'Durable PU leatherette key fobs fitted with antique bronze split rings. High contrast char when engraved with 450nm blue diode or CO2 lasers.',
      lt: 'Kokybiški odos pakabukai su antikvarinio bronzos žiedais. Itin ryškus kontrastas graviruojant diodiniu arba CO2 lazeriu.'
    }
  },

  // ==========================================
  // 7. CAST ACRYLIC & LED BASES
  // ==========================================
  {
    id: 'prod_led_night_light_bases',
    name: 'Solid Natural Beech Wood LED Night Light Bases with USB Switch (5-Pack)',
    slug: 'solid-natural-beech-wood-led-night-light-bases-5pack',
    category_id: 'cat_acrylic',
    description: 'Warm white / RGB illuminated natural solid beech bases with precision 5mm CNC slot for laser engraved cast acrylic panels. Powered by standard USB cable with inline toggle switch.',
    price: 19.50,
    compare_at_price: 28.00,
    cost_price: 6.80,
    supplier_sku: 'CJJZSNSN00292',
    badge: 'Illuminated Art',
    laser_type: 'Universal 5mm Slot for Acrylic',
    recommended_power: 'USB 5V Powered with On/Off Cable',
    images: [
      'https://cf.cjdropshipping.com/20190618/1209072564197.png',
      'https://cf.cjdropshipping.com/20190618/685776241880.png'
    ],
    cj_pid: '22A95739-E5F1-4D94-8288-3EFF67AB64CF',
    name_i18n: {
      en: 'Solid Natural Beech Wood LED Night Light Bases with USB Switch (5-Pack)',
      lt: 'Natūralaus buko medienos LED naktinių lempų pagrindai (5 vnt.)'
    },
    description_i18n: {
      en: 'Warm white / RGB illuminated natural solid beech bases with precision 5mm CNC slot for laser engraved cast acrylic panels. Powered by standard USB cable with inline toggle switch.',
      lt: 'Tvirto natūralaus buko pagrindai su 5mm išpjova graviruotam akrilui. Šiltas LED apšvietimas su USB laidu ir jungikliu.'
    }
  },
  {
    id: 'prod_cast_acrylic_sheets_10pack',
    name: 'Optical Grade Clear Cast Acrylic Sheets with Protective Film (2mm/3mm, 10-Pack)',
    slug: 'optical-grade-clear-cast-acrylic-sheets-10pack',
    category_id: 'cat_acrylic',
    description: '100% pure cast acrylic sheets with paper protective mask on both sides. Cuts with flame-polished crystal-clear edges under CO2 or diode lasers. Does not yellow or crack.',
    price: 24.90,
    compare_at_price: 34.90,
    cost_price: 8.50,
    supplier_sku: 'ACR-CAST-10',
    badge: 'Crystal Clear',
    laser_type: 'CO2 / Diode (Engraving)',
    recommended_power: 'Flame-Polished Cut Finish Guaranteed',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
    ],
    cj_pid: 'ACR-CAST-10',
    name_i18n: {
      en: 'Optical Grade Clear Cast Acrylic Sheets with Protective Film (2mm/3mm, 10-Pack)',
      lt: 'Optinės kokybės liejo skaidraus akrilo plokštės su apsaugine plėvele (10 vnt.)'
    },
    description_i18n: {
      en: '100% pure cast acrylic sheets with paper protective mask on both sides. Cuts with flame-polished crystal-clear edges under CO2 or diode lasers. Does not yellow or crack.',
      lt: 'Gryno liejimo skaidrus akrilas su popierine apsaugine plėvele iš abiejų pusių. Pjaunant lazeriu briaunos tampa visiškai skaidrios ir poliruotos.'
    }
  },

  // ==========================================
  // 8. STEEL TAGS & JEWELRY BLANKS
  // ==========================================
  {
    id: 'prod_military_dogtags_50',
    name: 'Mirror Polished 316L Stainless Steel Dog Tag Blanks with Chains (50-Pack)',
    slug: 'mirror-polished-stainless-steel-dog-tag-blanks-50pack',
    category_id: 'cat_jewelry',
    description: 'Mirror-polished surgical grade 316L stainless steel tags with pre-drilled holes and bead chains. Impervious to rust and scratches. Ideal for dark annealing marks or fiber deep engraving.',
    price: 11.90,
    compare_at_price: 16.50,
    cost_price: 3.50,
    supplier_sku: 'CJLX3134884',
    badge: 'Jeweler Grade',
    laser_type: 'Fiber / Diode 10W+ / Infrared 1064nm',
    recommended_power: '10W Diode (Speed 1200mm/min, 90% Power)',
    images: [
      'https://cf.cjdropshipping.com/e4586fe6-467a-4443-9a81-0360a5545531.jpg',
      'https://cf.cjdropshipping.com/f751f5bf-3fef-48b9-8da4-ad02546735ed.jpg'
    ],
    cj_pid: '2096841637189410817',
    name_i18n: {
      en: 'Mirror Polished 316L Stainless Steel Dog Tag Blanks with Chains (50-Pack)',
      lt: 'Veidrodinio poliravimo 316L plieno karinių žetonų ruošiniai su grandinėlėmis (50 vnt.)'
    },
    description_i18n: {
      en: 'Mirror-polished surgical grade 316L stainless steel tags with pre-drilled holes and bead chains. Impervious to rust and scratches. Ideal for dark annealing marks or fiber deep engraving.',
      lt: 'Veidrodinio poliravimo chirurginio nerūdijančio plieno žetonai su skylute ir grandinėlėmis. Atsparūs drėgmei ir rūdims, idealiai tinka graviruoti nuotraukoms bei tekstui.'
    }
  },
  {
    id: 'prod_ss_cross_pendants_20',
    name: 'Mirror Polished Stainless Steel Cross Pendant Blanks (20-Pack)',
    slug: 'mirror-polished-stainless-steel-cross-pendant-blanks-20pack',
    category_id: 'cat_jewelry',
    description: '316L hypoallergenic surgical stainless steel cross pendant blanks. High-gloss mirror polish, ideal for high-contrast dark fiber laser marking or diode engraving.',
    price: 7.90,
    compare_at_price: 11.50,
    cost_price: 2.10,
    supplier_sku: 'CJLX2048677',
    badge: 'Jeweler Choice',
    laser_type: 'Fiber / Diode 10W+ / Infrared',
    recommended_power: 'Fiber 20W (Speed 1200mm/min, 90% Power)',
    images: [
      'https://cf.cjdropshipping.com/quick/product/3eac620c-5fc4-436d-a890-50aff11ebe16.jpg',
      'https://cf.cjdropshipping.com/quick/product/63439a78-8370-4d91-8ebb-84539f95dc96.jpg'
    ],
    cj_pid: '1795710376370245632',
    name_i18n: {
      en: 'Mirror Polished Stainless Steel Cross Pendant Blanks (20-Pack)',
      lt: 'Veidrodinio poliravimo nerūdijančio plieno kryželių pakabukų ruošiniai (20 vnt.)'
    },
    description_i18n: {
      en: '316L hypoallergenic surgical stainless steel cross pendant blanks. High-gloss mirror polish, ideal for high-contrast dark fiber laser marking or diode engraving.',
      lt: '316L hipoalerginio chirurginio nerūdijančio plieno kryželių ruošiniai. Veidrodinis poliravimas, skirtas kontrastingam graviravimui skaiduliniu (Fiber) ar diodiniu lazeriu.'
    }
  },
  {
    id: 'prod_ss_letter_tag_pendants',
    name: 'Stainless Steel Initial Letter Plate Pendants (26-Pack A-Z Set)',
    slug: 'stainless-steel-initial-letter-plate-pendants-26pack',
    category_id: 'cat_jewelry',
    description: 'Complete alphabet set of hypoallergenic stainless steel letter pendants. Perfect for personalized monogram jewelry lines.',
    price: 7.50,
    compare_at_price: 10.90,
    cost_price: 2.20,
    supplier_sku: 'CJLX2194282',
    badge: 'Full Set A-Z',
    laser_type: 'Fiber / Diode / IR',
    recommended_power: 'Speed 1800mm/min, Power 75%',
    images: [
      'https://cf.cjdropshipping.com/quick/product/0cb84150-1b33-4c12-9c8a-ad31482b4ced.jpg',
      'https://cf.cjdropshipping.com/quick/product/3749c3d5-dca1-458d-99ba-a5fae7377a7e.jpg'
    ],
    cj_pid: '2411140132101619600',
    name_i18n: {
      en: 'Stainless Steel Initial Letter Plate Pendants (26-Pack A-Z Set)',
      lt: 'Nerūdijančio plieno raidžių plokštelių pakabukų ruošiniai (26 vnt. A-Z rinkinys)'
    },
    description_i18n: {
      en: 'Complete alphabet set of hypoallergenic stainless steel letter pendants. Perfect for personalized monogram jewelry lines.',
      lt: 'Pilnas abėcėlės rinkinys iš hipoalerginio nerūdijančio plieno. Puikiai tinka personalizuotų papuošalų ir monogramų gamybai.'
    }
  }
];
