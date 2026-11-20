import { PRODUCTS } from '../src/lib/products';

const p = PRODUCTS.find(x => x.specs?.SKU === 'B40-US' || x.name.toLowerCase().includes('b40'));
if (p) {
  console.log('FOUND PRODUCT:');
  console.log('ID:', p.id);
  console.log('Name:', p.name);
  console.log('Slug:', p.slug);
  console.log('Price:', p.price);
  console.log('Cost Price:', (p as any).cost_price);
  console.log('Compare at price:', p.compare_at_price);
  console.log('Category:', p.category_id);
  console.log('Supplier SKU:', p.supplier_sku);
  console.log('AliExpress ID:', (p as any).aliexpress_product_id);
  console.log('Images:', p.images);
  console.log('Description:', p.description);
} else {
  console.log('NOT FOUND');
}
