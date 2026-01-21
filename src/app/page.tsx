
import Body from "@/components/body";
import dbConnect from '@/lib/database';
import Blog from '@/models/blog';

export default async function Home() {

  await dbConnect();
  const rawBlogs = await Blog.find({}).lean();
  const blogs = rawBlogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
  }));

  return (
    <div>
      
      <Body blogs={blogs} />
    </div>
  );
}
