export interface Category {
  id: string;
  name: Record<string, string>;
  icon: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: {
      en: 'All Products',
      lt: 'Visos Prekės',
      de: 'Alle Produkte',
      fr: 'Tous les produits',
      es: 'Todos los productos',
      pl: 'Wszystkie produkty',
      lv: 'Visi produkti',
      et: 'Kõik tooted',
    },
    icon: 'Layers',
  },
  {
    id: 'cat_metal',
    name: {
      en: 'Anodized Metals & Tags',
      lt: 'Metalai ir Žetonai',
      de: 'Eloxiertes Metall & Tags',
      fr: 'Métaux et Plaques',
      es: 'Metales Anodizados',
      pl: 'Metale i Breloki',
      lv: 'Metāls un Plāksnītes',
      et: 'Metall ja Sildid',
    },
    icon: 'Shield',
  },
  {
    id: 'cat_drinkware',
    name: {
      en: 'Tumblers & Drinkware',
      lt: 'Gertuvės ir Termosai',
      de: 'Thermobecher & Trinkgefäße',
      fr: 'Gobelets et Bouteilles',
      es: 'Vasos Térmicos',
      pl: 'Kubki i Butelki Termiczne',
      lv: 'Termokrūzes un Pudeles',
      et: 'Termosed ja Joogitopsid',
    },
    icon: 'Coffee',
  },
  {
    id: 'cat_wood',
    name: {
      en: 'Wood, Plywood & Slate',
      lt: 'Mediena, Fanera ir Akmuo',
      de: 'Holz, Sperrholz & Schiefer',
      fr: 'Bois, Contreplaqué et Ardoise',
      es: 'Madera y Pizarra',
      pl: 'Drewno, Sklejka i Łupek',
      lv: 'Koks, Saplāksnis un Akmens',
      et: 'Puit, Vineer ja Kiltkivi',
    },
    icon: 'TreePine',
  },
  {
    id: 'cat_leather',
    name: {
      en: 'Leather & Hat Patches',
      lt: 'Oda ir Kepurių Antsiuvai',
      de: 'Leder & Aufnäher',
      fr: 'Cuir et Écussons',
      es: 'Cuero y Parches',
      pl: 'Skóra i Naszywki',
      lv: 'Āda un Uzšuves',
      et: 'Nahk ja Mütsimärgid',
    },
    icon: 'Tag',
  },
  {
    id: 'cat_acrylic',
    name: {
      en: 'Acrylic & LED Lights',
      lt: 'Akrilas ir LED Šviestuvai',
      de: 'Acryl & LED-Lampen',
      fr: 'Acrylique et Veilleuses LED',
      es: 'Acrílico y Lámparas LED',
      pl: 'Akryl i Lampki LED',
      lv: 'Akrils un LED Lampas',
      et: 'Akrüül ja LED Valgustid',
    },
    icon: 'Sparkles',
  },
  {
    id: 'cat_accessories',
    name: {
      en: 'Honeycomb Beds & Tools',
      lt: 'Koriai, Priedai ir Sauga',
      de: 'Wabentische & Werkzeuge',
      fr: 'Grilles Nid d’Abeille et Outils',
      es: 'Panal y Accesorios',
      pl: 'Panele Plaster Miodu i Akcesoria',
      lv: 'Šūnu Galdi un Piederumi',
      et: 'Kärgstruktuur ja Tööriistad',
    },
    icon: 'Wrench',
  },
  {
    id: 'cat_bundles',
    name: {
      en: 'Starter Boxes & Kits',
      lt: 'Pradžiamokslio Rinkiniai',
      de: 'Starter-Sets & Boxen',
      fr: 'Kits de Démarrage',
      es: 'Kits de Inicio',
      pl: 'Zestawy Startowe',
      lv: 'Sākuma Komplekti',
      et: 'Stardikomplektid',
    },
    icon: 'Package',
  },
];
