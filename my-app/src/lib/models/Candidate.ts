import mongoose, { Schema, type Document, type Model } from 'mongoose';

export const CANDIDATE_STATUSES = ['new', 'shortlisted', 'contacted', 'rejected'] as const;
export type CandidateStatus = (typeof CANDIDATE_STATUSES)[number];

/**
 * Candidate document — submitted from the public Careers page ("Didn't find a suitable role?" form).
 * Stored in the `candidates` collection, separate from the Contact page `inquiries`.
 */
export interface ICandidate extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  profile: string;
  status: CandidateStatus;
  createdAt: Date;
  updatedAt: Date;
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name is too long'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
      maxlength: [150, 'Email is too long'],
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      maxlength: [20, 'Mobile number is too long'],
    },
    location: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Preferred location is too long'],
    },
    role: {
      type: String,
      trim: true,
      default: '',
      maxlength: [150, 'Role is too long'],
    },
    profile: {
      type: String,
      trim: true,
      default: '',
      maxlength: [2000, 'Profile is too long'],
    },
    status: {
      type: String,
      enum: CANDIDATE_STATUSES,
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

candidateSchema.index({ createdAt: -1 });

// Prevent model re-compilation during Next.js hot-reload
const Candidate: Model<ICandidate> =
  mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', candidateSchema);

export default Candidate;
