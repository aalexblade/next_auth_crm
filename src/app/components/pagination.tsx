'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  // onPageChange is kept for compatibility with the interface requested, but links are used for navigation
  onPageChange?: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 text-sm rounded bg-white shadow ${
          currentPage <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'
        }`}
      >
        ← Previous
      </Link>

      <span className="text-sm text-gray-600 font-medium">
        Page {currentPage}
        {totalPages > 0 && ` of ${totalPages}`}
      </span>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 text-sm rounded bg-white shadow ${
          currentPage >= totalPages && totalPages > 0
            ? 'pointer-events-none opacity-40'
            : 'hover:bg-gray-50'
        }`}
      >
        Next →
      </Link>
    </div>
  );
};

export default Pagination;
