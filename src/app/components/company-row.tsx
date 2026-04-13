'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import StatusLabel from '@/app/components/status-label';
import { Company } from '@/lib/api';
import { deleteCompany } from '@/lib/actions';

export interface CompanyRowProps {
  company: Company;
}

export default function CompanyRow({ company }: CompanyRowProps) {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${company.title}?`)) {
      const result = await deleteCompany(company.id);
      if (!result.success) {
        alert(`Error: ${result.error}`);
      }
    }
  };

  return (
    <tr className="h-14 text-center text-gray-900 bg-white group">
      <td className="text-xs font-medium text-blue-700 rounded-l border-l-4 border-blue-700">
        {company.categoryTitle}
      </td>
      <td>
        <Link href={`/companies/${company.id}`}>{company.title}</Link>
      </td>
      <td>
        <StatusLabel status={company.status} />
      </td>
      <td>
        <div className="inline-flex items-center gap-1">
          <Image
            width={16}
            height={16}
            src={`/icons/${company.hasPromotions ? 'check' : 'x-mark'}.svg`}
            alt="promotion icon"
          />
          <span
            className={clsx(
              'text-sm font-medium',
              company.hasPromotions ? 'text-green-700' : 'text-red-700',
            )}
          >
            {company.hasPromotions ? 'Yes' : 'No'}
          </span>
        </div>
      </td>
      <td>{company.countryTitle}</td>
      <td>{new Date(company.joinedDate).toLocaleDateString('uk-UA')}</td>
      <td className="rounded-r pr-4 text-right">
        <button
          type="button"
          onClick={handleDelete}
          className="p-2 hover:bg-red-50 rounded-full transition-colors opacity-80 hover:opacity-100"
          title="Delete company"
        >
          <Image
            width={20}
            height={20}
            src="/icons/x-mark.svg"
            alt="delete icon"
            className="grayscale hover:grayscale-0 transition-all"
          />
        </button>
      </td>
    </tr>
  );
}
