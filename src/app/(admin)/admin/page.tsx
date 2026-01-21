import connectDB from '@/lib/database';
import Blog from '@/models/blog';
import Subscriber from '@/models/subscriber';
import { ThemeToggleButton } from '@/components/ui/skiper26';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function AdminDashboard() {
  await connectDB();

  // 1. Fetch all stats in parallel (faster)
  const [blogCount, subscriberCount, viewsResult] = await Promise.all([
    Blog.countDocuments(),       // Count total blogs
    Subscriber.countDocuments(), // Count total subscribers
    
    // Calculate total views across ALL blogs
    Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ])
  ]);

  // Extract the view count safely (it might be 0 if no blogs exist)
  const totalViews = viewsResult[0]?.totalViews || 0;

  return (
    <div>
      <ThemeToggleButton 
            variant="circle" 
            start="top-left" 
            className="size-10 fixed top-5 right-5" // Optional: Adjust size
          />
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Blogs Card */}
        <Card className='dark:bg-[#171717] dark:border-[#1m1m1m]'>
          <CardHeader>
            <CardTitle className='dark:text-[#E5E7EB]'>TOTAL VIEWS</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-200">{blogCount}</span>
            <span className="text-sm text-gray-400">posts</span>
          </div>
        </CardContent>
        </Card>

        {/* Total Subscribers Card */}
        <Card className='dark:bg-[#171717] dark:border-[#1m1m1m]'>
          <CardHeader>
            <CardTitle className='dark:text-[#E5E7EB]'>SUBSCRIBERS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{subscriberCount}</span>
              <span className="text-sm text-gray-400">users</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Views Card */}
        <Card className='dark:bg-[#171717] dark:border-[#1m1m1m]'>
          <CardHeader>
            <CardTitle className='dark:text-[#E5E7EB]'>TOTAL VIEWS</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-extrabold text-green-600">
              {/* Format number (e.g., 1,200) */}
              {totalViews.toLocaleString()} 
            </span>
            <span className="text-sm text-gray-400">  reads</span>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}