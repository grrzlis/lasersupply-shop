import fs from 'fs';
import path from 'path';

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
  aliexpress_product_id?: string;
  aliexpress_sku?: string;
  badge?: string;
  laser_type: string;
  recommended_power: string;
  images: string[];
  full_description?: string;
  full_description_i18n?: Record<string, string>;
  specs?: Record<string, string>;
}

// Full description generators for all 8 languages
function generateFullDescForLang(
  brand: string,
  title: string,
  fullEn: string,
  lang: string
): string {
  // If english or lithuanian, keep or generate
  if (lang === 'en') return fullEn;

  // Extract manufacturer details snippet if available
  const mfgMatch = fullEn.match(/#### (?:Manufacturer Details|Key Features & Advantages|Privalumai)[\s\S]*?(?=####|$)/i);
  const mfgDetails = mfgMatch ? mfgMatch[0].replace(/#### [^\n]+/, '').trim() : '';

  if (lang === 'fr') {
    return `### Présentation et Spécifications Techniques
Le composant officiel **${brand}** est conçu pour les ateliers de gravure et de découpe laser de haute précision. Fabriqué selon des normes de contrôle de qualité rigoureuses, il garantit une durabilité maximale, une stabilité thermique exemplaire et une grande longévité.

#### Caractéristiques Principales :
- **Composant d'origine certifié :** Matériel 100% officiel ${brand} garantissant des performances fiables et conformes aux spécifications du fabricant.
- **Large compatibilité :** Entièrement pris en charge par les principaux logiciels de contrôle laser (LightBurn, LaserGRBL) et les châssis populaires (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Fiabilité en atelier :** Réduit l'usure prématurée, protège l'optique de focalisation contre les dépôts de fumée et assure des passes nettes et répétables.

#### Détails du Fabricant :
${mfgDetails || `Ensemble ${title} d'origine, pré-calibré et prêt pour une installation immédiate (Plug & Play).`}

#### Conseils d'Utilisation et Entretien :
Nettoyez régulièrement les surfaces optiques et les contacts mobiles à l'aide de lingettes optiques sans peluche. Respectez les tensions et cycles recommandés par le fabricant.`;
  }

  if (lang === 'de') {
    return `### Produktübersicht & Technische Daten
Die offizielle **${brand}**-Komponente wurde für professionelle Maker-Werkstätten und hochpräzise CNC-Laseranwendungen entwickelt. Hergestellt unter strengsten Qualitätskontrollen, gewährleistet sie maximale Langlebigkeit, thermische Stabilität und exakte Toleranzen.

#### Hauptmerkmale & Vorteile:
- **Original-Herstellerqualität:** 100% echtes ${brand}-Werksequipment für normgerechte Leistung und Ausfallsicherheit.
- **Universelle Kompatibilität:** Vollständig unterstützt von führender Steuerungssoftware (LightBurn, LaserGRBL) und gängigen Lasersystemen (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Hohe Zuverlässigkeit:** Minimiert Verschleiß, schützt sensible Fokuslinsen vor Rußablagerungen und sorgt für saubere, reproduzierbare Schnitte.

#### Herstellerdetails:
${mfgDetails || `Original ${title} Baugruppe, werkskalibriert und sofort betriebsbereit.`}

#### Wartungs- und Pflegehinweise:
Optische Oberflächen regelmäßig mit fusselfreien Optiktüchern reinigen. Verwenden Sie die empfohlenen Spannungs- und Tastverhältnis-Parameter des Herstellers.`;
  }

  if (lang === 'es') {
    return `### Descripción General y Especificaciones Técnicas
El componente oficial **${brand}** está diseñado para talleres profesionales de grabado y corte láser CNC de alta precisión. Fabricado bajo estrictos estándares de control de calidad, garantiza máxima durabilidad, estabilidad térmica y tolerancias exactas.

#### Características Clave:
- **Ingeniería Original Certificada:** Equipo 100% genuino de fábrica ${brand} que asegura rendimiento constante y prolongada vida útil.
- **Compatibilidad Universal:** Totalmente compatible con el software de control más popular (LightBurn, LaserGRBL) y máquinas estándar (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Rendimiento de Taller:** Reduce el desgaste operativo, protege la óptica focal contra el hollín y ofrece cortes limpios y precisos en cada pasada.

#### Detalles del Fabricante:
${mfgDetails || `Conjunto ${title} original, precalibrado y listo para instalación inmediata.`}

#### Mantenimiento y Cuidados:
Mantenga las superficies ópticas libres de suciedad con toallitas especiales sin pelusa. Respete los voltajes y ciclos recomendados por el fabricante.`;
  }

  if (lang === 'pl') {
    return `### Przegląd Produktu i Specyfikacja Techniczna
Oficjalny komponent **${brand}** został zaprojektowany z myślą o profesjonalnych pracowniach oraz precyzyjnych zastosowaniach laserowych CNC. Wyprodukowany zgodnie z rygorystycznymi normami jakościowymi, zapewnia wyjątkową trwałość, odporność termiczną i stabilność parametrów.

#### Główne Zalety:
- **Gwarancja Oryginalności:** 100% oryginalne wyposażenie fabryczne ${brand} zapewniające bezkompromisową wydajność.
- **Szeroka Kompatybilność:** Pełne wsparcie dla wiodącego oprogramowania (LightBurn, LaserGRBL) oraz popularnych ploterów (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Niezawodność w Warsztacie:** Chroni wrażliwą optykę przed zanieczyszczeniami spalinowymi i gwarantuje czyste, powtarzalne rezultaty grawerowania i cięcia.

#### Szczegóły Producenta:
${mfgDetails || `Oryginalny zestaw ${title}, skalibrowany fabrycznie i gotowy do montażu.`}

#### Wytyczne Dotyczące Konserwacji:
Optykę i elementy ruchome czyścić ściereczkami bezpyłowymi. Przestrzegać zalecanych przez producenta parametrów zasilania i cykli pracy.`;
  }

  if (lang === 'lv') {
    return `### Produkta Pārskats un Tehniskā Specifikācija
Oriģinālais **${brand}** komponents ir izstrādāts profesionālām darbnīcām un augstas precizitātes lāzera apstrādei. Ražots saskaņā ar stingriem kvalitātes standartiem, nodrošinot maksimālu izturību un termisko stabilitāti.

#### Galvenās Priekšrocības:
- **Oriģināla Ražotāja Kvalitāte:** 100% autentisks ${brand} rūpnīcas aprīkojums uzticamai un ilgmūžīgai darbībai.
- **Universāla Savietojamība:** Pilnībā saderīgs ar vadošo vadības programmatūru (LightBurn, LaserGRBL) un populārākajiem darbgaldiem (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Augsta Darbnīcas Efektivitāte:** Aizsargā optiskās lēcas no dūmu nogulsnēm un nodrošina tīrus, precīzus un atkārtojamus griezumus.

#### Ražotāja Informācija:
${mfgDetails || `Oriģināls ${title} mezgls, rūpnieciski kalibrēts un gatavs uzstādīšanai.`}

#### Apkopes Vadlīnijas:
Optiskās virsmas tīrīt ar speciālām bezplūksnu salvetēm. Ievērot ražotāja norādītos sprieguma un slodzes parametrus.`;
  }

  if (lang === 'et') {
    return `### Toote Ülevaade ja Tehnilised Andmed
Ametlik **${brand}** komponent on loodud professionaalsetele töökodadele ja ülitäpseks CNC lasertöötluseks. Toodetud rangete kvaliteedinõuete kohaselt, tagades maksimaalse vastupidavuse ja termilise stabiilsuse.

#### Peamised Eelised:
- **Autentne Tootja Tehnoloogia:** 100% ehtne ${brand} tehasetoode, mis tagab lubatud parameetrid ja pika tööea.
- **Universaalne Ühilduvus:** Täielikult toetatud juhtivate juhtimistarkvaradega (LightBurn, LaserGRBL) ning populaarsete lasermasinatega (xTool, Creality, Ortur, Atomstack, Sculpfun, CO2).
- **Töökindlus Tootmises:** Kaitseb fookusoptikat tahma ja suitsu eest ning tagab puhtad, korratavad lõiked.

#### Tootja Üksikasjad:
${mfgDetails || `Ametlik ${title} komplekt, eelseadistatud ja valmis koheseks paigalduseks.`}

#### Hooldusjuhised:
Puhastage optilisi pindu regulaarselt ebemevabade lappidega. Järgige tootja poolt määratud pinge- ja koormusnõudeid.`;
  }

  return fullEn;
}

async function main() {
  const productsPath = path.join(process.cwd(), 'src/lib/products.ts');
  const code = fs.readFileSync(productsPath, 'utf8');
  const jsonMatch = code.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
  if (!jsonMatch) throw new Error('Could not parse PRODUCTS');

  const products: Product[] = JSON.parse(jsonMatch[1]);
  console.log(`Loaded ${products.length} products to translate full descriptions...`);

  const languages = ['en', 'lt', 'de', 'fr', 'es', 'pl', 'lv', 'et'];

  for (const prod of products) {
    if (!prod.full_description_i18n) {
      prod.full_description_i18n = {};
    }

    const brand = prod.specs?.Brand || 'Original';
    const baseEn = prod.full_description_i18n.en || prod.full_description || prod.description;

    for (const lang of languages) {
      if (lang === 'en') {
        prod.full_description_i18n.en = baseEn;
      } else if (lang === 'lt' && prod.full_description_i18n.lt) {
        // Keep already existing rich LT description
      } else {
        prod.full_description_i18n[lang] = generateFullDescForLang(brand, prod.name, baseEn, lang);
      }
    }
  }

  const output = `import { Product } from '@/types/product';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(productsPath, output, 'utf8');
  console.log(`Successfully generated full_description_i18n for all 8 languages across all ${products.length} products!`);
}

main().catch(console.error);
