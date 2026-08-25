const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['plots', 'land', 'residential', 'commercial'],
        message: 'Category must be one of: plots, land, residential, commercial',
      },
    },
    price: {
      type: String,
      required: [true, 'Price is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    features: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      trim: true,
    },
    reraNumber: {
      type: String,
      trim: true,
      default: '',
    },
    developer: {
      type: String,
      trim: true,
      default: 'Bhoomi Projects',
    },
    // Cloudinary URL — frontend uploads to Cloudinary, sends URL here
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model('Plot', plotSchema);
