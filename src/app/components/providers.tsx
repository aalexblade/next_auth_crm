'use client';

import React, { useMemo } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// Dynamically import ReactQueryDevtools for better performance
const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((mod) => ({
      default: mod.ReactQueryDevtools,
    })),
  { ssr: false },
);

export default function Providers({ children }: React.PropsWithChildren) {
  const client = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
