import connectDB from '@/lib/database';
import Subscriber from '@/models/subscriber';
import { deleteSubscriber } from '@/actions/deleteSubscriber';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/ui/skiper26';
export default async function SubscriptionsPage() {
  // 1. Connect and Fetch Data
  await connectDB();

  // Sort by newest first (-1)
  const subscribers = await Subscriber.find({}).sort({ createdAt: -1 });

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold mb-8">Subscribers</h1>
        <ThemeToggleButton variant='circle' start='top-left' />
      </div>
      <div className="bg-card rounded-lg shadow-md overflow-x-auto border">
        <table className="w-full dark:bg-black text-left border-border">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-700 dark:text-white dark:bg-zinc-900">Email</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-white dark:bg-zinc-900">Date Subscribed</th>
              <th className="p-4 font-semibold text-gray-700 dark:text-white dark:bg-zinc-900 text-right">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 border-b border-gray-200 dark:border-gray-700">
            {subscribers.map((sub) => (
              <tr key={sub._id} className="">

                {/* Email Column */}
                <td className="p-4 font-medium text-gray-900 dark:text-white">
                  {sub.email}
                </td>

                {/* Date Column (Formatted) */}
                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {new Date(sub.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>

                {/* Delete Button Column */}
                <td className="p-4 text-right">
                  <form action={deleteSubscriber}>
                    <input type="hidden" name="id" value={sub._id.toString()} />
                    <Button
                      variant="destructive"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </form>
                </td>

              </tr>
            ))}

            {/* Empty State */}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500 dark:text-gray-600">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}