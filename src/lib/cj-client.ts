/**
 * CJ Dropshipping OpenAPI Client
 * Connects directly to https://developers.cjdropshipping.com/api2.0/v1
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface CjProductSummary {
  id: string;
  nameEn: string;
  sku: string;
  bigImage: string;
  sellPrice: string;
  categoryId?: string;
  productType?: string;
  warehouseInventoryNum?: number;
  productUrl?: string;
}

export interface CjProductDetail {
  pid: string;
  productNameEn: string;
  productSku: string;
  productImage: string;
  productImageSet: string[];
  sellPrice: string;
  productWeight: string;
  description?: string;
  categoryId?: string;
  categoryName?: string;
  variants?: Array<{
    vid: string;
    variantSku: string;
    variantNameEn: string;
    variantImage?: string;
    variantSellPrice: string;
    variantWeight?: string;
  }>;
}

export function getCjAccessToken(): string | null {
  // 1. Check process.env.CJ_ACCESS_TOKEN
  if (process.env.CJ_ACCESS_TOKEN && process.env.CJ_ACCESS_TOKEN.trim()) {
    return process.env.CJ_ACCESS_TOKEN.trim();
  }

  // 2. Check .env.local file
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('CJ_ACCESS_TOKEN=')) {
          const token = trimmed.replace('CJ_ACCESS_TOKEN=', '').trim();
          if (token) return token;
        }
      }
    }
  } catch {}

  // 3. Check ~/.cj-mcp-token (encrypted token store)
  try {
    const homeDir = process.env.HOME || process.env.USERPROFILE || '.';
    const tokenFile = path.join(homeDir, '.cj-mcp-token');
    if (fs.existsSync(tokenFile)) {
      const encrypted = fs.readFileSync(tokenFile, 'utf8').trim();
      if (encrypted.includes(':')) {
        const key = crypto.createHash('sha256').update('cj-mcp-default-key-2026').digest();
        const parts = encrypted.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(parts.slice(1).join(':'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        const parsed = JSON.parse(decrypted);
        if (parsed.accessToken) return parsed.accessToken;
      }
    }
  } catch {}

  return null;
}

const CJ_API_BASE = 'https://developers.cjdropshipping.com/api2.0/v1';

export async function searchCjProducts(
  keyword: string,
  options: { page?: number; size?: number; categoryId?: string } = {}
): Promise<CjProductSummary[]> {
  const token = getCjAccessToken();
  if (!token) throw new Error('CJ_ACCESS_TOKEN is missing');

  const url = new URL(`${CJ_API_BASE}/product/listV2`);
  url.searchParams.set('keyWord', keyword);
  url.searchParams.set('page', String(options.page || 1));
  url.searchParams.set('size', String(options.size || 20));
  if (options.categoryId) url.searchParams.set('categoryId', options.categoryId);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
    },
  });

  const json = await res.json();
  if (json.code !== 200 && json.result !== true) {
    throw new Error(`CJ API Error: ${json.message || json.code}`);
  }

  const content = json.data?.content;
  if (!Array.isArray(content) || content.length === 0) return [];
  const list = content[0]?.productList || [];
  return list;
}

export async function getCjProductDetail(pid: string): Promise<CjProductDetail | null> {
  const token = getCjAccessToken();
  if (!token) throw new Error('CJ_ACCESS_TOKEN is missing');

  const url = new URL(`${CJ_API_BASE}/product/query`);
  url.searchParams.set('pid', pid);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
    },
  });

  const json = await res.json();
  if (json.code !== 200 && json.result !== true) {
    return null;
  }

  return json.data as CjProductDetail;
}
