'use client';

import React, { useCallback, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearchClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Simple implementation of useDebouncedCallback since use-debounce is not installed
function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

export default function SearchInput({
  onSearchClick,
  ...rest
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-96">
      <input
        {...rest}
        type="text"
        className="text-sm flex-1 py-3 pl-3 pr-11 w-full h-11 rounded border border-gray-300 bg-gray-50"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button
        type="button"
        className="absolute top-0	right-0 p-3"
        onClick={onSearchClick}
      >
        <Image
          width={20}
          height={20}
          src="/icons/magnifying-glass.svg"
          alt="search icon"
        />
      </button>
    </div>
  );
}
