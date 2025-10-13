"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center space-y-4 p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600">
            Something went wrong!
          </h2>
          <p className="text-gray-600">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-400">Error ID: {error.digest}</p>
          )}
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
