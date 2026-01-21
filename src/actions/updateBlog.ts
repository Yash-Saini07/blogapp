'use server'

import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const type = formData.get('type');
  const image = formData.get('image');
  const body = formData.get('body');

  await connectDB();

  // Find the blog by ID and update it
  await Blog.findByIdAndUpdate(id, {
    title,
    description,
    type,
    image,
    body,
  });

  // Refresh data and go back to list
  revalidatePath('/admin/blogs');
  revalidatePath('/');
  redirect('/admin/blogs');
}