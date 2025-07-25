'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { DonutChart } from '../charts/DonutChart'
import { useRoiData } from '@/app/hooks/useRoiData'
import { useAppSelector } from '@/lib/hooks'

export const RoiPanel: React.FC = () => {  
  const { data: roi, loading, error } = useRoiData()
  const darkMode = useAppSelector(state => state.theme.darkMode)
  
  const avgTicket = roi?.total_data.Response ? roi.total_data.Sales / roi.total_data.Response : 0
  
  const chartData = useMemo(() => ({
    labels: ['Total Spend', 'Incremental Sales'],
    datasets: [
      {
        data: [
          roi?.total_data.Cost !== undefined ? roi.total_data.Cost : 0,
          roi?.total_data.Adj_Sales !== undefined ? roi.total_data.Adj_Sales : 0
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        borderWidth: 0
      }
    ]
  }), [roi])

  const chartOptions = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const,
        labels: {
          color: darkMode ? '#fff' : '#555',
          font: {
            size: 12
          }
        }
      }
    }
  }

  if(loading) return <div>Loading..</div>
  if(!roi) {
    return (
      <div className='text-center py-10'>
        <p className='text-lg font-bold text-blue-700'>There is currently no data available</p>
      </div>
    )
  }

  return (
    <div className='p-4 space-y-4'>
      <p className='text-sm text-center sm:text-base leading-relaxed mb-6 dark:text-white'>
        On completed promotions, a total spend of{' '}
        <span className='text-red-500 font-semibold'>${Math.round(roi.total_data.Cost).toLocaleString()}</span> yielded{' '}
        <span className='text-green-600 dark:text-green-400 font-semibold'>${Math.round(roi.total_data.Sales).toLocaleString()}</span> in sales to
        responders (at a {(roi.total_data.Response_rate * 100).toFixed(2)}% response rate)
      </p>

      <div className='flex flex-row gap-6 justify-between items-center'>
        <div className='flex flex-col w-full lg:w-1/2 space-y-4 text-left'>
          <div>
            <h5 className='text-xs text-cyan-600 dark:text-cyan-300'>AVERAGE TICKET</h5>
            <p className='font-bold text-gray-700 dark:text-white'>${Math.round(avgTicket).toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-lime-700 dark:text-lime-400'>INCREMENTAL SALES</h5>
            <p className='font-bold text-gray-700 dark:text-white'>${Math.round(roi.total_data.Adj_Sales).toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-pink-600'>INCREMENTAL RESPONSES</h5>
            <p className='font-bold text-gray-700 dark:text-white'>${Math.round(roi.total_data.Adj_Response).toLocaleString()}</p>
          </div>
        </div>

        <div className='w-full lg:w-1/2 max-w-[500px] mx-auto'>
          <DonutChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}