import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

export const runtime = 'edge';

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get('stripe-signature');

  if (!webhookSecret || !signature) {
    return NextResponse.json({ error: 'Missing webhook configuration' }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerDetails = {
        name: session.customer_details?.name,
        email: session.customer_details?.email,
        address: session.customer_details?.address,
      };

      console.log('✅ [DROPSHIPPING SIGNAL] Order Paid via Stripe:', {
        sessionId: session.id,
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency,
        customer: customerDetails,
      });

      // Dispatch to CJ Dropshipping API
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown webhook error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
