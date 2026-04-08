import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompanies } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import dynamic from 'next/dynamic';

// @coderabbitai: Please implement client-side or server-side pagination for this table.
// 1. Add 'limit' and 'page' state management.
// 2. Create a pagination UI (Previous/Next/Page numbers).
// 3. Ensure it works with our Next.js App Router structure.

// Dynamically import CompanyTable for better performance
const CompanyTable = dynamic(() => import('@/app/components/company-table'));

export interface PageProps {}

export default async function Page({}: PageProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies({ cache: 'no-store' }),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompanyTable />
    </HydrationBoundary>
  );
}
