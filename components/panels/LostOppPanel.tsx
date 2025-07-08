'use client'

import React from 'react'
import { useLostOppData } from '@/app/hooks/useLostOppData'
import { BarChart } from '../charts/BarChart'

export const LostOppPanel = () => {
  const {lostopps, loading, error} = useLostOppData()
  
  if(loading) return <div className='text-center'>Loading...</div>
  if(error) return <div className='text-center text-red-500 py-6'>Error: {error}</div>
  if(!lostopps) return <div className='text-center'>No data available</div>
  
  const deciles = Array.from({ length: 10}, (_, i) => i * 10)

  const series = deciles.map((start) => {
    const decileRange = `${start} - ${start + 10}`
    return {
      label: `Decile ${start + 10}`,
      data: lostopps.map((entry) => {
        const match = entry.Data.find((d) => d.DecileRange === decileRange)
        return match?.LostOpp || 0
      }),
      backgroundColor: getColorForDecile(start),
      stack: 'lostOpp'
    }
  })

  const chartData = {
    labels: lostopps?.map((d) => d.Month),
    datasets: series
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const, 
        labels: {boxWidth: 20}
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `$${ctx.parsed.y.toLocaleString()}`,
        }
      }
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: (tickValue: string | number): string => {
            const val = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue)
            if (isNaN(val)) return '$0K'
            return `$${(val / 1000).toFixed(0)}K`
          }
        }
      }
    }
  }
  
  return (
    <div className='p-4'>
      <div className='text-center'>        
        <p className='text-sm'>
          The total lost opportunity over the last calendar year is{' '}
          <span className='text-red-500 font-semibold'>
            $
            {lostopps.reduce((sum, entry) => {
              return Math.floor(sum + entry.Data.reduce((acc, d) => acc + d.LostOpp * d.CPP * d.ROI, 0))
            }, 0)
            .toLocaleString()}
          </span>
        </p>
      </div>

      <div className='mt-4 h-[250px]'>
        <BarChart data={chartData} options={options} />
      </div>
    </div>
  )
}

const getColorForDecile = (idx: number): string => {
  const colors = [
    '#0084f5',
    '#43abfa',
    '#7cc3fa',
    '#aad6f9',
    '#fccfeb',
    '#fab5df',
    '#f9a3d6',
    '#7cfee0',
    '#5beeca',
    '#00cc9e',
  ]
  return colors[idx / 10] ?? colors[idx/10 % colors.length]
}