'use server'

import connectDB  from '@/lib/database';
import Blog from '@/models/blog';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function addBlog(formData: FormData) {
  // 1. Get data from form fields
  const title = formData.get('title');
  const description = formData.get('description');
  const type = formData.get('type');
  const image = formData.get('image');
  const body = formData.get('body');

  // 2. Validate (Basic)
  if (!title || !body || !type) {
    throw new Error("Missing required fields");
  }

  // 3. Connect to DB and Create
  await connectDB();
  
  await Blog.create({
    title,
    description,
    type,
    image, // We will just save the URL string here
    body,
  });

  // 4. Refresh Cache & Redirect
  revalidatePath('/admin/blogs'); // Refresh the list page
  revalidatePath('/'); // Refresh the home page
  redirect('/admin/blogs'); // Go back to the admin list
}