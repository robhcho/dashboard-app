'use client'

import React from 'react'
import { useRetentionData } from '@/app/hooks/useRetentionData'
import { LineChart } from '../charts/LineChart'
import { useAppSelector } from '@/lib/hooks'

export const RetentionPanel = () => {
  const {data: retentionData} = useRetentionData()
  const darkMode = useAppSelector(state => state.theme.darkMode)

  if(!retentionData?.length) return null
  const labels = retentionData.map(d => d.yearmo)

  const newCustYOY = retentionData.map(d =>
    d.customers_new_ly > 0
      ? +(((d.customers_new / d.customers_new_ly) - 1) * 100).toFixed(2)
      : null
  )

  const retCustYOY = retentionData.map(d =>
    d.customers_ret_ly > 0
      ? +(((d.customers_ret / d.customers_ret_ly) - 1) * 100).toFixed(2)
      : null
  )

  const chartData = {
    labels,
    datasets: [
      {
        label: 'New Customers YOY %',
        data: newCustYOY,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3
      },
      {
        label: 'Returning Customers YOY %',
        data: retCustYOY,
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        tension: 0.3
      },
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
          color: darkMode ? '#fff' : ''
        }
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y?.toFixed(2)}%`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#fff' : ''
        },
        grid: {
          color: darkMode ? '#fff' : ''
        }
      },
      y: {
        ticks: {
          color: darkMode ? '#fff' : '',
          callback: function (this: any, tickValue: string | number) {
            if(typeof tickValue === 'number') {
              return `${tickValue}%`
            }
            return tickValue
          } 
        },
        grid: {
          color: darkMode ? '#fff' : ''
        }
      }
    }
  }

  const averageTicketNew = Math.round(
    retentionData.reduce((acc, d) => acc + d.avg_ticket_new, 0) / retentionData.length    
  )

  const averageTicketRet = Math.round(
    retentionData.reduce((acc, d) => acc + d.avg_ticket_ret, 0) / retentionData.length
  )
  
  return (
    <div className='p-4'>
      <div className='text-center mb-3 dark:text-white'>
        <h2 className='text-md font-bold'>Customer Retention</h2>
      </div>
      <div className='h-[200px]'>
        <LineChart data={chartData} options={options} />
      </div>

      <div className='flex justify-around text-center mt-3'>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-200'>Avg Ticket (New)</p>
          <p className='text-lg font-semibold text-blue-500 dark:text-blue-300'>${averageTicketNew.toLocaleString()}</p>
        </div>
        <div>
          <p className='text-sm text-gray-500 dark:text-gray-200'>Avg Ticket (Ret)</p>
          <p className='text-lg font-semibold text-red-500 dark:text-red-300'>${averageTicketRet.toLocaleString()}</p>
        </div>        
      </div>
    </div>
  )
}