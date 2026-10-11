import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';

interface CheckoutItemPayload {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CheckoutItemPayload[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Read environment secret directly from Cloudflare Worker context OR process.env
    let secretKey = process.env.STRIPE_SECRET_KEY;
    try {
      const ctx = getRequestContext();
      if (ctx?.env && (ctx.env as any).STRIPE_SECRET_KEY) {
        secretKey = (ctx.env as any).STRIPE_SECRET_KEY;
      }
    } catch {
      // fallback to process.env
    }

    if (!secretKey || secretKey === 'sk_test_placeholder_key') {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY not configured in Cloudflare environment.' },
        { status: 500 }
      );
    }

    const origin = req.headers.get('origin') || 'https://lasersupply.org';

    // Build URL-encoded form body for direct Stripe REST API call
    // This avoids bundling Node.js modules or heavyweight Stripe SDK internals on Cloudflare Workers
    const formParams = new URLSearchParams();
    formParams.append('mode', 'payment');
    formParams.append('success_url', `${origin}/en?session_id={CHECKOUT_SESSION_ID}&success=true`);
    formParams.append('cancel_url', `${origin}`);

    const allowedCountries = [
      'LT', 'LV', 'EE', 'DE', 'FR', 'PL', 'IT', 'ES', 'NL', 'BE', 'AT', 'DK', 'SE', 'FI', 'IE'
    ];
    allowedCountries.forEach((country, index) => {
      formParams.append(`shipping_address_collection[allowed_countries][${index}]`, country);
    });

    items.forEach((item, index) => {
      formParams.append(`line_items[${index}][quantity]`, String(item.quantity));
      formParams.append(`line_items[${index}][price_data][currency]`, 'eur');
      formParams.append(
        `line_items[${index}][price_data][unit_amount]`,
        String(Math.round(item.price * 100))
      );
      formParams.append(`line_items[${index}][price_data][product_data][name]`, item.name);
      if (item.images && item.images.length > 0) {
        formParams.append(
          `line_items[${index}][price_data][product_data][images][0]`,
          item.images[0]
        );
      }
    });

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey.trim()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    });

    const sessionData = await stripeRes.json() as any;

    if (!stripeRes.ok) {
      const errDetail = sessionData?.error?.message || 'Stripe API error';
      console.error('Stripe API error:', errDetail);
      return NextResponse.json({ error: errDetail }, { status: 500 });
    }

    return NextResponse.json({ url: sessionData.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe Checkout Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
