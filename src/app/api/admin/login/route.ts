import { NextResponse } from 'next/server';
import { getAdminPassword, createAdminToken } from '@/lib/admin-auth';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body || {};

    const correctPassword = getAdminPassword();

    if (!password || password.trim() !== correctPassword.trim()) {
      return NextResponse.json({ success: false, error: 'Neteisingas slaptažodis' }, { status: 401 });
    }

    const token = await createAdminToken(correctPassword);

    const response = NextResponse.json({ success: true });
    // Set 30 days auth cookie
    response.cookies.set('ls_admin_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Klaida';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
