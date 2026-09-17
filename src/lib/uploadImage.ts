import { put } from '@vercel/blob';
import crypto from 'crypto';

/**
 * Helper to upload an image to Vercel Blob with deduplication based on content.
 * @param file The file object from FormData
 * @returns The resulting public URL string
 */
export async function uploadImage(file: File): Promise<string> {
  // 1. Convert file to buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Compute SHA-256 hash of the file content
  const hashSum = crypto.createHash('sha256');
  hashSum.update(buffer);
  const hexHash = hashSum.digest('hex');

  // 3. Extract the original file extension
  const originalName = file.name;
  const extension = originalName.includes('.') 
    ? originalName.substring(originalName.lastIndexOf('.')) 
    : '';

  // 4. Create a unique filename based solely on content
  const uniqueFilename = `${hexHash}${extension}`;

  // 5. Upload to Vercel Blob
  // We set addRandomSuffix: false to use our exact hash name.
  // We set allowOverwrite: true so that if another user uploads the exact same image,
  // we just overwrite it safely (preventing duplicate storage) rather than throwing an error.
  const blob = await put(uniqueFilename, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true, 
  });

  return blob.url;
}
