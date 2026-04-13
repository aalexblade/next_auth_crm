import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getCompanies, PAGE_SIZE } from '@/lib/api';
import getQueryClient from '@/lib/utils/getQueryClient';
import dynamic from 'next/dynamic';
import * as yup from 'yup';

const schema = yup.object({
  page: yup.number().integer().min(1).default(1),
  query: yup.string().max(50).default(''),
});

export interface PageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

const CompanyTable = dynamic(() => import('@/app/components/company-table'));

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  let validated;
  try {
    validated = await schema.validate({
      page: params.page ? Number(params.page) : undefined,
      query: params.query,
    });
  } catch (error) {
    validated = { page: 1, query: '' };
  }

  const { page, query } = validated;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['companies', { page, limit: PAGE_SIZE, search: query }],
    queryFn: () =>
      getCompanies(
        { page, limit: PAGE_SIZE, search: query },
        { cache: 'no-store' },
      ),
    staleTime: 10 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CompanyTable page={page} query={query} />
    </HydrationBoundary>
  );
}
