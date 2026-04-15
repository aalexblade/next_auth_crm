'use client';

import React from 'react';
import Button from '@/app/components/button';

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mt-10 mx-10">
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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        {error.message || 'An unexpected error occurred while fetching the companies data. Please try again or contact support if the problem persists.'}
      </p>
      <Button onClick={() => reset()} className="min-w-[120px]">
        Try again
      </Button>
    </div>
  );
}
