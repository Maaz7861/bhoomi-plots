import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Banner from '@/lib/models/Banner';
import { getAuthFromRequest } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/banners/[id]
 * Public — returns a single banner by ID.
 */
export async function GET(
  _req: NextRequest,
  context: RouteContext
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'Banner not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: banner });
  } catch (err) {
    console.error('[GET /api/banners/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch banner.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/banners/[id]
 * Protected (JWT) — update a banner.
 * If isActive is being set to true, deactivates all other banners.
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

    if (body.isActive) {
      // Deactivate all banners except the one being updated
      await Banner.updateMany({ _id: { $ne: id } }, { isActive: false });
    }

    const banner = await Banner.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'Banner not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: banner });
  } catch (err: unknown) {
    console.error('[PUT /api/banners/:id]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to update banner.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/banners/[id]
 * Protected (JWT) — delete a banner.
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
    const banner = await Banner.findByIdAndDelete(id);
    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'Banner not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully.',
    });
  } catch (err) {
    console.error('[DELETE /api/banners/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete banner.' },
      { status: 500 }
    );
  }
}
