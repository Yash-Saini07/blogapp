'use server'

import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/uploadImage';

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const type = formData.get('type');
  const body = formData.get('body');
  
  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string | null;

  await connectDB();

  // Fetch the existing blog to clean up its old image if a new one is provided
  const oldBlog = await Blog.findById(id).lean();

  // Handle Image Upload
  let finalImageUrl = existingImage || '';
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await uploadImage(imageFile);
    
    // If a completely new Vercel Blob URL was generated and we have an old one, delete the old one
    if (oldBlog && oldBlog.image && oldBlog.image !== finalImageUrl) {
      const { deleteImage } = await import('@/lib/deleteImage');
      await deleteImage(oldBlog.image);
    }
  }

  // Find the blog by ID and update it
  await Blog.findByIdAndUpdate(id, {
    title,
    description,
    type,
    image: finalImageUrl,
    body,
  });

  // Refresh data and go back to list
  revalidatePath('/admin/blogs');
  revalidatePath('/');
  redirect('/admin/blogs');
}