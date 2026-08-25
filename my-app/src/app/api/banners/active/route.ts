import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Banner from '@/lib/models/Banner';

/**
 * GET /api/banners/active
 * Public — returns the single active banner (used by landing page).
 */
export async function GET() {
  try {
    await connectDB();

    const banner = await Banner.findOne({ isActive: true });
    return NextResponse.json({ success: true, data: banner || null });
  } catch (err) {
    console.error('[GET /api/banners/active]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch active banner.' },
      { status: 500 }
    );
  }
}
