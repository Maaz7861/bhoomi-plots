import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

/**
 * Single hardcoded admin account.
 * No register endpoint — only this account can authenticate.
 *
 * Placeholder password: Admin@1234
 * Change the passwordHash before going to production by running:
 *   node -e "const b=require('bcryptjs'); b.hash('YOUR_NEW_PASS',12).then(h=>console.log(h))"
 */
export const ADMIN_ACCOUNT = {
  email: 'admin@bhoomigroup.com',
  // bcrypt hash of "Admin@1234" — rounds: 12
  passwordHash: '$2a$12$YWyKKJDiXKUaiKUTaPxLseB1p6vicWsqszYHNPgibLMi/H3kcw/Jy',
  name: 'Bhoomi Admin',
  role: 'admin',
} as const;

const JWT_SECRET: string =
  process.env.JWT_SECRET || 'bhoomi_default_jwt_secret_key_2025';

// ── Token Helpers ────────────────────────────────────────────

export interface AdminPayload {
  email: string;
  name: string;
  role: string;
}

/**
 * Sign a JWT for the admin user.
 */
export function signAdminToken(payload: AdminPayload): string {
  const expiresIn = (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify and decode a JWT. Returns the decoded payload or null if invalid.
 */
export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as unknown as AdminPayload;
  } catch {
    return null;
  }
}

// ── Password Helpers ─────────────────────────────────────────

/**
 * Compare a plain-text password against the stored bcrypt hash.
 */
export async function comparePassword(
  plainText: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

// ── Request Auth Extraction ──────────────────────────────────

/**
 * Extract and verify the JWT from a NextRequest's Authorization header.
 * Returns the decoded admin payload if valid, or null if missing/invalid.
 *
 * Usage in API route handlers:
 * ```ts
 * const admin = getAuthFromRequest(req);
 * if (!admin) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
 * ```
 */
export function getAuthFromRequest(req: NextRequest): AdminPayload | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return verifyToken(token);
}
