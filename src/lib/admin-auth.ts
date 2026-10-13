import { getRequestContext } from '@cloudflare/next-on-pages';

export function getAdminPassword(): string {
  let pw = process.env.ADMIN_PASSWORD;
  try {
    const ctx = getRequestContext();
    const envObj = ctx?.env as Record<string, string | undefined> | undefined;
    if (envObj?.ADMIN_PASSWORD) pw = envObj.ADMIN_PASSWORD;
  } catch {}
  return pw || 'LaserMaker#2026';
}

export async function createAdminToken(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const secret = encoder.encode(password);
  const data = encoder.encode(`lasersupply_admin_v1_${password}`);
  const key = await crypto.subtle.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, data);
  const hashArray = Array.from(new Uint8Array(sig));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyAdminToken(token: string | null | undefined): Promise<boolean> {
  if (!token) return false;
  const currentPw = getAdminPassword();
  const validToken = await createAdminToken(currentPw);
  return token === validToken;
}
