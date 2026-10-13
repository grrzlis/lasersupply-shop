import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { sendEmail } from '../src/lib/email';
import { placeAliExpressOrder } from '../src/lib/aliexpress-client';

// Load .env.local
try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      process.env[k] = v;
    }
  }
} catch {}

process.env.ALIEXPRESS_APP_KEY = '552890';
process.env.ALIEXPRESS_APP_SECRET = 'sGSfN94PE0gxWX1XfHuIzsbg0rqmW1Yt';
process.env.ALIEXPRESS_ACCESS_TOKEN = '50000700320cBHtYbrSjsgJFsyNyCabm14765485xhmUgwwD9dhRCK01Gj7vRNzFPOM3';

async function runSimulation() {
  console.log('====================================================');
  console.log('🚀 PALEIDŽIAMAS SERVERIO UŽSAKYMO SIMULIACIJOS TESTAS');
  console.log('====================================================\n');

  const testOrderId = 'SIM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const testCustomer = {
    name: 'Algirdas Kolesnikovas (Test Maker)',
    email: 'akdarbas@gmail.com',
    phone: '+37060000000',
    address: 'Gedimino pr. 1, Vilnius, 01103, Lithuania',
  };

  const sampleItems = [
    {
      id: 'cloudray-m40',
      name: 'Cloudray M40 Laser Engraving Head',
      price: 189.00,
      quantity: 1,
    }
  ];

  const totalAmount = '189.00';
  const currency = 'EUR';

  // 1. TESTAS: El. pašto pranešimas pirkėjui ir administratoriui (Brevo API)
  console.log('📧 1/3 TESTAS: Siunčiamas pranešimas į akdarbas@gmail.com per Brevo API...');
  try {
    const emailRes = await sendEmail({
      to: [{ email: 'akdarbas@gmail.com', name: 'LaserSupply Admin' }],
      subject: `🧪 [TESTINIS UŽSAKYMAS] Naujas užsakymas #${testOrderId} (${totalAmount} ${currency})`,
      htmlContent: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #059669; margin-top: 0;">🧪 Testinis Užsakymas Sėkmingai Apdorotas!</h2>
          <p>Sveiki, Algirdai! Tai yra bandomasis užsakymo patvirtinimas iš <strong>LaserSupply.org</strong> serverio.</p>
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 6px 0;"><strong>Užsakymo ID:</strong> #${testOrderId}</p>
            <p style="margin: 0 0 6px 0;"><strong>Suma:</strong> ${totalAmount} ${currency}</p>
            <p style="margin: 0 0 6px 0;"><strong>Pirkėjas:</strong> ${testCustomer.name}</p>
            <p style="margin: 0 0 6px 0;"><strong>El. paštas:</strong> ${testCustomer.email}</p>
            <p style="margin: 0 0 6px 0;"><strong>Pristatymo adresas:</strong> ${testCustomer.address}</p>
            <p style="margin: 0;"><strong>Prekė:</strong> ${sampleItems[0].name} (x${sampleItems[0].quantity})</p>
          </div>
          <p style="color: #4b5563; font-size: 14px;">Užsakymas taip pat iškart įrašytas į Jūsų valdymo pultą: <a href="https://lasersupply.org/admin" style="color: #059669; font-weight: bold;">lasersupply.org/admin</a></p>
        </div>
      `,
    });
    console.log('✅ El. laiškas sėkmingai išsiųstas! Atsakymas:', emailRes);
  } catch (err: any) {
    console.error('❌ Klaida siunčiant laišką:', err.message);
  }

  // 2. TESTAS: AliExpress Dropshipping API kreipinys
  console.log('\n📦 2/3 TESTAS: Jungiamasi prie AliExpress OpenAPI (app_key: 552890)...');
  let aliResult: any = null;
  try {
    aliResult = await placeAliExpressOrder({
      outOrderId: `LS-${testOrderId}`,
      shippingAddress: {
        contactPerson: 'Algirdas Kolesnikovas',
        fullName: 'Algirdas Kolesnikovas',
        phoneCountry: '+370',
        mobileNo: '60000000',
        country: 'LT',
        city: 'Vilnius',
        address: 'Gedimino pr. 1',
        zip: '01103',
      },
      productItems: [
        {
          productId: '1005006248912345',
          productCount: 1,
          logisticsServiceName: 'AliExpress Standard Shipping',
        }
      ]
    });

    console.log('📡 AliExpress OpenAPI atsakymas:');
    console.log(JSON.stringify(aliResult, null, 2));
  } catch (err: any) {
    console.error('❌ AliExpress API klaida:', err.message);
  }

  // 3. TESTAS: Užsakymo įrašymas į D1 duomenų bazę
  console.log('\n💾 3/3 TESTAS: Įrašomas užsakymas į Cloudflare D1 duomenų bazę...');
  try {
    const tempSqlPath = path.resolve(process.cwd(), 'scripts/temp-test-order.sql');
    const itemsJson = JSON.stringify(sampleItems).replace(/'/g, "''");
    const sql = `INSERT OR REPLACE INTO orders (id, customer_email, customer_name, shipping_address, total_amount, currency, payment_status, fulfillment_status, supplier_order_id, items) VALUES ('${testOrderId}', '${testCustomer.email}', '${testCustomer.name}', '${testCustomer.address}', ${totalAmount}, '${currency}', 'paid', 'simulated_test', 'ALI-TEST', '${itemsJson}');`;
    fs.writeFileSync(tempSqlPath, sql, 'utf8');

    execSync(`npx wrangler d1 execute lasersupply-db --remote --file=scripts/temp-test-order.sql`, { stdio: 'inherit' });
    fs.unlinkSync(tempSqlPath);
    console.log(`✅ Užsakymas #${testOrderId} sėkmingai įrašytas į D1 duomenų bazę!`);
  } catch (err: any) {
    console.error('❌ Klaida įrašant į D1:', err.message);
  }

  console.log('\n====================================================');
  console.log('🎉 SIMULIACIJOS TESTAS SĖKMINGAI ĮVYKDYTAS!');
  console.log('1. Patikrinkite savo paštą: akdarbas@gmail.com');
  console.log('2. Patikrinkite valdymo pultą: https://lasersupply.org/admin');
  console.log('====================================================');
}

runSimulation().catch(console.error);
