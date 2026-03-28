'use client';

import React from 'react';
import Link from 'next/link';

export interface NotFoudProps {}

export default function Notfourd({}: NotFoudProps) {
  return (
    <div>
      <p>Could not found company</p>
      <Link href="/companies" className="text-blue-500">
        Back to companies
      </Link>
    </div>
  );
}
