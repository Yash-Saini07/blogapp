
import React from 'react';
import mongoose from 'mongoose';
import dbConnect from '@/lib/database';
import Blog from '@/models/blog';
import Image from 'next/image';
import Link from 'next/link';
import { getShikiHighlighter } from '@/lib/shiki';
import CldImageWrapper from '@/components/CldImageWrapper';

// Markdown Imports
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSanitize from 'rehype-sanitize'; // Security package

import ViewTracker from '@/components/ViewTracker';
import ScrollProgress from '@/components/ScrollProgress'; // Import the new component
import HomeHeaderWrapper from '@/components/HomeHeaderWrapper';
import { Button } from '@/components/ui/button';

// Next.js config
export const dynamic = 'force-dynamic';

/* ------------------ Utils ------------------ */

// Calculate read time
function calculateReadingTime(content?: string) {
    if (!content) return 1;
    // Strip HTML tags and markdown symbols for accurate count
    const cleanText = content.replace(/<[^>]*>/g, ' ').replace(/[#_*`>\-]+/g, ' ');
    const words = cleanText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

// Extract headings for Table of Contents
function extractHeadings(markdown: string) {
    // Matches ## Heading or ### Heading
    const regex = /^(##|###)\s+(.*)$/gm;
    const headings: { level: number; text: string; id: string }[] = [];

    let match;
    while ((match = regex.exec(markdown)) !== null) {
        const text = match[2];
        // Create a slug that matches rehype-slug default behavior (lowercase, remove special chars)
        const id = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        headings.push({
            level: match[1] === '##' ? 2 : 3,
            text,
            id,
        });
    }
    return headings;
}

/* ------------------ Types ------------------ */
// Helper interface for the Markdown code block
interface CodeProps {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}

/* ------------------ Page Component ------------------ */
export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    await dbConnect();
    const { id } = await params;

    // 1. Validate ID Format
    if (!mongoose.isValidObjectId(id)) {
        return <div className="p-6 text-center">Invalid Blog ID</div>;
    }

    // 2. Fetch Data
    const blogData = await Blog.findById(id).lean();

    if (!blogData) {
        return <div className="p-6 text-center">Blog post not found</div>;
    }

    // 3. Serialization (Fixes Next.js warnings about passing Objects)
    const blog = {
        ...blogData,
        _id: blogData._id.toString(),
        createdAt: blogData.createdAt ? new Date(blogData.createdAt).toISOString() : new Date().toISOString(),
        // Ensure description/body are strings to prevent hydration errors
        description: blogData.description || '',
        body: blogData.body || ''
    };

    const readingTime = calculateReadingTime(blog.body);
    const toc = extractHeadings(blog.body);
    const highlighter = await getShikiHighlighter();


    return (
        <>
            {/* 4. Client Component for Scroll Progress (Solves Hydration Error) */}
            <ScrollProgress />

            <HomeHeaderWrapper />

            <article className="relative max-w-6xl mx-auto px-4 pt-32 pb-12 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

                {/* View Tracker */}
                <ViewTracker blogId={blog._id} />

                {/* ================= MAIN CONTENT ================= */}
                <div className="space-y-8 min-w-0">
                    {/* Top Bar */}
                    <div className="flex justify-between text-sm text-gray-500">
                        <Link href="/"><Button variant="default">← Home</Button></Link>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight wrap-break-words">
                        {blog.title}
                    </h1>

                    {/* Meta Data */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="px-3 py-1 rounded-full bg-amber-600 text-white">
                            {blog.type || 'Article'}
                        </span>
                        <span>⏱ {readingTime} min read</span>
                        <span>👁 {blog.views || 0} views</span>
                    </div>

                    {/* Cover Image */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-gray-100">
                        <CldImageWrapper
                            src={blog.image || 'https://placehold.co/1200x675/png'}
                            alt={blog.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>

                    {/* Description Quote */}
                    {blog.description && (
                        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-lg text-gray-700 dark:text-gray-300">
                            {blog.description}
                        </blockquote>
                    )}

                    {/* Markdown Body */}
                    <div className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:scroll-mt-28
                        prose-h2:border-b prose-h2:pb-2
                        prose-p:leading-8
                        prose-ul:pl-6
                        prose-ol:pl-6
                        break-words"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[
                                rehypeSanitize, // Sanitize first to allow subsequent plugins to add safe attributes (like IDs)
                                rehypeSlug,
                                [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                            ]}
                            components={{
                                code: ({ className, children }: CodeProps) => {
                                    const isInline = !className;

                                    // Inline code → simple styling
                                    if (isInline) {
                                        return (
                                            <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-sm font-mono">
                                                {children}
                                            </code>
                                        );
                                    }

                                    // Block code → Shiki
                                    const language = className.replace('language-', '') || 'ts';

                                    const html = highlighter.codeToHtml(
                                        String(children).trim(),
                                        {
                                            lang: language,
                                            theme: 'github-dark'
                                        }
                                    );

                                    return (
                                        <div
                                            className="not-prose my-6 w-full rounded-lg overflow-hidden [&_pre]:m-0! [&_pre]:p-6! [&_pre]:w-full! [&_pre]:bg-[#1E2939]! [&_pre]:rounded-lg! [&_pre]:overflow-x-auto [&_code]:text-base! [&_code]:font-mono!"
                                            dangerouslySetInnerHTML={{ __html: html }}
                                        />
                                    );
                                },
                            }}

                        >
                            {blog.body}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* ================= TOC SIDEBAR ================= */}
                {toc.length > 0 && (
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-10rem)] overflow-y-auto">
                            <div className="border rounded-lg p-4 text-sm bg-white dark:bg-gray-950 shadow-sm">
                                <h4 className="font-semibold mb-3 text-lg">On this page</h4>
                                <ul className="space-y-2">
                                    {toc.map((item, index) => (
                                        <li
                                            key={`${item.id}-${index}`}
                                            className={item.level === 3 ? 'ml-4' : ''}
                                        >
                                            <a
                                                href={`#${item.id}`}
                                                className="block text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200 truncate"
                                                title={item.text}
                                            >
                                                {item.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>
                )}
            </article>
        </>
    );
}