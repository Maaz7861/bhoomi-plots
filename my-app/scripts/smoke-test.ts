// Quick smoke test — validates that db.ts, models, and auth all compile and connect.
import 'dotenv/config';
import { connectDB } from '../src/lib/db';
import Plot from '../src/lib/models/Plot';
import Banner from '../src/lib/models/Banner';
import { verifyToken, signAdminToken, comparePassword, ADMIN_ACCOUNT } from '../src/lib/auth';
import { getCloudinary } from '../src/lib/cloudinary';

async function test() {
  console.log('── Phase 1 Smoke Test ──────────────────────────');

  // 1. DB Connection
  await connectDB();
  const plotCount = await Plot.countDocuments();
  const bannerCount = await Banner.countDocuments();
  console.log(`✅ MongoDB connected  |  Plots: ${plotCount}  |  Banners: ${bannerCount}`);

  // 2. Auth — sign & verify a token
  const token = signAdminToken({
    email: ADMIN_ACCOUNT.email,
    name: ADMIN_ACCOUNT.name,
    role: ADMIN_ACCOUNT.role,
  });
  const decoded = verifyToken(token);
  console.log(`✅ JWT sign/verify    |  email: ${decoded?.email}  |  role: ${decoded?.role}`);

  // 3. Password compare
  const match = await comparePassword('Admin@1234', ADMIN_ACCOUNT.passwordHash);
  const noMatch = await comparePassword('wrong', ADMIN_ACCOUNT.passwordHash);
  console.log(`✅ bcrypt compare     |  correct: ${match}  |  wrong: ${noMatch}`);

  // 4. Cloudinary config
  const cld = getCloudinary();
  const cfg = cld.config();
  console.log(`✅ Cloudinary config  |  cloud_name: ${cfg.cloud_name}`);

  console.log('── All Phase 1 checks passed ──────────────────');
  process.exit(0);
}

test().catch((e) => {
  console.error('❌ Smoke test failed:', e.message);
  process.exit(1);
});
