import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';
import { queryAliExpressOrderStatus } from '@/lib/aliexpress-client';
import { sendShippingNotification, sendEmail } from '@/lib/email';

export const runtime = 'edge';

/**
 * Sync order fulfillment status from AliExpress / suppliers.
 * Can be called automatically via Cloudflare Cron trigger, external cron job, or manual trigger.
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const key = url.searchParams.get('key');
    const syncSecret = process.env.ADMIN_SYNC_SECRET || 'lasersupply-sync-2026';

    // Verify secret if provided
    if (key && key !== syncSecret) {
      return NextResponse.json({ ok: false, error: 'Unauthorized: Invalid sync key' }, { status: 401 });
    }

    const db = (env as any)?.DB;
    if (!db) {
      return NextResponse.json({ ok: false, error: 'D1 Database not available' }, { status: 500 });
    }

    // 1. Find all paid orders that are not yet fulfilled or delivered
    const pendingOrdersRes = await db.prepare(`
      SELECT id, customer_name, customer_email, supplier_order_id, fulfillment_status, tracking_number
      FROM orders
      WHERE payment_status = 'paid'
        AND (fulfillment_status IS NULL OR fulfillment_status NOT IN ('fulfilled', 'delivered', 'simulated_test'))
        AND supplier_order_id IS NOT NULL
      LIMIT 25
    `).all();

    const pendingOrders = pendingOrdersRes.results || [];
    const updates: any[] = [];

    for (const order of pendingOrders) {
      const supplierOrderId = order.supplier_order_id;
      if (!supplierOrderId) continue;

      // Query AliExpress status
      const statusResult = await queryAliExpressOrderStatus(supplierOrderId);

      if (statusResult.success && statusResult.isShipped) {
        const trackingNum = statusResult.trackingNumber || order.tracking_number || 'IN-TRANSIT';
        const trackingUrl = statusResult.trackingUrl || `https://t.17track.net/en#nums=${trackingNum}`;
        const carrierName = statusResult.logisticsServiceName || 'AliExpress Standard Shipping';

        // Update database status
        await db.prepare(`
          UPDATE orders
          SET fulfillment_status = 'fulfilled',
              tracking_number = ?,
              tracking_url = ?
          WHERE id = ?
        `).bind(trackingNum, trackingUrl, order.id).run();

        // Send email to customer with tracking link
        if (order.customer_email) {
          await sendShippingNotification({
            orderId: order.id,
            customerEmail: order.customer_email,
            customerName: order.customer_name || 'Customer',
            trackingNumber: trackingNum,
            carrierName,
            trackingUrl,
          });
        }

        // Notify admin about completed fulfillment
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'akdarbas@gmail.com';
        await sendEmail({
          to: [{ email: adminEmail, name: 'LaserSupply Admin' }],
          subject: `🚚 Užsakymas #${order.id} išsiųstas AliExpress! (Sekimo Nr: ${trackingNum})`,
          htmlContent: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2>🚚 AliExpress išsiuntė užsakymą!</h2>
              <p>Parduotuvės užsakymas: <strong>#${order.id}</strong></p>
              <p>AliExpress užsakymo ID: <strong>${supplierOrderId}</strong></p>
              <p>Sekimo numeris: <strong>${trackingNum}</strong> (${carrierName})</p>
              <p>Klientui (${order.customer_email}) automatiškai išsiųstas pranešimas su sekimo nuoroda.</p>
              <p><a href="${trackingUrl}" target="_blank">Sekti siuntą &rarr;</a></p>
            </div>
          `,
        });

        updates.push({
          orderId: order.id,
          status: 'fulfilled',
          trackingNumber: trackingNum,
          customerNotified: !!order.customer_email,
        });
      }
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      checkedCount: pendingOrders.length,
      updatedCount: updates.length,
      updates,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error syncing fulfillment';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req);
}
