/**
 * AliExpress Dropshipping OpenAPI Client
 * Supports automated dropshipping order placement & tracking via AliExpress Open Platform.
 * 
 * Documentation:
 * API: aliexpress.trade.buy.placeorder
 * API: aliexpress.trade.ds.order.get
 * Gateway: https://api-sg.aliexpress.com/rest or https://eco.taobao.com/router/rest
 */

export interface AliExpressConfig {
  appKey: string;
  appSecret: string;
  accessToken: string;
  gatewayUrl?: string;
}

export interface PlaceAliExpressOrderParams {
  outOrderId: string;
  shippingAddress: {
    contactPerson: string;
    fullName?: string;
    phoneCountry: string;
    mobileNo: string;
    country: string;
    province?: string;
    city: string;
    address: string;
    address2?: string;
    zip: string;
    taxId?: string;
  };
  productItems: Array<{
    productId: string | number;
    skuAttr?: string;
    productCount: number;
    logisticsServiceName?: string;
  }>;
}

export interface AliExpressOrderResult {
  success: boolean;
  orderList?: Array<string | number>;
  errorMessage?: string;
  errorCode?: string;
  raw?: unknown;
}

let cachedWorkerEnv: any = null;
async function getWorkerEnv() {
  if (cachedWorkerEnv) return cachedWorkerEnv;
  try {
    // @ts-ignore
    const mod = await import('cloudflare:workers');
    cachedWorkerEnv = mod?.env;
  } catch {}
  return cachedWorkerEnv;
}

export async function getAliExpressConfig(): Promise<AliExpressConfig | null> {
  let appKey = process.env.ALIEXPRESS_APP_KEY;
  let appSecret = process.env.ALIEXPRESS_APP_SECRET;
  let accessToken = process.env.ALIEXPRESS_ACCESS_TOKEN;
  let gatewayUrl = process.env.ALIEXPRESS_GATEWAY_URL || 'https://api-sg.aliexpress.com/rest';

  const wEnv = await getWorkerEnv();
  if (wEnv) {
    if (wEnv.ALIEXPRESS_APP_KEY) appKey = wEnv.ALIEXPRESS_APP_KEY;
    if (wEnv.ALIEXPRESS_APP_SECRET) appSecret = wEnv.ALIEXPRESS_APP_SECRET;
    if (wEnv.ALIEXPRESS_ACCESS_TOKEN) accessToken = wEnv.ALIEXPRESS_ACCESS_TOKEN;
    if (wEnv.ALIEXPRESS_GATEWAY_URL) gatewayUrl = wEnv.ALIEXPRESS_GATEWAY_URL;
  }

  if (appKey && appSecret && accessToken) {
    return {
      appKey: appKey.trim(),
      appSecret: appSecret.trim(),
      accessToken: accessToken.trim(),
      gatewayUrl: gatewayUrl.trim(),
    };
  }

  return null;
}

/**
 * Generate HMAC-SHA256 signature for AliExpress / Taobao Open Platform
 */
async function generateAliExpressSignature(
  method: string,
  params: Record<string, string>,
  appSecret: string
): Promise<string> {
  const sortedKeys = Object.keys(params).sort();
  let queryStr = method || '';
  for (const key of sortedKeys) {
    queryStr += `${key}${params[key]}`;
  }

  // Web Crypto API HMAC-SHA256 (supported on Cloudflare Workers edge runtime)
  const encoder = new TextEncoder();
  const keyData = encoder.encode(appSecret);
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(queryStr)
  );

  // Convert to upper-case HEX
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Place dropshipping order via AliExpress Open Platform
 * API method: aliexpress.trade.buy.placeorder
 */
export async function placeAliExpressOrder(
  order: PlaceAliExpressOrderParams
): Promise<AliExpressOrderResult> {
  const config = await getAliExpressConfig();
  if (!config) {
    return {
      success: false,
      errorMessage: 'AliExpress credentials (ALIEXPRESS_APP_KEY, ALIEXPRESS_APP_SECRET, ALIEXPRESS_ACCESS_TOKEN) not configured.',
    };
  }

  const timestamp = String(Date.now());
  const method = 'aliexpress.trade.buy.placeorder';

  const logisticsAddress = {
    contact_person: order.shippingAddress.contactPerson,
    full_name: order.shippingAddress.fullName || order.shippingAddress.contactPerson,
    phone_country: order.shippingAddress.phoneCountry || '+370',
    mobile_no: order.shippingAddress.mobileNo,
    country: order.shippingAddress.country.toUpperCase(),
    province: order.shippingAddress.province || order.shippingAddress.city,
    city: order.shippingAddress.city,
    address: order.shippingAddress.address,
    address2: order.shippingAddress.address2 || '',
    zip: order.shippingAddress.zip,
    tax_type: order.shippingAddress.taxId ? 'TAX' : '',
    tax_number: order.shippingAddress.taxId || '',
  };

  const productItemsPayload = order.productItems.map(item => ({
    product_id: String(item.productId),
    sku_attr: item.skuAttr || '',
    product_count: item.productCount,
    logistics_service_name: item.logisticsServiceName || 'AliExpress Standard Shipping',
  }));

  const requestDto = {
    logistics_address: logisticsAddress,
    product_items: productItemsPayload,
    out_order_id: order.outOrderId,
  };

  const sysParams: Record<string, string> = {
    app_key: config.appKey,
    timestamp,
    format: 'json',
    v: '2.0',
    sign_method: 'sha256',
    method,
    access_token: config.accessToken,
    session: config.accessToken,
    param_place_order_request4_open_api_d_t_o: JSON.stringify(requestDto),
  };

  try {
    const signature = await generateAliExpressSignature(method, sysParams, config.appSecret);
    sysParams.sign = signature;

    const urlParams = new URLSearchParams(sysParams);
    const endpoint = `${config.gatewayUrl || 'https://api-sg.aliexpress.com/rest'}?${urlParams.toString()}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const data = (await res.json()) as any;

    // Response structure handling
    const resultObj =
      data.aliexpress_trade_buy_placeorder_response?.result ||
      data.result ||
      data;

    if (resultObj.is_success === true || resultObj.order_list) {
      return {
        success: true,
        orderList: resultObj.order_list || [order.outOrderId],
        raw: data,
      };
    }

    const errCode = data.error_response?.code || resultObj.error_code || 'AE_ORDER_FAILED';
    const errSub = data.error_response?.sub_msg || resultObj.error_msg || data.error_response?.msg || 'Failed to place order';

    return {
      success: false,
      errorCode: String(errCode),
      errorMessage: errSub,
      raw: data,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown network error';
    return {
      success: false,
      errorMessage: msg,
    };
  }
}
