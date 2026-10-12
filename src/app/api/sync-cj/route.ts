import { NextResponse } from 'next/server';
import { syncCatalogFromCj } from '@/lib/cj-sync';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const secret = process.env.ADMIN_SYNC_SECRET || 'lasersupply-sync-2026';

    if (key !== secret) {
      return NextResponse.json({ error: 'Unauthorized: Invalid sync key' }, { status: 401 });
    }

    const result = await syncCatalogFromCj();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      totalSynced: result.totalSynced,
      message: `Successfully synchronized ${result.totalSynced} products and images from CJ Dropshipping.`,
      products: result.products.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.supplier_sku,
        cost_price: p.cost_price,
        retail_price: p.price,
        compare_at_price: p.compare_at_price,
        image_count: p.images.length,
        thumbnail: p.images[0],
      })),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to sync with CJ Dropshipping';
    return NextResponse.json({
      success: false,
      error: message,
    }, { status: 500 });

  }
}

export async function POST(request: Request) {
  return GET(request);
}
