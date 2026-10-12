import fs from 'fs';

let content = fs.readFileSync('src/lib/translations.ts', 'utf8');

// Pakeisti bendrus PVM tekstus
content = content.replace(/totalWithVat:\s*'Total \(VAT included\):'/g, "totalWithVat: 'Total:'");
content = content.replace(/vatIncluded:\s*'VAT Included'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS & European VAT cleared:[^']*'/g, "customsText: 'European stock: Delivered directly with no import delays.'");

content = content.replace(/totalWithVat:\s*'Gesamtbetrag \(inkl\. MwSt\.\):'/g, "totalWithVat: 'Gesamtbetrag:'");
content = content.replace(/vatIncluded:\s*'Inkl\. MwSt\.'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS & EU-MwSt\.[^']*'/g, "customsText: 'Europäischer Lagerbestand: Direkte Lieferung ohne Zollverzögerung.'");

content = content.replace(/totalWithVat:\s*'Total \(TVA incluse\) :'/g, "totalWithVat: 'Total :'");
content = content.replace(/vatIncluded:\s*'TVA incluse'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS et TVA[^']*'/g, "customsText: 'Stock européen : Livraison directe sans formalités douanières.'");

content = content.replace(/totalWithVat:\s*'Total \(IVA incluido\):'/g, "totalWithVat: 'Total:'");
content = content.replace(/vatIncluded:\s*'IVA incluido'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS e IVA[^']*'/g, "customsText: 'Stock europeo: Entrega directa sin retrasos en aduanas.'");

content = content.replace(/totalWithVat:\s*'Razem \(z VAT\):'/g, "totalWithVat: 'Razem:'");
content = content.replace(/vatIncluded:\s*'Zawiera VAT'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS i VAT[^']*'/g, "customsText: 'Magazyn europejski: Bezpośrednia dostawa bez opóźnień celnych.'");

content = content.replace(/totalWithVat:\s*'Suma \(su PVM\):'/g, "totalWithVat: 'Iš viso mokėti:'");
content = content.replace(/vatIncluded:\s*'Su PVM'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS ir ES PVM[^']*'/g, "customsText: 'Europos sandėliai: Pristatymas be jokių papildomų mokesčių.'");

content = content.replace(/totalWithVat:\s*'Kopā \(ar PVN\):'/g, "totalWithVat: 'Kopā:'");
content = content.replace(/vatIncluded:\s*'Ar PVN'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS un ES PVN[^']*'/g, "customsText: 'Eiropas noliktava: Piegāde bez papildu maksas.'");

content = content.replace(/totalWithVat:\s*'Kokku \(koos KM-ga\):'/g, "totalWithVat: 'Kokku:'");
content = content.replace(/vatIncluded:\s*'Koos KM-ga'/g, "vatIncluded: ''");
content = content.replace(/customsText:\s*'IOSS ja KM[^']*'/g, "customsText: 'Euroopa laod: Kohaletoimetamine ilma lisatasudeta.'");

fs.writeFileSync('src/lib/translations.ts', content, 'utf8');
console.log('Translations successfully updated without VAT.');
