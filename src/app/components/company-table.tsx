'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCompanies } from '@/lib/api';
import CompanyRow from '@/app/components/company-row';

export interface CompanyTableProps {}

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

export default function CompanyTable({}: CompanyTableProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies(),
    staleTime: 10 * 1000,
  });

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
    </div>
  );
}
