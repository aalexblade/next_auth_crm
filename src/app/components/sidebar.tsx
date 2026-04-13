'use client';

import React from 'react';
import Image from 'next/image';
import SidebarItem from '@/app/components/sidebar-item';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/lib/actions';

export interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const handleExitClick = async () => {
    await handleSignOut();
  };

  return (
    <aside className="fixed top-0 left-0 z-40 w-60 h-screen">
      <div className="flex flex-col h-full overflow-y-auto bg-gray-900">
        <Image
          className="py-8 mb-11 mx-auto"
          width={122}
          height={25}
          src="/icons/logo.svg"
          alt="logo"
          priority
        />
        <ul className="space-y-7">
          <SidebarItem
            current={pathname === '/dashboard'}
            pathname="/dashboard"
            src="/icons/squares.svg"
            alt="dashboard icon"
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            current={pathname === '/companies'}
            pathname="/companies"
            src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Companies
          </SidebarItem>
        </ul>

        <div className="mt-auto">
          {user && (
            <div className="p-6 border-t border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold overflow-hidden">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={40}
                      height={40}
                    />
                  ) : (
                    user.name?.[0] || 'U'
                  )}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-white truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>
          )}
          <button
            className="flex items-center gap-2 p-6 mx-auto w-full"
            onClick={handleExitClick}
            aria-label="Exit to home page"
          >
            <Image
              width={18}
              height={18}
              src="/icons/arrow-left-on-rectangle.svg"
              alt="exit icon"
            />
            <span className="font-medium text-white">Exit</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
