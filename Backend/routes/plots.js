const express = require('express');
const Plot    = require('../models/Plot');
const auth    = require('../middleware/auth');

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// GET /api/plots
// Public — returns all plots. Optional ?category= filter.
// ─────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const plots = await Plot.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: plots });
  } catch (err) {
    console.error('[GET /api/plots]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch plots.' });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/plots/:id
// Public — returns a single plot by ID.
// ─────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found.' });
    }
    return res.status(200).json({ success: true, data: plot });
  } catch (err) {
    console.error('[GET /api/plots/:id]', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch plot.' });
  }
});

// ─────────────────────────────────────────────────────────────
// POST /api/plots
// Protected (JWT) — create a new plot.
// ─────────────────────────────────────────────────────────────
router.post('/', auth, async (req, res) => {
  try {
    const plot = await Plot.create(req.body);
    return res.status(201).json({ success: true, data: plot });
  } catch (err) {
    console.error('[POST /api/plots]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to create plot.' });
  }
});

// ─────────────────────────────────────────────────────────────
// PUT /api/plots/:id
// Protected (JWT) — update an existing plot.
// ─────────────────────────────────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  try {
    const plot = await Plot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found.' });
    }
    return res.status(200).json({ success: true, data: plot });
  } catch (err) {
    console.error('[PUT /api/plots/:id]', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    return res.status(500).json({ success: false, message: 'Failed to update plot.' });
  }
});

// ─────────────────────────────────────────────────────────────
// DELETE /api/plots/:id
// Protected (JWT) — delete a plot.
// ─────────────────────────────────────────────────────────────
router.delete('/:id', auth, async (req, res) => {
  try {
    const plot = await Plot.findByIdAndDelete(req.params.id);
    if (!plot) {
      return res.status(404).json({ success: false, message: 'Plot not found.' });
    }
    return res.status(200).json({ success: true, message: 'Plot deleted successfully.' });
  } catch (err) {
    console.error('[DELETE /api/plots/:id]', err);
    return res.status(500).json({ success: false, message: 'Failed to delete plot.' });
  }
});

module.exports = router;
