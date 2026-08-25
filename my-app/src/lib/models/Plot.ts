import mongoose, { Schema, type Document, type Model } from 'mongoose';

/**
 * Plot document interface — includes priceRange and BHK options.
 */
export interface IPlot extends Document {
  title: string;
  category: 'plots' | 'land' | 'residential' | 'commercial';
  price: string;
  priceRange?: string; // e.g. "50L - 80L" or "₹ 51 Lakh - ₹ 94 Lakh"
  bhk?: string;        // e.g. "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK", "2, 3 BHK" (for residential)
  location: string;
  description: string;
  features: string;
  status: string;
  reraNumber: string;
  developer?: string;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const plotSchema = new Schema<IPlot>(
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
    priceRange: {
      type: String,
      trim: true,
      default: '',
    },
    bhk: {
      type: String,
      trim: true,
      default: '',
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
    timestamps: true,
  }
);

// Prevent model re-compilation during Next.js hot-reload
const Plot: Model<IPlot> =
  mongoose.models.Plot || mongoose.model<IPlot>('Plot', plotSchema);

export default Plot;
