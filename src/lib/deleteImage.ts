import { del } from '@vercel/blob';
import connectDB from '@/lib/database';
import Blog from '@/models/blog';

/**
 * Safely deletes an image from Vercel Blob.
 * It checks MongoDB to ensure no other blog is using the same image URL.
 * 
 * @param imageUrl The full public URL of the image to delete
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.includes('vercel-storage.com')) {
    // We only attempt to delete Vercel Blob URLs. (Skip Cloudinary or empty strings)
    return;
  }

  try {
    await connectDB();
    
    // Integrity Check: Count how many blogs currently use this exact image URL
    // We expect the count to be 1 (the blog being deleted/edited) or 0 (if DB already updated)
    const usageCount = await Blog.countDocuments({ image: imageUrl });

    // If more than 1 blog uses this image, we CANNOT delete it, because 
    // our deduplication logic means they are sharing the exact same blob file!
    if (usageCount > 1) {
      console.log(`[deleteImage] Skipping deletion for ${imageUrl} because ${usageCount} blogs are sharing it.`);
      return;
    }

    // Proceed with deletion from Vercel Blob
    await del(imageUrl, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    console.log(`[deleteImage] Successfully deleted ${imageUrl} from Vercel Blob.`);

  } catch (error) {
    console.error(`[deleteImage] Failed to delete image:`, error);
  }
}
