import Stripe from 'stripe';

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === 'sk_test_placeholder_key') {
    return null;
  }
  return new Stripe(key, {
    apiVersion: '2026-09-30.endive',
    httpClient: Stripe.createFetchHttpClient(), // Cloudflare Workers fetch compatibility
  });
}
