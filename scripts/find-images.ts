import fs from 'fs';

const content = fs.readFileSync('src/lib/products.ts', 'utf8');
const regex = /https:\/\/cdn\.shopify\.com\/s\/files\/[^\"]+/g;
const all = content.match(regex) || [];
const unique = Array.from(new Set(all));

console.log('Total shopify images:', unique.length);

const keywords = ['card', 'wood', 'tag', 'metal', 'jig', 'sheet', 'plate', 'plywood', 'acrylic'];
const matched = unique.filter(url => keywords.some(k => url.toLowerCase().includes(k)));
console.log('Matched keywords count:', matched.length);
console.log('Sample matched:', matched.slice(0, 30));
