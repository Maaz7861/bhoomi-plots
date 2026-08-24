const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const admin   = require('../config/admin');

const router = express.Router();

/**
 * POST /api/auth/login
 * Public — no registration endpoint.
 * Compares against the single hardcoded admin in config/admin.js.
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    // ① Check email
    if (email.toLowerCase() !== admin.email.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // ② Check password against bcrypt hash
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // ③ Sign JWT — payload contains non-sensitive identity info
    const payload = {
      email: admin.email,
      name:  admin.name,
      role:  admin.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });

    return res.status(200).json({
      success: true,
      token,
      admin: {
        name:  admin.name,
        email: admin.email,
        role:  admin.role,
      },
    });
  } catch (err) {
    console.error('[POST /api/auth/login]', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

module.exports = router;
