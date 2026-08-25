import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary configuration — reads from server-side env vars.
 * These are NOT prefixed with NEXT_PUBLIC_ so they stay private.
 *
 * Call `getCloudinary()` in API route handlers to get the configured instance.
 */

let configured = false;

export function getCloudinary() {
  if (!configured) {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error(
        '❌ Cloudinary env vars missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local'
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    configured = true;
  }

  return cloudinary;
}
