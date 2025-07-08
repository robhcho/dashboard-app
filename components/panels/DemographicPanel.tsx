'use client'
import React from 'react'
import { useDemoData } from '@/app/hooks/usedemoData'
import { BarChart } from '../charts/BarChart'
import { DemoRecord } from '@/app/hooks/usedemoData'
import { useAppSelector } from '@/lib/hooks'

export const DemographicPanel = () => {
  const {data: demoData} = useDemoData()
  const darkMode = useAppSelector(state => state.theme.darkMode)
  if(!demoData?.length) return null
    
  const total = (key: keyof DemoRecord) => demoData[0].Data.reduce((sum, d) => sum + (d[key] as number || 0), 0)
  const labels = demoData[0].Data.map((d) => d.metric)
  
  const chartData = {
    labels,
    datasets: [
      {
        label: '% of Customers(Current)',
        data: demoData[0].Data.map((d) => (d.customers / total('customers')) * 100),
        backgroundColor: '#00c9db'
      },
      {
        label: '% of Customers Baseline',
        data: demoData[0].Data.map((d) => (d.customers_baseline / total('customers_baseline')) * 100),
        backgroundColor: '#ff2b34'
      }
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
          label: (ctx: any) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%`
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
          callback: function (tickValue: number | string) {
            return typeof tickValue === 'number' ? `${tickValue}%` : tickValue
          }
        },
        grid: {
          color: darkMode ? '#fff' : ''
        },
        beginAtZero: true,
        max: 25
      }
    }
  }

  return (
    <div className='p-4'>
      <div className='h-[300px]'>
        <BarChart data={chartData} options={options} />
      </div> 
    </div>
  )
}