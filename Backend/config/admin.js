/**
 * Single hardcoded admin account.
 * No register endpoint — only this account can authenticate.
 *
 * Placeholder password: Admin@1234
 * Change the passwordHash before going to production by running:
 *   node -e "const b=require('bcryptjs'); b.hash('YOUR_NEW_PASS',12).then(h=>console.log(h))"
 */
module.exports = {
  email: 'admin@bhoomigroup.com',
  // bcrypt hash of "Admin@1234" — rounds: 12
  passwordHash: '$2a$12$YWyKKJDiXKUaiKUTaPxLseB1p6vicWsqszYHNPgibLMi/H3kcw/Jy',
  name: 'Bhoomi Admin',
  role: 'admin',
};
