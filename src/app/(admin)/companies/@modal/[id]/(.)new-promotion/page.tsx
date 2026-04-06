'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import PromotionFormModal for better performance
const PromotionFormModal = dynamic(
  () => import('@/app/components/promotion-form-modal'),
  { ssr: false },
);

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();
  return (
    <PromotionFormModal
      companyId={params.id}
      show={true}
      onClose={() => router.back()}
    />
  );
}
