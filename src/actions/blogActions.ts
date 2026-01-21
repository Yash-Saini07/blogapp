'use server'

import  connectDB  from '@/lib/database';
import Blog from '@/models/blog';
import { revalidatePath } from 'next/cache';

export async function deleteBlog(blogId: string) {
  await connectDB();
  await Blog.findByIdAndDelete(blogId);
  revalidatePath('/admin/blogs'); // Refresh the list immediately
}