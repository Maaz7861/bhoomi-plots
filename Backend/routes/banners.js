const express = require('express');
const Banner  = require('../models/Banner');
const auth    = require('../middleware/auth');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// GET /api/banners/active
// Public — returns the single active banner (used by landing page).
// IMPORTANT: This route must be declared BEFORE /:id to avoid
// "active" being interpreted as a MongoDB ObjectId.
// ─────────────────────────────────────────────────────────────
router.get('/active', async (req, res) => {
  try {
    const banner = await Banner.findOne({ isActive: true });
    return res.status(200).json({ success: true, data: banner || null });
  } catch (err) {
    console.error('[GET /api/banners/active]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch active banner.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/banners
// Public — returns all banners.
// ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: banners });
  } catch (err) {
    console.error('[GET /api/banners]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch banners.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/banners/:id
// Public — returns a single banner by ID.
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found.' });
    }
    return res.status(200).json({ success: true, data: banner });
  } catch (err) {
    console.error('[GET /api/banners/:id]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch banner.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/banners
// Protected (JWT) — create a new banner.
// If isActive is true, deactivates all other banners first.
// ─────────────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    if (req.body.isActive) {
      await Banner.updateMany({}, { isActive: false });
    }
    const banner = await Banner.create(req.body);
    return res.status(201).json({ success: true, data: banner });
  } catch (err) {
    console.error('[POST /api/banners]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to create banner.' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/banners/:id
// Protected (JWT) — update a banner.
// If isActive is being set to true, deactivates all other banners.
// ─────────────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    if (req.body.isActive) {
      // Deactivate all banners except the one being updated
      await Banner.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found.' });
    }
    return res.status(200).json({ success: true, data: banner });
  } catch (err) {
    console.error('[PUT /api/banners/:id]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to update banner.' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/banners/:id
// Protected (JWT) — delete a banner.
// ─────────────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found.' });
    }
    return res.status(200).json({ success: true, message: 'Banner deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/banners/:id]', err);
    return res.status(500).json({ success: false, message: 'Failed to delete banner.' });
  }
});

module.exports = router;
