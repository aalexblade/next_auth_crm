'use client';

import React, { useEffect } from 'react';

export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        <div
          role="alert"
          aria-labelledby="error-title"
          aria-describedby="error-desc"
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow-xl border border-gray-200 max-w-lg mx-4"
        >
          <div className="bg-red-50 text-red-700 p-4 rounded-full mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <h1 id="error-title" className="text-3xl font-bold text-gray-900 mb-2">
            Critical Error
          </h1>
          <p id="error-desc" className="text-gray-600 mb-8 text-center">
            A critical error has occurred and the application was unable to
            recover. Please try again or refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="py-2.5 px-6 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
