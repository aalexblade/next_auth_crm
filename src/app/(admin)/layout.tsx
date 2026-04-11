import React from 'react';
import Sidebar from '@/app/components/sidebar';
import { auth } from '@auth';

export interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();

  return (
    <>
      <Sidebar user={session?.user} />
      <div className="ml-60">{children}</div>
    </>
  );
}
