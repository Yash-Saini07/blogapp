
import React, { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

interface BlogCardProps {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  /**
   * Category / type label for the blog.
   * Can be null / undefined / malformed depending on API source.
   */
  type?: unknown;
  /**
   * FULL blog content (markdown / HTML-stripped text recommended).
   * Used ONLY for reading-time calculation.
   */
  content?: unknown;
}

/**
 * Normalize a possibly-nullish, unknown `type` value into a safe lowercase string.
 * This function MUST NEVER throw.
 */
function normalizeType(type: unknown): string {
  try {
    if (type == null) return ""; // null or undefined
    if (typeof type !== "string") return "";

    return type
      .replace(/[_-]+/g, " ")
      .trim()
      .toLowerCase();
  } catch {
    return "";
  }
}

function tagStyles(type: unknown): string {
  const normalized = normalizeType(type);

  switch (normalized) {
    case "tutorial":
      return "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "case study":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "opinion":
      return "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    default:
      return "bg-white/90 text-black dark:bg-white/6 dark:text-gray-200";
  }
}

/**
 * Estimate reading time from FULL blog content.
 * - Strips basic markdown / HTML noise
 * - Uses 200 WPM baseline
 * - Always returns at least 1 minute
 */
function calculateReadingTime(content: unknown): number {
  try {
    if (typeof content !== "string") return 1;

    const cleaned = content
      .replace(/<[^>]*>/g, " ") // strip HTML
      .replace(/[#_*`>\-]+/g, " ") // strip markdown tokens
      .trim();

    if (!cleaned) return 1;

    const words = cleaned.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  } catch {
    return 1;
  }
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title = "Untitled",
  description = "No description available.",
  image,
  type,
  content,
}) => {
  const titleId = `blog-title-${useId()}`;
  const [imgLoaded, setImgLoaded] = useState(false);

  // Reading time MUST come from full blog content
  const readingTime = useMemo(() => calculateReadingTime(content), [content]);

  const displayImage =
    typeof image === "string" && image.length > 10
      ? image
      : "https://placehold.co/600x400/png";

  const safeTypeLabel =
    typeof type === "string" && type.trim().length > 0 ? type : "Article";

  return (
    <Link
      href={`/blogs/${id}`}
      aria-labelledby={titleId}
      className="group block h-full"
      prefetch={false}
    >
      <article
        role="article"
        aria-labelledby={titleId}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950"
      >
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-linear-to-r from-gray-100 to-gray-200 animate-pulse dark:from-gray-800 dark:to-gray-700" />
          )}

          <CldImage
            src={displayImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            onLoadingComplete={() => setImgLoaded(true)}
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* Badge */}
          <div className="absolute left-3 top-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm backdrop-blur-sm ${tagStyles(type)}`}
            >
              {safeTypeLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <h2
            id={titleId}
            className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400"
          >
            {title}
          </h2>

          <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-3 dark:text-gray-400">
            {description}
          </p>

          <div className="mt-auto flex items-center justify-between gap-2 text-sm font-medium text-gray-900 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
              </svg>
              <span>{readingTime} min read</span>
            </div>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <span className="sr-only">Read article</span>
              <span>Read Article</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default React.memo(BlogCard);

/*
Sanity test cases (must never crash):

calculateReadingTime(null) === 1
calculateReadingTime("") === 1
calculateReadingTime("200 words") === 1
calculateReadingTime("400 words") === 2
calculateReadingTime("<p>Hello **world**</p>") === 1

normalizeType(null) === ""
normalizeType("CASE_STUDY") === "case study"

BlogCard renders with:
- missing content
- markdown content
- HTML content
*/