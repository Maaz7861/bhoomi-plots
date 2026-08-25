import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Plot from '@/lib/models/Plot';
import { getAuthFromRequest } from '@/lib/auth';

/**
 * GET /api/plots
 * Public — returns all plots. Optional ?category= filter.
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const filter: Record<string, string> = {};
    if (category) {
      filter.category = category;
    }

    const plots = await Plot.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: plots });
  } catch (err) {
    console.error('[GET /api/plots]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch plots.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/plots
 * Protected (JWT) — create a new plot.
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
    const plot = await Plot.create(body);
    return NextResponse.json({ success: true, data: plot }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/plots]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create plot.' },
      { status: 500 }
    );
  }
}
