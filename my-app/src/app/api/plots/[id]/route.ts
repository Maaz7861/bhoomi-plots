import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Plot from '@/lib/models/Plot';
import { getAuthFromRequest } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/plots/[id]
 * Public — returns a single plot by ID.
 */
export async function GET(
  _req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const plot = await Plot.findById(id);
    if (!plot) {
      return NextResponse.json(
        { success: false, message: 'Plot not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: plot });
  } catch (err) {
    console.error('[GET /api/plots/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch plot.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/plots/[id]
 * Protected (JWT) — update an existing plot.
 */
export async function PUT(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const admin = getAuthFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await context.params;
    const body = await req.json();
    const plot = await Plot.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!plot) {
      return NextResponse.json(
        { success: false, message: 'Plot not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: plot });
  } catch (err: unknown) {
    console.error('[PUT /api/plots/:id]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to update plot.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/plots/[id]
 * Protected (JWT) — delete a plot.
 */
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const admin = getAuthFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await context.params;
    const plot = await Plot.findByIdAndDelete(id);
    if (!plot) {
      return NextResponse.json(
        { success: false, message: 'Plot not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Plot deleted successfully.',
    });
  } catch (err) {
    console.error('[DELETE /api/plots/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete plot.' },
      { status: 500 }
    );
  }
}
