import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompanies, PAGE_SIZE } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import dynamic from 'next/dynamic';

export interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const CompanyTable = dynamic(() => import('@/app/components/company-table'));

export default async function Page({ searchParams }: PageProps) {
  // 1. Розгортаємо параметри
  const params = await searchParams;

  const page = Number(params.page ?? '1');
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['companies', { page, limit: PAGE_SIZE }],
    queryFn: () =>
      getCompanies(
        { page: String(page), limit: String(PAGE_SIZE) },
        { cache: 'no-store' },
      ),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompanyTable page={page} />
    </HydrationBoundary>
  );
}
