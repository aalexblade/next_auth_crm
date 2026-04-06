'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import CompanyFormModal for better performance
const CompanyFormModal = dynamic(
  () => import('@/app/components/company-form-modal'),
  { ssr: false },
);

export interface PageProps {}

export default function Page({}: PageProps) {
  const router = useRouter();
  return <CompanyFormModal show={true} onClose={() => router.back()} />;
}
