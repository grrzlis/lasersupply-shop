import fs from 'fs';

// Žodžių vertimo žodynėlis lazerių ruošiniams
const TRANSLATIONS_MAP: Record<string, { lt: string; de: string; fr: string; pl: string }> = {
  'Stainless Steel': { lt: 'Nerūdijantis plienas', de: 'Edelstahl', fr: 'Acier inoxydable', pl: 'Stal nierdzewna' },
  'Pendant': { lt: 'Pakabukas', de: 'Anhänger', fr: 'Pendentif', pl: 'Wisiorek' },
  'Necklace': { lt: 'Grandinėlė su pakabuku', de: 'Halskette', fr: 'Collier', pl: 'Naszyjnik' },
  'Dog Tag': { lt: 'Karinių žetonų ruošinys', de: 'Erkennungsmarke Rohling', fr: 'Plaque militaire vierge', pl: 'Nieśmiertelnik baza' },
  'Keychain': { lt: 'Raktų pakabukas', de: 'Schlüsselanhänger', fr: 'Porte-clés', pl: 'Brelok' },
  'Leather': { lt: 'Oda', de: 'Leder', fr: 'Cuir', pl: 'Skóra' },
  'Wood': { lt: 'Medis', de: 'Holz', fr: 'Bois', pl: 'Drewno' },
  'Cutting Board': { lt: 'Pjaustymo lentelė', de: 'Schneidebrett', fr: 'Planche à découper', pl: 'Deska do krojenia' },
  'Coaster': { lt: 'Padėkliukas', de: 'Untersetzer', fr: 'Dessous de verre', pl: 'Podkładka' },
  'Card Holder': { lt: 'Kortelių dėklas', de: 'Kartenetui', fr: 'Porte-cartes', pl: 'Etui na karty' },
  'Night Light': { lt: 'LED naktinis šviestuvas', de: 'LED Nachtlicht', fr: 'Veilleuse LED', pl: 'Lampka nocna LED' },
  'Base': { lt: 'Pagrindas', de: 'Sockel', fr: 'Base', pl: 'Podstawa' },
  'Flask': { lt: 'Gertuvė-gertuvėlė', de: 'Flachmann', fr: 'Flasque', pl: 'Piersiówka' },
  'Cross': { lt: 'Kryželis', de: 'Kreuz', fr: 'Croix', pl: 'Krzyżyk' },
  'Heart': { lt: 'Širdelė', de: 'Herz', fr: 'Cœur', pl: 'Serce' }
};

