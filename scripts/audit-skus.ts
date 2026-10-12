import fs from 'fs';

const content = fs.readFileSync('src/lib/products.ts', 'utf-8');
const match = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);/);

if (!match) {
  console.log('Nerasta PRODUCTS masyvo.');
  process.exit(1);
}

const products = JSON.parse(match[1]);

console.log('=== AUDIT REZULTATAI ===');
console.log('Viso prekių parduotuvėje:', products.length);

const cjLinked = products.filter(p => p.cj_pid || (p.supplier_sku && !p.supplier_sku.startsWith('CJ-BLANK-')));
const internalOnly = products.filter(p => !p.cj_pid && (!p.supplier_sku || p.supplier_sku.startsWith('CJ-BLANK-')));

console.log('Prekės su TIKRAIS CJ ID / CJ SKU:', cjLinked.length);
console.log('Prekės su laikinais vietiniais kodais (CJ-BLANK-*):', internalOnly.length);

console.log('\n--- Pavyzdžiai su TIKRAIS CJ kodais ---');
cjLinked.slice(0, 5).forEach((p, i) => {
  console.log(`${i+1}. ${p.name}`);
  console.log(`   SKU: ${p.supplier_sku || 'Nėra'} | CJ PID: ${p.cj_pid || 'Nėra'}`);
});

console.log('\n--- Prekės, kurioms dar priskirti vietiniai kodai (reikia suporuoti su CJ) ---');
internalOnly.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] ${p.name}`);
  console.log(`   Dabartinis kodas: ${p.supplier_sku}`);
});
