import { PRODUCTS } from '../src/lib/products';

console.log('=== PRODUCT SUPPLIERS & MARGINS AUDIT ===');
const ae = PRODUCTS.filter(p => !!(p as any).aliexpress_product_id);

console.log('| Prekė | Pardavimo kaina | Tiekėjo kaina (AE) | Stripe mokestis | Pelnas (jei siuntimas 0€) | Pelnas (jei siuntimas 3.50€) |');
console.log('|---|---|---|---|---|---|');
for (const p of ae) {
  const price = p.price;
  const cost = (p as any).cost_price || 0;
  const stripe = Number((price * 0.015 + 0.25).toFixed(2));
  const profitFreeShip = Number((price - cost - stripe).toFixed(2));
  const profitWorstShip = Number((price - cost - stripe - 3.50).toFixed(2));
  console.log(`| ${p.name.slice(0, 32)}... | ${price.toFixed(2)} € | ${cost.toFixed(2)} € | ${stripe.toFixed(2)} € | +${profitFreeShip.toFixed(2)} € (${Math.round(profitFreeShip / price * 100)}%) | +${profitWorstShip.toFixed(2)} € (${Math.round(profitWorstShip / price * 100)}%) |`);
}
