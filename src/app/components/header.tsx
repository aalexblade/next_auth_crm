import React from 'react';
import Image from 'next/image';
import { auth } from '@auth';

export interface HeaderProps {
  children: React.ReactNode;
}

export default async function Header({ children }: HeaderProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-gray-300">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        {children}
      </h1>
      <div className="w-px self-stretch bg-gray-300" />
      <div className="flex gap-3">
        {user?.image ? (
          <Image
            width={44}
            height={44}
            src={user.image}
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold overflow-hidden">
            {user?.name?.[0] || 'U'}
          </div>
        )}
        <div>
          <p className="text-base font-semibold text-gray-900">
            {user?.name || 'User'}
          </p>
          <p className="text-sm font-light text-gray-900">
            {user?.email || 'user@example.com'}
          </p>
        </div>
      </div>
    </header>
  );
}
