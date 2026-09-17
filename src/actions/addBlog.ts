'use server'

import connectDB  from '@/lib/database';
import Blog from '@/models/blog';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/uploadImage';

export async function addBlog(formData: FormData) {
  // 1. Get data from form fields
  const title = formData.get('title');
  const description = formData.get('description');
  const type = formData.get('type');
  const body = formData.get('body');
  
  const imageFile = formData.get('imageFile') as File | null;
  const existingImage = formData.get('existingImage') as string | null;

  // 2. Validate (Basic)
  if (!title || !body || !type) {
    throw new Error("Missing required fields");
  }

  // 3. Handle Image Upload
  let finalImageUrl = existingImage || '';
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await uploadImage(imageFile);
  }

  // 4. Connect to DB and Create
  await connectDB();
  
  await Blog.create({
    title,
    description,
    type,
    image: finalImageUrl,
    body,
  });

  // 5. Refresh Cache & Redirect
  revalidatePath('/admin/blogs'); // Refresh the list page
  revalidatePath('/'); // Refresh the home page
  redirect('/admin/blogs'); // Go back to the admin list
}