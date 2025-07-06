'use client'

import React from 'react'
import { Promo } from '@/app/hooks/usePromoData'
import Image from 'next/image'
import { BarChart } from '../charts/BarChart'

type PromoRoiDrawerProps = {
  promo: Promo
  onClose: () => void
}

export const PromoRoiDrawer: React.FC<PromoRoiDrawerProps> = ({ promo, onClose }) => {
  const { promo_name, promo_dates, roi, roi_by_market, creatives} = promo 

  const barChartData = {
    labels: roi_by_market.map((entry) => entry.market),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#69b1fa',
        data: roi_by_market.map((entry) => entry.sales)
      },
      {
        label: 'Total Sales',
        backgroundColor: '#4ce6b0',
        data: roi_by_market.map((entry) => entry.total_sales)
      },
    ]
  }

  const barOptions = {
    response: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    },
    scales: {
      x: {
        ticks: {font: {size: 12}}
      },
      y: {
        ticks: {
          callback: (value: string | number) => `$${value.toLocaleString()}`,
          font: {size: 12}
        }
      }
    }
  }

  return (
    <div className='text-sm text-gray-700 dark:text-gray-100'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>{promo_name}</h2>
        <p className='text-gray-500 dark:text-gray-400'>{promo_dates.start} - {promo_dates.end}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full border text-left text-sm'>
          <thead className='bg-gray-100 text-gray-600 dark:bg-zinc-400 dark:text-gray-100'>
            <tr>
              <th className='p-2'>Status</th>
              <th className='p-2'>Spend</th>
              <th className='p-2'>Mailed</th>
              <th className='p-2'>Responses</th>
              <th className='p-2'>Sales</th>
              <th className='p-2'>Total Sales</th>
              <th className='p-2'>Response Rate</th>
              <th className='p-2'>Average Ticket</th>
            </tr>
          </thead>
          <tbody>
            {roi.map((entry, idx) => {
              const responseRate = 
                entry.mailed > 0 ? (entry.responses / entry.mailed) * 100 : 0
              const avgTicket = 
                entry.responses > 0 ? entry.sales / entry.responses : 0
              
              return (
                <tr key={idx} className='border-t'>
                  <td className='p-2 capitalize font-medium'>{entry.status}</td>
                  <td className='p-2'>${entry.spend.toLocaleString()}</td>
                  <td className='p-2'>{entry.mailed.toLocaleString()}</td>
                  <td className='p-2'>{entry.responses.toLocaleString()}</td>
                  <td className='p-2'>${entry.sales.toLocaleString()}</td>
                  <td className='p-2'>${entry.total_sales.toLocaleString()}</td>
                  <td className='p-2'>{responseRate.toFixed(2)}%</td>
                  <td className='p-2'>${Math.floor(avgTicket).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className='flex justify-between mt-20 items-stretch'>
        <div className='w-1/2 p-4 flex flex-col'>
          <h3 className='font-semibold text-md mb-4'>
            SALES VS TOTAL SALES BY MARKET
          </h3>
          <div className='flex-grow h-[400px]'>
            <BarChart data={barChartData} options={barOptions} />
          </div>
        </div>

        <div className='w-1/2 flex flex-col'>
          <h3 className='font-semibold text-md m-4 mb-2'>CREATIVES</h3>
          <div className='gap-4'>
            {['front', 'back'].map((side) => (
              <div key={side} className='m-4'>
                {creatives?.[side as 'front' | 'back'] ? (
                  <Image 
                    src={creatives[side as 'front' | 'back']}
                    alt={`${side} creative`}
                    width={400}
                    height={400}
                    className='rounded border'
                  />
                ) : (
                  <div className='h-48 border flex items-center justify-center text-gray-400'>
                    No {side} image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}