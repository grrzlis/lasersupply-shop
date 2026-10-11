import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

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

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder_key') {
      return NextResponse.json({
        mock: true,
        message: 'Stripe API key not yet connected in .env.local. Add STRIPE_SECRET_KEY to enable live checkout.',
      });
    }

    const origin = req.headers.get('origin') || 'https://lasersupply.org';

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.images && item.images.length > 0 ? [item.images[0]] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: [
          'LT', 'LV', 'EE', 'DE', 'FR', 'PL', 'IT', 'ES', 'NL', 'BE', 'AT', 'DK', 'SE', 'FI', 'IE'
        ],
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Stripe Checkout Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
