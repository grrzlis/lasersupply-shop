import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/email';

export const runtime = 'edge';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; locale?: string };
    const email = body.email?.trim() || '';
    const locale = body.locale?.trim();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
    }

    const result = await subscribeToNewsletter(email, locale);
    if (!result.success) {
      const status = result.reason === 'missing_key' ? 503 : 502;
      return NextResponse.json({ ok: false, error: result.reason || 'subscribe_failed' }, { status });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }
}
