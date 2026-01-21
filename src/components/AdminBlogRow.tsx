'use client'

import { useState } from 'react';
import Link from 'next/link';
import { deleteBlog } from '@/actions/blogActions';
import { Button } from './ui/button';
import { createPortal } from 'react-dom';

const truncateWords = (text: string, limit: number) => {
  if (!text) return "";
  const words = text.split(' ');
  return words.length <= limit ? text : words.slice(0, limit).join(' ') + '...';
};

export default function AdminBlogRow({ blog }: { blog: any }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    await deleteBlog(blog._id);
    setShowDeletePopup(false);
  }

  return (
    <>
      {/* ✅ TABLE ROW ONLY */}
      <tr className="border-b">
        <td className="p-4 font-medium text-foreground">
          {truncateWords(blog.title, 60)}
        </td>

        <td className="p-4 whitespace-nowrap text-muted-foreground">
          {new Date(blog.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </td>

        <td className="p-4 text-right space-x-4 whitespace-nowrap">
          <Link href={`/admin/blogs/${blog._id}`}>
            <Button variant="outline">Edit</Button>
          </Link>

          <Button
            variant="destructive"
            onClick={() => setShowDeletePopup(true)}
          >
            Delete
          </Button>
        </td>
      </tr>

      {/* ✅ MODAL VIA PORTAL (OUTSIDE TABLE) */}
      {showDeletePopup &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-lg bg-card p-6 shadow-xl border border-border">
              <h3 className="mb-2 text-lg font-bold text-foreground">
                Delete Blog?
              </h3>

              <p className="mb-6 text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <b>"{truncateWords(blog.title, 10)}"</b>? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="rounded px-4 py-2 text-muted-foreground hover:bg-muted"
                  disabled={isDeleting}
                >
                  Cancel
                </button>

                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
