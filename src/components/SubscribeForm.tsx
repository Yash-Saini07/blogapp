'use client' // Client component because we need interactivity (loading/success states)

import { useState } from 'react';
import { subscribeUser } from '@/actions/subscribe'; // Import the server action

export default function SubscribeForm() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: any) {
    event.preventDefault(); // Stop page refresh
    const formData = new FormData(event.target);

    // Call the server action directly
    const result = await subscribeUser(formData);

    setMessage(result.message);
    setIsError(!result.success);

    if (result.success) {
      event.target.reset(); // Clear the input field
    }
  }

  return (

    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
        <div className="relative group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500 text-zinc-800 dark:text-zinc-200 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3.5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold tracking-wide hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-md hover:shadow-lg disabled:opacity-70"
        >
          Subscribe
        </button>
      </form>

      {/* Show Success/Error Message */}
      {message && (
        <div className={`mt-4 p-3 rounded-xl text-sm font-medium text-center animate-in fade-in slide-in-from-top-2 ${isError ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300' : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300'}`}>
          {message}
        </div>
      )}
    </div>
  );
}