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
          LIMIT 100
        `).all();
        orders = ordersQuery.results || [];
        stats.totalOrders = orders.length;
      } catch (orderErr) {
        // Orders table query error handling
      }
    }

    // 3. Compute Hourly Comparison Series (Last 24 Hours)
    // 24 buckets of 1 hour each
    const hourlySeries = [];
    for (let i = 23; i >= 0; i--) {
      const bucketStart = now - (i + 1) * 60 * 60 * 1000;
      const bucketEnd = now - i * 60 * 60 * 1000;
      const dateObj = new Date(bucketEnd);
      const label = `${String(dateObj.getHours()).padStart(2, '0')}:00`;

      const bucketVisitors = visitors.filter((v: any) => v.last_active_at >= bucketStart && v.last_active_at < bucketEnd).length;
      const bucketCarts = visitors.filter((v: any) => v.cart_count > 0 && v.last_active_at >= bucketStart && v.last_active_at < bucketEnd).length;
      
      const bucketOrders = orders.filter((o: any) => {
        const orderTime = new Date(o.created_at).getTime();
        return !isNaN(orderTime) && orderTime >= bucketStart && orderTime < bucketEnd;
      }).length;

      hourlySeries.push({
        label,
        visitors: bucketVisitors,
        carts: bucketCarts,
        orders: bucketOrders,
      });
    }

    // 4. Compute Daily Comparison Series (Last 7 Days)
    const dailySeries = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const dayStart = d.getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      
      const dayName = d.toLocaleDateString('lt-LT', { weekday: 'short', month: 'numeric', day: 'numeric' });

      const dayVisitors = visitors.filter((v: any) => v.last_active_at >= dayStart && v.last_active_at < dayEnd).length;
      const dayCarts = visitors.filter((v: any) => v.cart_count > 0 && v.last_active_at >= dayStart && v.last_active_at < dayEnd).length;
      
      const dayOrders = orders.filter((o: any) => {
        const orderTime = new Date(o.created_at).getTime();
        return !isNaN(orderTime) && orderTime >= dayStart && orderTime < dayEnd;
      }).length;

      dailySeries.push({
        label: dayName,
        visitors: dayVisitors,
        carts: dayCarts,
        orders: dayOrders,
      });
    }

    return NextResponse.json({
      ok: true,
      stats,
      visitors,
      orders,
      charts: {
        hourly: hourlySeries,
        daily: dailySeries,
      },
      timestamp: now,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
