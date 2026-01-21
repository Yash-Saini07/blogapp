
'use client';

import { useState } from 'react';
import NewsletterModal from './NewsletterModal';
import { ThemeToggleButton } from './ui/skiper26';
import { Button } from './ui/button';
// You might need to import your existing Header or Navbar here if you want to wrap it directly
// Or simply pass the state down if you restructure.
import Link from 'next/link';

export default function HomeHeaderWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* The Floating Header Section */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-full max-w-3xl rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/60 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/5 dark:shadow-white/5 px-4 py-2.5 sm:px-6 sm:py-3 flex justify-between items-center transition-all hover:scale-[1.01] hover:shadow-xl hover:bg-white/80 dark:hover:bg-black/70">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
            <div className="size-8 rounded-full bg-linear-to-tr from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
              B
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 hidden sm:block">
              BlogApp
            </span>
          </Link>

          <div className='flex items-center gap-2 sm:gap-3'>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-md transition-transform active:scale-95 h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm"
            >
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Get Started</span>
            </Button>

            <div className="w-px h-5 sm:h-6 bg-zinc-200 dark:bg-zinc-800 mx-0.5 sm:mx-1" /> {/* Divider */}

            <ThemeToggleButton
              variant="circle"
              start="top-left"
              className="size-8 sm:size-9 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            />
          </div>
        </div>
      </div>

      {/* The Popup Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}