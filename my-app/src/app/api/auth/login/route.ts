import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import {
  ADMIN_ACCOUNT,
  comparePassword,
  signAdminToken,
} from '@/lib/auth';

/**
 * POST /api/auth/login
 * Public — no registration endpoint.
 * Compares against the single hardcoded admin in lib/auth.ts.
 */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // ① Check email
    if (email.toLowerCase() !== ADMIN_ACCOUNT.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // ② Check password against bcrypt hash
    const isMatch = await comparePassword(password, ADMIN_ACCOUNT.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    // ③ Sign JWT — payload contains non-sensitive identity info
    const payload = {
      email: ADMIN_ACCOUNT.email,
      name: ADMIN_ACCOUNT.name,
      role: ADMIN_ACCOUNT.role,
    };

    const token = signAdminToken(payload);

    return NextResponse.json({
      success: true,
      token,
      admin: {
        name: ADMIN_ACCOUNT.name,
        email: ADMIN_ACCOUNT.email,
        role: ADMIN_ACCOUNT.role,
      },
    });
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
