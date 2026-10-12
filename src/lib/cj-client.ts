/**
 * CJ Dropshipping OpenAPI Client
 * Connects directly to https://developers.cjdropshipping.com/api2.0/v1
 */

import { getRequestContext } from '@cloudflare/next-on-pages';

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
  // 1. Check Cloudflare Worker env context
  try {
    const ctx = getRequestContext();
    const envObj = ctx?.env as Record<string, string | undefined> | undefined;
    if (envObj?.CJ_ACCESS_TOKEN && envObj.CJ_ACCESS_TOKEN.trim()) {
      return envObj.CJ_ACCESS_TOKEN.trim();
    }
  } catch {}

  // 2. Check process.env.CJ_ACCESS_TOKEN
  if (process.env.CJ_ACCESS_TOKEN && process.env.CJ_ACCESS_TOKEN.trim()) {
    return process.env.CJ_ACCESS_TOKEN.trim();
  }

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

export interface CreateCjOrderParams {
  orderNumber: string;
  shippingZip: string;
  shippingCountry: string;
  shippingCountryCode: string;
  shippingProvince?: string;
  shippingCity: string;
  shippingAddress: string;
  shippingCustomerName: string;
  shippingPhone: string;
  logisticName?: string;
  fromCountryCode?: string;
  products: Array<{
    vid?: string;
    sku?: string;
    quantity: number;
  }>;
}

export async function createCjOrder(params: CreateCjOrderParams): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const token = getCjAccessToken();
  if (!token) {
    return { success: false, error: 'CJ_ACCESS_TOKEN is missing' };
  }

  const payload = {
    orderNumber: params.orderNumber,
    shippingZip: params.shippingZip || '00000',
    shippingCountry: params.shippingCountry || 'Lithuania',
    shippingCountryCode: (params.shippingCountryCode || 'LT').toUpperCase(),
    shippingProvince: params.shippingProvince || params.shippingCity || 'Default',
    shippingCity: params.shippingCity || 'City',
    shippingAddress: params.shippingAddress,
    shippingCustomerName: params.shippingCustomerName || 'Valued Customer',
    shippingPhone: params.shippingPhone || '+37060000000',
    fromCountryCode: params.fromCountryCode || 'CN',
    logisticName: params.logisticName || 'CJPacket Ordinary',
    products: params.products,
  };

  try {
    const res = await fetch(`${CJ_API_BASE}/shopping/order/createOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CJ-Access-Token': token,
      },
      body: JSON.stringify(payload),
    });

    const json = (await res.json()) as { code: number; result: boolean; message: string; data?: string };

    if (json.code === 200 && json.result === true) {
      return { success: true, orderId: json.data || params.orderNumber };
    }

    return { success: false, error: json.message || `Code: ${json.code}` };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Network error' };
  }
}

