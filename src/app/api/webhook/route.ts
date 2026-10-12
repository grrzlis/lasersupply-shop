import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { sendEmail } from '@/lib/email';
import type Stripe from 'stripe';

export const runtime = 'edge';

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature');

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not initialized' }, { status: 500 });
  }

  try {
    const rawBody = await req.text();
    const event = await stripe.webhooks.constructEventAsync(rawBody, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerName = session.customer_details?.name || 'Customer';
      const customerEmail = session.customer_details?.email;
      const customerPhone = session.customer_details?.phone || 'Not provided';
      const address = session.customer_details?.address;
      const formattedAddress = address
        ? `${address.line1 || ''}, ${address.city || ''}, ${address.postal_code || ''}, ${address.country || ''}`
        : 'Not provided';

      const amountTotal = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00';
      const currency = (session.currency || 'eur').toUpperCase();
      const orderId = session.id.slice(-8).toUpperCase();

      console.log('✅ [ORDER PAID] Processing notification and emails for:', orderId);

      // 1. Automatically dispatch fulfillment order to CJ Dropshipping / AliExpress
      let cjOrderResult: { success: boolean; orderId?: string; error?: string } | null = null;
      let aliOrderResult: { success: boolean; orderList?: Array<string | number>; errorMessage?: string } | null = null;

      try {
        const rawItems = session.metadata?.order_items;
        const parsedItems: Array<{ id: string; q: number }> = rawItems ? JSON.parse(rawItems) : [];
        
        // CJ Dropshipping Dispatch
        const cjProducts = parsedItems.map(item => {
          return { vid: 'F3420747-900F-405B-A5C6-F47299BDA9CE', quantity: item.q };
        });

        if (cjProducts.length > 0 && address) {
          const { createCjOrder } = await import('@/lib/cj-client');
          cjOrderResult = await createCjOrder({
            orderNumber: `LS-${orderId}`,
            shippingZip: address.postal_code || '00000',
            shippingCountry: address.country || 'Lithuania',
            shippingCountryCode: address.country || 'LT',
            shippingProvince: address.state || address.city || 'State',
            shippingCity: address.city || 'City',
            shippingAddress: [address.line1, address.line2].filter(Boolean).join(', ') || 'Address',
            shippingCustomerName: customerName,
            shippingPhone: customerPhone !== 'Not provided' ? customerPhone : '+37060000000',
            logisticName: 'CJPacket Ordinary',
            products: cjProducts,
          });
          console.log('📦 [CJ FULFILLMENT DISPATCHED]:', cjOrderResult);
        }

        // AliExpress Dropshipping Dispatch
        if (parsedItems.length > 0 && address) {
          const { placeAliExpressOrder, getAliExpressConfig } = await import('@/lib/aliexpress-client');
          const aliConfig = getAliExpressConfig();
          if (aliConfig) {
            // Find products in catalog to retrieve aliexpress_product_id or supplier_sku
            const { PRODUCTS } = await import('@/lib/products');
            const aliProducts = parsedItems
              .map(item => {
                const prod = PRODUCTS.find(p => p.id === item.id);
                const aliPid = prod?.aliexpress_product_id || prod?.supplier_sku || '1005006248912345';
                return {
                  productId: aliPid,
                  skuAttr: prod?.aliexpress_sku || '',
                  productCount: item.q,
                  logisticsServiceName: 'AliExpress Standard Shipping',
                };
              })
              .filter(Boolean);

            if (aliProducts.length > 0) {
              aliOrderResult = await placeAliExpressOrder({
                outOrderId: `LS-${orderId}`,
                shippingAddress: {
                  contactPerson: customerName,
                  fullName: customerName,
                  phoneCountry: customerPhone.startsWith('+') ? customerPhone.slice(0, 4) : '+370',
                  mobileNo: customerPhone !== 'Not provided' ? customerPhone : '+37060000000',
                  country: address.country || 'LT',
                  province: address.state || address.city || 'State',
                  city: address.city || 'City',
                  address: [address.line1, address.line2].filter(Boolean).join(', ') || 'Address',
                  zip: address.postal_code || '00000',
                },
                productItems: aliProducts,
              });
              console.log('📦 [ALIEXPRESS FULFILLMENT DISPATCHED]:', aliOrderResult);
            }
          } else {
            console.log('ℹ️ AliExpress credentials not configured yet in environment.');
          }
        }
      } catch (fulErr) {
        console.error('Failed to dispatch fulfillment order:', fulErr);
      }

      // 2. Send Order Confirmation to Customer (if customer email provided)
      if (customerEmail) {
        await sendEmail({
          to: [{ email: customerEmail, name: customerName }],
          subject: `Order Confirmation #${orderId} - LaserSupply.org`,
          htmlContent: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
              <h2 style="color: #111827; margin-top: 0;">Thank you for your order!</h2>
              <p>Hi ${customerName},</p>
              <p>We've received your order and are getting it ready for shipment.</p>
              
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0 0 8px 0;"><strong>Order ID:</strong> #${orderId}</p>
                <p style="margin: 0 0 8px 0;"><strong>Total Paid:</strong> ${amountTotal} ${currency}</p>
                <p style="margin: 0 0 8px 0;"><strong>Shipping Address:</strong> ${formattedAddress}</p>
                <p style="margin: 0;"><strong>Phone:</strong> ${customerPhone}</p>
              </div>

              <p style="color: #4b5563; font-size: 14px;">If you have any questions, simply reply to this email or contact us at <a href="mailto:info@lasersupply.org">info@lasersupply.org</a>.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">LaserSupply.org — European Laser Maker Blanks & Materials</p>
            </div>
          `,
        });
      }

      // 3. Send Admin Notification to Store Owner (akdarbas@gmail.com)
      const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'akdarbas@gmail.com';
      await sendEmail({
        to: [{ email: adminEmail, name: 'LaserSupply Admin' }],
        subject: `🎉 New Order Paid: #${orderId} (${amountTotal} ${currency})`,
        htmlContent: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #059669; margin-top: 0;">🎉 New Order Received!</h2>
            <p>A new customer has successfully completed checkout on <strong>LaserSupply.org</strong>.</p>
            
            <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0;"><strong>Order Ref:</strong> #${orderId}</p>
              <p style="margin: 0 0 8px 0;"><strong>Total Amount:</strong> ${amountTotal} ${currency}</p>
              <p style="margin: 0 0 8px 0;"><strong>AliExpress Status:</strong> ${aliOrderResult ? (aliOrderResult.success ? `✅ Užsakymas sukurtas AliExpress (${aliOrderResult.orderList?.join(', ')})` : `⚠️ Klaida: ${aliOrderResult.errorMessage}`) : 'Laukiama API raktų / Nustatyta'}</p>
              <p style="margin: 0 0 8px 0;"><strong>CJ Status:</strong> ${cjOrderResult?.success ? `✅ Užsakymas sukurtas CJ (${cjOrderResult.orderId})` : `⚠️ CJ: ${cjOrderResult?.error || 'Nekonfigūruota'}`}</p>
              <p style="margin: 0 0 8px 0;"><strong>Customer Name:</strong> ${customerName}</p>
              <p style="margin: 0 0 8px 0;"><strong>Customer Email:</strong> ${customerEmail || 'N/A'}</p>
              <p style="margin: 0 0 8px 0;"><strong>Customer Phone:</strong> ${customerPhone}</p>
              <p style="margin: 0;"><strong>Shipping Address:</strong> ${formattedAddress}</p>
            </div>

            <p style="margin-top: 20px;"><strong>Stripe Session ID:</strong> <code>${session.id}</code></p>
          </div>
        `,
      });

    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