export function translateTitle(nameEn: string): Record<string, string> {
  // Sukuriame sklandų lietuvišką vertimą
  let lt = nameEn;
  let de = nameEn;
  let fr = nameEn;
  let pl = nameEn;

  if (nameEn.includes('Cross Pendant')) {
    lt = nameEn.replace(/Cross Pendant/gi, 'Kryželio formos pakabukas graviravimui');
    de = nameEn.replace(/Cross Pendant/gi, 'Kreuz-Anhänger zum Gravieren');
  } else if (nameEn.includes('Heart Pendant')) {
    lt = nameEn.replace(/Heart Pendant/gi, 'Širdelės formos pakabukas graviravimui');
    de = nameEn.replace(/Heart Pendant/gi, 'Herz-Anhänger zum Gravieren');
  } else if (nameEn.includes('Pendant Necklace')) {
    lt = nameEn.replace(/Pendant Necklace/gi, 'Graviruojamas pakabukas su grandinėle');
    de = nameEn.replace(/Pendant Necklace/gi, 'Gravierbarer Anhänger mit Kette');
  } else if (nameEn.includes('Pendant')) {
    lt = nameEn.replace(/Pendant/gi, 'Pakabukas lazeriniam graviravimui');
    de = nameEn.replace(/Pendant/gi, 'Anhänger für Lasergravur');
  } else if (nameEn.includes('Keychain')) {
    lt = nameEn.replace(/Keychain/gi, 'Raktų pakabukas graviravimui');
    de = nameEn.replace(/Keychain/gi, 'Schlüsselanhänger zum Gravieren');
  } else if (nameEn.includes('Coaster')) {
    lt = nameEn.replace(/Coaster/gi, 'Gėrimų padėkliukas graviravimui');
    de = nameEn.replace(/Coaster/gi, 'Untersetzer für Lasergravur');
  } else if (nameEn.includes('Cutting Board')) {
    lt = nameEn.replace(/Cutting Board/gi, 'Pjaustymo lentelė graviravimui');
    de = nameEn.replace(/Cutting Board/gi, 'Schneidebrett für Lasergravur');
  }

  lt = lt.replace(/Stainless Steel/gi, 'nerūdijančio plieno');
  lt = lt.replace(/Men's/gi, 'vyriškas');
  lt = lt.replace(/Women's/gi, 'moteriškas');
  lt = lt.replace(/Unisex/gi, 'unisex');

  return {
    en: nameEn,
    lt: lt.trim(),
    de: de.trim(),
    fr: nameEn,
    es: nameEn,
    pl: pl.trim(),
    lv: lt.trim(),
    et: lt.trim()
  };
}

export function generateLocalizedDescription(nameEn: string, catId: string): Record<string, string> {
  if (catId === 'cat_metal' || catId === 'cat_jewelry') {
    return {
      en: 'High-grade surgical stainless steel blank. Mirror polished, corrosion resistant. Perfect for fiber annealing, diode, or infrared deep laser engraving.',
      lt: 'Aukštos kokybės nerūdijančio plieno ruošinys. Veidrodinis poliravimas, atsparus korozijai. Idealiai tinka graviruoti skaiduliniu (Fiber), diodiniu arba infraraudonųjų spindulių lazeriu.',
      de: 'Hochwertiger chirurgischer Edelstahl-Rohling. Spiegelpoliert, korrosionsbeständig. Ideal für Faser-, Dioden- und Infrarot-Lasergravuren.',
      fr: 'Ébauche en acier inoxydable chirurgical de haute qualité. Poli miroir, résistant à la corrosion. Idéal pour gravure laser.',
      es: 'Pieza de acero inoxidable de alta calidad. Pulido espejo, resistente a la corrosión. Ideal para grabado láser.',
      pl: 'Wysokiej jakości baza ze stali chirurgicznej. Polerowana na lustro, odporna na korozję. Idealna do grawerowania laserowego.',
      lv: 'Augstas kvalitātes nerūsējošā tērauda sagatave. Spoguļpulēta, izturīga pret koroziju. Ideāli piemērota lāzergravēšanai.',
      et: 'Kvaliteetne kirurgilisest terasest toorik. Peegelpoleeritud, korrosioonikindel. Ideaalne lasergraveerimiseks.'
    };
  }

  if (catId === 'cat_wood') {
    return {
      en: 'Solid natural hardwood blank with smooth sanded finish. Food-safe raw surface designed for high-contrast diode and CO2 laser engraving.',
      lt: 'Natūralios medienos ruošinys, lygiai nušlifuotas paviršius. Saugus liestis su maistu, paruoštas didelio kontrasto diodinio ir CO2 lazerio graviravimui.',
      de: 'Massiver Echtholz-Rohling mit glatt geschliffener Oberfläche. Lebensmittelecht, ideal für kontrastreiche Dioden- und CO2-Gravuren.',
      fr: 'Ébauche en bois massif naturel avec finition poncée lisse. Idéal pour la gravure laser CO2 et diode.',
      es: 'Pieza de madera maciza natural lijada. Apta para uso alimentario, ideal para grabado láser CO2 y diodo.',
      pl: 'Baza z litego drewna naturalnego o gładko wyszlifowanej powierzchni. Idealna do grawerowania laserem CO2 i diodowym.',
      lv: 'Dabīgā koka sagatave ar gludi slīpētu virsmu. Droša pārtikai, gatava lāzergravēšanai.',
      et: 'Naturaalsest täispuidust toorik sileda pinnaga. Toiduohutu, valmis lasergraveerimiseks.'
    };
  }

  return {
    en: 'Precision maker blank for laser engraving, marking, and personalization. Durable build, clean edges, zero defects.',
    lt: 'Tikslus ruošinys lazeriniam graviravimui ir personalizavimui. Tvirta konstrukcija, lygūs kraštai, paruošta darbui.',
    de: 'Präzisions-Rohling für Lasergravur und Personalisierung. Langlebig, saubere Kanten, sofort einsatzbereit.',
    fr: 'Support de précision pour gravure laser et personnalisation.',
    es: 'Pieza de precisión para grabado láser y personalización.',
    pl: 'Precyzyjna baza do grawerowania laserowego i personalizacji.',
    lv: 'Precīza sagatave lāzergravēšanai un personalizācijai.',
    et: 'Täppistoorik lasergraveerimiseks ja isikupärastamiseks.'
  };
}
