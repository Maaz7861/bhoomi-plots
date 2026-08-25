import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Banner from '@/lib/models/Banner';
import { getAuthFromRequest } from '@/lib/auth';

/**
 * GET /api/banners
 * Public — returns all banners.
 */
export async function GET() {
  try {
    await connectDB();

    const banners = await Banner.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch (err) {
    console.error('[GET /api/banners]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch banners.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/banners
 * Protected (JWT) — create a new banner.
 * If isActive is true, deactivates all other banners first.
 */
export async function POST(req: NextRequest) {
  try {
    const admin = getAuthFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    if (body.isActive) {
      await Banner.updateMany({}, { isActive: false });
    }

    const banner = await Banner.create(body);
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/banners]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create banner.' },
      { status: 500 }
    );
  }
}
