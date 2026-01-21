'use client'

import { useEffect } from 'react';
import {incrementView} from '@/actions/incrementView';

export default function ViewTracker({ blogId }: { blogId: string }) {
  useEffect(() => {
    // 1. Check if we already viewed this blog
    const viewedKey = `viewed_blog_${blogId}`;
    const hasViewed = localStorage.getItem(viewedKey);

    if (!hasViewed) {
      // 2. If NOT viewed, call the server action
      incrementView(blogId);

      // 3. Mark as viewed in LocalStorage (so it doesn't run again)
      localStorage.setItem(viewedKey, 'true');
    }
  }, [blogId]);

  return null; // This component is invisible
}