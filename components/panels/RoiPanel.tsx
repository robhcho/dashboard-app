'use client'

import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DonutChart } from '../charts/DonutChart'


type RoiData = {
  Cost: number,
  Sales: number,
  Adj_Sales: number,
  Response: number,
  Adj_Response: number,
  Response_rate: number
}

export const RoiPanel: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [roi, setRoi] = useState<RoiData | null>(null)

  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD')
    const twelveMonthsAgo = dayjs().subtract(12, 'month').format('YYYY-MM-DD')

    const fetchData = async () => {
      try {
        const res = await fetch('/mock/roi.json')
        const data = await res.json()
        
        setRoi(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if(loading) return <div>Loading..</div>
  if(!roi) return <p>Failed to load ROI data</p>

  if(!roi) {
    return (
      <div className='text-center py-10'>
        <p className='text-lg font-bold text-blue-700'>There is currently no data available</p>
      </div>
    )
  }

  const avgTicket = roi.Response ? roi.Sales / roi.Response : 0

  const chartData = {
    labels: ['Total Spend', 'Incremental Sales'],
    datasets: [
      {
        data: [roi.Cost, roi.Adj_Sales],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(75, 192, 192, 0.8)'],
        borderWidth: 0
      }
    ]
  }

  const chartOptions = {
    cutout: '70%',
    plugins: {
      legend: { 
        position: 'bottom' as const,
        labels: {
          color: '#555',
          font: {
            size: 12
          }
        }
      }
    }
  }

  return (
    <div className='p-4 space-y-4'>
      <p className='text-sm text-center'>
        On completed promotions, a total spend of{' '}
        <span className='text-red-500 font-semibold'>${Math.round(roi.Cost).toLocaleString()}</span> yielded{' '}
        <span className='text-green-600 font-semibold'>${Math.round(roi.Sales).toLocaleString()}</span> in sales to
        responders (at a {(roi.Response_rate * 100).toFixed(2)}% response rate)
      </p>

      <div className='flex flex-col md:flex-row gap-6 justify-between items-center'>
        <div className='space-y-4 text-left'>
          <div>
            <h5 className='text-xs text-cyan-600'>AVERAGE TICKET</h5>
            <p className='font-bold text-gray-700'>${Math.round(avgTicket).toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-lime-700'>INCREMENTAL SALES</h5>
            <p className='font-bold text-gray-700'>${Math.round(roi.Adj_Sales).toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-pink-600'>INCREMENTAL RESPONSES</h5>
            <p className='font-bold text-gray-700'>${Math.round(roi.Adj_Response).toLocaleString()}</p>
          </div>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <DonutChart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}