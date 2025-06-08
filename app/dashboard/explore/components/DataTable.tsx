// components/DataTable.tsx
'use client';

import { Record } from '@/lib/wamsi-data';
import { useState } from 'react';

export default function DataTable({ records }: { records: Record[] }) {
  const [sortKey, setSortKey] = useState<keyof Record>('state');
  const [asc, setAsc] = useState(true);

  const sorted = [...records].sort((a, b) => {
    const aVal = a[sortKey] ?? '';
    const bVal = b[sortKey] ?? '';
    return asc
      ? aVal > bVal
        ? 1
        : -1
      : aVal < bVal
      ? 1
      : -1;
  });

  const toggleSort = (key: keyof Record) => {
    if (sortKey === key) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th
              className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer"
              onClick={() => toggleSort('state')}
            >
              State/UT {sortKey === 'state' && (asc ? '▲' : '▼')}
            </th>
            <th
              className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer"
              onClick={() => toggleSort('properties')}
            >
              Properties {sortKey === 'properties' && (asc ? '▲' : '▼')}
            </th>
            <th
              className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 cursor-pointer"
              onClick={() => toggleSort('area')}
            >
              Area (Acres) {sortKey === 'area' && (asc ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <td className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                {row.state}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                {row.properties.toLocaleString()}
              </td>
              <td className="p-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                {row.area.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
