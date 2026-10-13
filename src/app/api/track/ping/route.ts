import { NextResponse } from 'next/server';
import { env } from 'cloudflare:workers';

export const runtime = 'edge';

async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`salt_ls_${ip}`);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, path, referrer, device, cartCount } = body || {};

    if (!sessionId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const headers = req.headers;
    const country = headers.get('cf-ipcountry') || 'EU';
    const city = headers.get('cf-ipcity') || '';
    const rawIp = headers.get('cf-connecting-ip') || headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = headers.get('user-agent') || '';

    let detectedDevice = device || 'desktop';
    if (!device) {
      if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        detectedDevice = 'mobile';
      }
    }

    const ipHash = await hashIp(rawIp);
    const now = Date.now();

    const db = (env as any)?.DB;

    if (db) {
      await db.prepare(`
        INSERT INTO visitor_sessions (
          id, ip_hash, country, city, current_path, referrer, device, cart_count, last_active_at, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          current_path = excluded.current_path,
          cart_count = excluded.cart_count,
          last_active_at = excluded.last_active_at
      `).bind(
        sessionId,
        ipHash,
        country,
        city,
        path || '/',
        (referrer || '').slice(0, 200),
        detectedDevice,
        Number(cartCount || 0),
        now,
        now
      ).run();

      // Prune sessions older than 24h
      if (Math.random() < 0.05) {
        const oneDayAgo = now - 24 * 60 * 60 * 1000;
        await db.prepare('DELETE FROM visitor_sessions WHERE last_active_at < ?').bind(oneDayAgo).run();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error';
    console.error('Ping tracking error:', msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 200 });
  }
}
