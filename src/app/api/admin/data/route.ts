import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';
import { verifyAdminToken } from '@/lib/admin-auth';

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/ls_admin_token=([^;]+)/);
    const token = match ? match[1] : null;

    const isValid = await verifyAdminToken(token);
    if (!isValid) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const db = (env as any)?.DB;

    const now = Date.now();
    const onlineThreshold = now - 90 * 1000; // 90 seconds
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfDayTimestamp = startOfDay.getTime();

    let visitors: any[] = [];
    let orders: any[] = [];
    let stats = {
      onlineNow: 0,
      totalToday: 0,
      activeCarts: 0,
      totalOrders: 0,
    };

    if (db) {
      // 1. Fetch visitors from last 24 hours
      const visitorsQuery = await db.prepare(`
        SELECT id, ip_hash, country, city, current_path, referrer, device, cart_count, last_active_at, created_at
        FROM visitor_sessions
        WHERE last_active_at > ?
        ORDER BY last_active_at DESC
        LIMIT 100
      `).bind(now - 24 * 60 * 60 * 1000).all();

      visitors = visitorsQuery.results || [];

      // Calculate stats
      stats.onlineNow = visitors.filter((v: any) => v.last_active_at >= onlineThreshold).length;
      stats.totalToday = visitors.filter((v: any) => v.created_at >= startOfDayTimestamp).length;
      stats.activeCarts = visitors.filter((v: any) => v.cart_count > 0 && v.last_active_at >= (now - 30 * 60 * 1000)).length;

      // 2. Fetch orders
      try {
        const ordersQuery = await db.prepare(`
          SELECT id, customer_name, customer_email, shipping_address, total_amount, currency, payment_status, fulfillment_status, supplier_order_id, tracking_number, tracking_url, created_at, items
          FROM orders
          ORDER BY created_at DESC
          LIMIT 50
        `).all();
        orders = ordersQuery.results || [];
        stats.totalOrders = orders.length;
      } catch (orderErr) {
        // Orders table query error handling
      }
    }

    return NextResponse.json({
      ok: true,
      stats,
      visitors,
      orders,
      timestamp: now,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
