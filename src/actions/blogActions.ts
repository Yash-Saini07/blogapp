'use server'

import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import { revalidatePath } from 'next/cache';
import { deleteImage } from '@/lib/deleteImage';

export async function deleteBlog(blogId: string) {
  await connectDB();
  
  // 1. Fetch the blog to get its image URL
  const blog = await Blog.findById(blogId).lean();
  if (blog && blog.image) {
    // 2. Safely attempt to delete the image from Vercel Blob
    // This will only delete if no other blogs are using this image
    await deleteImage(blog.image);
  }

  // 3. Delete the blog document from MongoDB
  await Blog.findByIdAndDelete(blogId);
  
  revalidatePath('/admin/blogs'); // Refresh the list immediately
}