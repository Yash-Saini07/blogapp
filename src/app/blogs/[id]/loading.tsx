export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Top bar */}
      <div className="flex justify-between">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Title */}
      <div className="space-y-3">
        <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 rounded-xl" />

      {/* Meta */}
      <div className="flex justify-between">
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Description */}
      <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />

      {/* Body */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-11/12 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-10/12 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-9/12 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
