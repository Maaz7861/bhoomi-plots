import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Candidate from '@/lib/models/Candidate';
import { getAuthFromRequest } from '@/lib/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const PROFILE_WORD_LIMIT = 200;

/**
 * GET /api/candidates
 * Protected (JWT) — returns all candidates, newest first.
 */
export async function GET(req: NextRequest) {
  try {
    const admin = getAuthFromRequest(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Access denied. No token provided.' },
        { status: 401 }
      );
    }

    await connectDB();

    const candidates = await Candidate.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: candidates });
  } catch (err) {
    console.error('[GET /api/candidates]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch candidates.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates
 * Public — saves a profile submitted from the Careers page form.
 * `website` is a honeypot field: real users never fill it, bots do.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot hit — pretend success, store nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const location = String(body.location ?? '').trim();
    const role = String(body.role ?? '').trim();
    const profile = String(body.profile ?? '').trim();

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Please enter your name.' },
        { status: 400 }
      );
    }
    if (!PHONE_RE.test(phone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid mobile number.' },
        { status: 400 }
      );
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    if (profile && profile.split(/\s+/).length > PROFILE_WORD_LIMIT) {
      return NextResponse.json(
        { success: false, message: `Profile can be at most ${PROFILE_WORD_LIMIT} words.` },
        { status: 400 }
      );
    }

    await connectDB();

    await Candidate.create({ name, email, phone, location, role, profile });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/candidates]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Could not submit your profile. Please try again.' },
      { status: 500 }
    );
  }
}
