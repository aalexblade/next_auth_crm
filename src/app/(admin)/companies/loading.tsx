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
    <div className="py-8 px-10 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="pb-5 text-sm font-light text-gray-900 text-center px-4"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <tr key={i} className="h-14 bg-white rounded-lg shadow-sm">
                <td className="px-4 rounded-l border-l-4 border-gray-200">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mx-auto" />
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mx-auto" />
                </td>
                <td className="px-4">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24 mx-auto" />
                </td>
                <td className="px-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-8" />
                  </div>
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mx-auto" />
                </td>
                <td className="px-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mx-auto" />
                </td>
                <td className="px-4 rounded-r text-right">
                  <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
