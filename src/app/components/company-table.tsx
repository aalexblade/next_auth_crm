'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { getCompanies, PAGE_SIZE } from '@/lib/api';
import CompanyRow from '@/app/components/company-row';

export interface CompanyTableProps {
  page: number;
}

const headers = [
  'Category',
  'Company',
  'Status',
  'Promotion',
  'Country',
  'Joined date',
];

function CompanyTableSkeleton() {
  return (
    <div className="py-8 px-10 bg-gray-100">
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 text-sm font-light text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="bg-white rounded-lg shadow-sm">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CompanyTable({ page }: CompanyTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ['companies', { page, limit: PAGE_SIZE }],
    queryFn: () =>
      getCompanies({ page: String(page), limit: String(PAGE_SIZE) }),
    staleTime: 10 * 1000,
  });

  const navigateTo = (newPage: number) => {
    router.push(`${pathname}?page=${newPage}`);
  };

  const hasPrev = page > 1;
  // Disable "Next" when the current page returned fewer items than PAGE_SIZE
  const hasNext = (data?.length ?? 0) >= PAGE_SIZE;

  if (isLoading) {
    return <CompanyTableSkeleton />;
  }

  return (
    <div className="py-8 px-10 bg-gray-100">
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 text-sm font-light text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((company) => (
            <CompanyRow key={company.id} company={company} />
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => navigateTo(page - 1)}
          disabled={!hasPrev}
          className="px-4 py-2 text-sm rounded bg-white shadow disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-600 font-medium">Page {page}</span>

        <button
          onClick={() => navigateTo(page + 1)}
          disabled={!hasNext}
          className="px-4 py-2 text-sm rounded bg-white shadow disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}