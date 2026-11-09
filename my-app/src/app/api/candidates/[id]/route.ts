import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Candidate, { CANDIDATE_STATUSES } from '@/lib/models/Candidate';
import { getAuthFromRequest } from '@/lib/auth';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * PUT /api/candidates/[id]
 * Protected (JWT) — update the status of a candidate.
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

    if (!CANDIDATE_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status.' },
        { status: 400 }
      );
    }

    await connectDB();

    const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: 'Candidate not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: candidate });
  } catch (err) {
    console.error('[PUT /api/candidates/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update candidate.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/candidates/[id]
 * Protected (JWT) — delete a candidate.
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
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return NextResponse.json(
        { success: false, message: 'Candidate not found.' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: 'Candidate deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/candidates/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete candidate.' },
      { status: 500 }
    );
  }
}
