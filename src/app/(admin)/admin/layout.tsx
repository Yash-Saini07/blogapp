import AdminSidebar from '@/components/AdminSidebar';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Double check session on server side for extra security
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-background">
      {/* 1. The Sidebar (Fixed width) */}
      <AdminSidebar />

      {/* 2. The Main Content Area */}
      {/* ml-64 pushes the content to the right so it's not hidden behind the sidebar */}
      <div className="flex-1 min-w-0 ml-0 md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto pt-16 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}