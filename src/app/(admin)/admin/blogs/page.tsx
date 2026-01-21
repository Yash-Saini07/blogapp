import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import AdminBlogRow from '@/components/AdminBlogRow';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/ui/skiper26';
export const dynamic = 'force-dynamic'

export default async function BlogListPage() {
  await connectDB();

  // Fetch blogs sorted by Newest First
  // .lean() makes it a plain JS object (faster)
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  // Convert _id objects to strings to avoid serialization warnings
  const serializedBlogs = blogs.map(blog => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString()
  }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
          <Link
            href="/admin/blogs/add"
          // className="bg-black text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            <Button variant={"outline"}>Create New+</Button>
          </Link>
        </div>
        <div className="self-end sm:self-auto hidden sm:block">
          <ThemeToggleButton variant="circle" start='top-left' />
        </div>
        {/* Mobile Theme Toggle separate or handle above? 
            Actually, let's just keep the original structure but flex-col.
        */}
        <div className="sm:hidden self-end">
          <ThemeToggleButton variant="circle" start='top-left' />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow border border-border overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead className="bg-gray-100 dark:bg-zinc-900 border-b border-border">
            <tr>
              <th className="p-4 font-semibold w-3/4 text-foreground">Title (Preview)</th>
              <th className="p-4 font-semibold text-foreground">Date</th>
              <th className="p-4 font-semibold text-right text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serializedBlogs.map((blog) => (
              <AdminBlogRow key={blog._id} blog={blog} />
            ))}

            {serializedBlogs.length === 0 && (
              <tr>
                <td colSpan={3} className="p-10 text-center text-border">
                  No blogs found. Start writing!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}