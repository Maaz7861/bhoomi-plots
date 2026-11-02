import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Inquiry from '@/lib/models/Inquiry';
import { getAuthFromRequest } from '@/lib/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{10,16}$/;
const MESSAGE_WORD_LIMIT = 200;

/**
 * GET /api/inquiries
 * Protected (JWT) — returns all inquiries, newest first.
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

    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (err) {
    console.error('[GET /api/inquiries]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/inquiries
 * Public — saves an inquiry from the Contact page form.
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
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const interest = String(body.interest ?? '').trim();
    const message = String(body.message ?? '').trim();

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
    if (message && message.split(/\s+/).length > MESSAGE_WORD_LIMIT) {
      return NextResponse.json(
        { success: false, message: `Message can be at most ${MESSAGE_WORD_LIMIT} words.` },
        { status: 400 }
      );
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    await connectDB();

    await Inquiry.create({ name, phone, email, interest, message });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: unknown) {
    console.error('[POST /api/inquiries]', err);
    if (err instanceof Error && err.name === 'ValidationError') {
      const mongoErr = err as import('mongoose').Error.ValidationError;
      const messages = Object.values(mongoErr.errors).map((e) => e.message);
      return NextResponse.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Could not send your inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
