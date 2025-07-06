'use client'

import React from 'react'

type Column = {
  key: string
  label: string
  align?: 'left' | 'right' | 'center'
}

type Row = {
  [key: string]: string | number
}

type RoiTableProps = {
  title?: string
  columns: Column[]
  rows: Row[]
}

export const RoiTable: React.FC<RoiTableProps> = ({title, columns, rows}) => {
  return (
    <div className='w-full overflow-x-auto shadow rounded-lg border border-gray-200 mt-10'>
      {title && (
        <div className='px-4 py-2 bg-gray-100 dark:bg-zinc-500 border-b text-sm font-semibold text-gray-700 dark:text-white'>
          {title}
        </div>  
      )}
      <table className='w-full table-auto text-sm text-left'>
        <thead className='bg-gray-50 border-b'>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-2 font-semibold text-gray-600 dark:bg-zinc-500 dark:text-white ${
                  col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                  ? 'text-center'
                  : 'text-left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='px-4 py-4 text-center text-gray-500'>
                No data available.
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                className={i%2 === 0 ? 'bg-white dark:bg-zinc-500 border-b': 'bg-gray-50 dark:bg-zinc-500'}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 ${
                      col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                    }`}
                  >
                    {typeof row[col.key] === 'number'
                      ? (row[col.key] as number).toLocaleString()
                      : row[col.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) 
}