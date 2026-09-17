import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import Blog from '@/models/blog';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ _id: -1 }).limit(5).lean();
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
