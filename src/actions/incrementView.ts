'use server'

import connectDB from '@/lib/database';
import Blog from '@/models/blog';

export async function incrementView(blogId: string) {
  await connectDB();
  // Increment view by 1
  await Blog.findByIdAndUpdate(blogId, { $inc: { views: 1 } });
}