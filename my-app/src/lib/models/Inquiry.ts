import mongoose, { Schema, type Document, type Model } from 'mongoose';

export const INQUIRY_STATUSES = ['new', 'contacted', 'closed'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

/**
 * Inquiry document — submitted from the public Contact page form.
 * Stored in the `inquiries` collection.
 */
export interface IInquiry extends Document {
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name is too long'],
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      maxlength: [20, 'Mobile number is too long'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
      maxlength: [150, 'Email is too long'],
    },
    interest: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Looking-for text is too long'],
    },
    message: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Message is too long'],
    },
    status: {
      type: String,
      enum: INQUIRY_STATUSES,
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({ createdAt: -1 });

// Prevent model re-compilation during Next.js hot-reload
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', inquirySchema);

export default Inquiry;
