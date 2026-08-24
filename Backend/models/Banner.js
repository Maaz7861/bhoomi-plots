const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema(
  {
    // Cloudinary URL — frontend uploads to Cloudinary, sends URL here
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    ctaText: {
      type: String,
      trim: true,
      default: '',
    },
    link: {
      type: String,
      trim: true,
      default: '',
    },
    // Only one banner should be active at a time.
    // The PUT route enforces this by deactivating all others on activation.
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model('Banner', bannerSchema);
