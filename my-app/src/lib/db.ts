import mongoose from 'mongoose';

/**
 * MongoDB connection singleton for Next.js.
 *
 * In development, Next.js hot-reloads modules, which would create
 * multiple Mongoose connections. We cache the connection promise on
 * the Node.js `global` object so it survives hot reloads.
 *
 * In production, module-level caching is sufficient since there's
 * no hot-reload.
 */

/* eslint-disable no-var */
declare global {
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}
/* eslint-enable no-var */

export async function connectDB(): Promise<typeof mongoose> {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('❌ MONGO_URI is not defined in .env.local');
  }

  // If already connected, return immediately
  if (mongoose.connections[0]?.readyState === 1) {
    return mongoose;
  }

  // Reuse cached promise if it exists (survives HMR in dev)
  if (!global._mongoosePromise) {
    global._mongoosePromise = mongoose.connect(uri, {
      bufferCommands: false, // fail fast instead of buffering when disconnected
    });
  }

  try {
    await global._mongoosePromise;
    return mongoose;
  } catch (err) {
    // Clear the cached promise so the next call retries
    global._mongoosePromise = undefined;
    throw err;
  }
}
