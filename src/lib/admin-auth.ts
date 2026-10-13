import { env } from 'cloudflare:workers';

export function getAdminPassword(): string {
  try {
    if (env?.ADMIN_PASSWORD) return env.ADMIN_PASSWORD;
  } catch {}
  return process.env.ADMIN_PASSWORD || 'LaserMaker#2026';
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
