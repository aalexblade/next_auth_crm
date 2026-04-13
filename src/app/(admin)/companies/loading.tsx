import React from 'react';

const headers = [
  'Category',
  'Company',
  'Status',
  'Promotion',
  'Country',
  'Joined date',
  '',
];

export default function Loading() {
  return (
    <div className="py-8 px-10 bg-gray-100">
      <table className="table-auto w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="pb-5 text-sm font-light text-gray-900 text-left px-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="bg-white rounded-lg shadow-sm">
              {Array.from({ length: 7 }).map((_, j) => (
                <td key={j} className="px-4 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
