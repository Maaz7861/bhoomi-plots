import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Inquiry, { INQUIRY_STATUSES } from '@/lib/models/Inquiry';
import { getAuthFromRequest } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/inquiries/[id]
 * Protected (JWT) — update the status of an inquiry.
 */
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const admin = getAuthFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const { status } = await req.json();

    if (!INQUIRY_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status.' },
        { status: 400 }
      );
    }

    await connectDB();

    const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: inquiry });
  } catch (err) {
    console.error('[PUT /api/inquiries/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update inquiry.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/inquiries/[id]
 * Protected (JWT) — delete an inquiry.
 */
export async function DELETE(req: NextRequest, context: RouteContext) {
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
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: 'Inquiry not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/inquiries/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}
