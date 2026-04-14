'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { PAGE_SIZE } from '@/lib/api';
import { fetchCompanies } from '@/lib/actions';
import CompanyRow from '@/app/components/company-row';
import Pagination from '@/app/components/pagination';

export interface CompanyTableProps {
  page: number;
  query?: string;
}

const headers = [
  'Category',
  'Company',
  'Status',
  'Promotion',
  'Country',
  'Joined date',
  '',
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

export default function CompanyTable({ page, query }: CompanyTableProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ['companies', { page, limit: PAGE_SIZE, search: query }],
    queryFn: () => fetchCompanies({ page, limit: PAGE_SIZE, search: query }),
    staleTime: 10 * 1000,
  });

  const navigateTo = (newPage: number) => {
    const params = new URLSearchParams();
    params.set('page', String(newPage));
    if (query) {
      params.set('query', query);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

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
      <Pagination
        currentPage={page}
        totalPages={0} // MockAPI doesn't return total pages easily
        onPageChange={navigateTo}
      />
    </div>
  );
}
