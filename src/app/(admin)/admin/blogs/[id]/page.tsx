import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import { updateBlog } from '@/actions/updateBlog';
import AutoResizeTextarea from '@/components/AutoResizeTextarea'; // Reusing your component
import { ThemeToggleButton } from '@/components/ui/skiper26';
import { FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  // 1. Get the ID from the URL
  const { id } = await params; // In Next.js 15, params is a promise

  // 2. Fetch the existing blog data
  await connectDB();
  const blog = await Blog.findById(id).lean();

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // 3. Create a version of the action that already knows the ID
  // This allows us to pass 'id' to the server action without a hidden input
  const updateBlogWithId = updateBlog.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className='flex items-center gap-2'>
          <Link href="/admin/blogs">
            <Button variant={"outline"}><MoveLeft /></Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Blog</h1>
        </div>
        <ThemeToggleButton variant="circle" start='top-left' />
      </div>

      <form action={updateBlogWithId} className="bg-card p-8 rounded-lg shadow-md border border-border">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-6 mb-6">

          {/* Title */}
          <div className="col-span-2">
            <FieldLabel className="block text-sm font-medium text-foreground mb-2">Blog Title</FieldLabel>
            <Input
              name="title"
              type="text"
              defaultValue={blog.title} // <--- PRE-FILL DATA
              required

            />
          </div>

          {/* Type */}
          <div>
            <FieldLabel className="block text-sm font-medium text-foreground mb-2">Category</FieldLabel>
            <Select required name="type" defaultValue={blog.type}>
              <SelectTrigger className='w-full max-w-48'>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
              <br />
          {/* Image */}
          <div>
            <FieldLabel className="block text-sm font-medium text-foreground mb-2">Cover Image URL</FieldLabel>
            <Input
              name="image"
              type="text"
              defaultValue={blog.image} // <--- PRE-FILL DATA
              className='w-full max-w-100'
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <FieldLabel className="block text-sm font-medium text-foreground mb-2">Short Description</FieldLabel>
            <Textarea
              name="description"
              rows={2}
              required
              defaultValue={blog.description} // <--- PRE-FILL DATA

            ></Textarea>
          </div>

        </div>

        {/* Body Editor */}
        <div className="mt-8">
          <FieldLabel className="block text-sm font-medium text-foreground mb-2">
            Content (Markdown Supported)
          </FieldLabel>

          <Textarea
            name="body"
            defaultValue={blog.body} // <--- PRE-FILL DATA
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end gap-4">
          <Button
            variant={"default"}
            type="submit"
          >
            Update Blog
          </Button>
        </div>

      </form>
    </div>
  );
}