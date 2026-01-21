'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Add Blog', path: '/admin/blogs/add' },
    { name: 'Blog List', path: '/admin/blogs' },
    { name: 'Subscriptions', path: '/admin/subscriptions' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-gray-900 text-white flex flex-col p-6 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo / Header */}
        <h2 className="text-2xl font-bold mb-10 text-center tracking-wider mt-12 md:mt-0">
          Admin Panel
        </h2>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)} // Close on mobile navigation
                className={`block px-4 py-3 rounded transition-colors ${isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button (At the bottom) */}
        <div className="pt-6 border-t border-gray-800">
          <Button
            onClick={() => signOut({ callbackUrl: '/' })}
            variant={'destructive'}
            className='w-full'
          >
            Log Out
          </Button>
        </div>
      </aside>
    </>
  );
}