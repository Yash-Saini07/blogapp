'use client';

import SubscribeForm from './SubscribeForm'; // Assuming this is your existing form

export default function NewsletterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Content - Liquid Retina / Premium Glass Effect */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-black/60 backdrop-blur-3xl backdrop-saturate-150 shadow-2xl animate-in zoom-in-95 duration-300">

        {/* Subtle inner glow/gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-50" />

        {/* Close "X" Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-zinc-500/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        {/* Content Container */}
        <div className="relative px-8 pt-10 pb-8 flex flex-col items-center">
          <div className="mb-6 p-4 rounded-full bg-linear-to-tr from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-inner">
            {/* Simple icon placeholder or use Lucide if available. Using SVG for zero-dependency right now */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
          </div>

          <h3 className="text-2xl font-bold text-center text-zinc-900 dark:text-white tracking-tight mb-2">
            Join the Community
          </h3>
          <p className="text-center text-zinc-600 dark:text-zinc-300 mb-8 max-w-[80%] leading-relaxed">
            Get the latest trends and tutorials delivered strictly to your inbox.
          </p>

          <div className="w-full">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </div>
  );
}