import mongoose, { Schema, type Document, type Model } from 'mongoose';

/**
 * Banner document interface — mirrors the Backend/models/Banner.js schema exactly.
 */
export interface IBanner extends Document {
  imageUrl: string;
  ctaText: string;
  link: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    // Cloudinary URL — admin uploads image to Cloudinary, stores the URL here
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

// Prevent model re-compilation during Next.js hot-reload
const Banner: Model<IBanner> =
  mongoose.models.Banner || mongoose.model<IBanner>('Banner', bannerSchema);

export default Banner;
