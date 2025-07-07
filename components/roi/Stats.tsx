'use client'

import React, {useMemo} from 'react'
import { IoMailOutline } from 'react-icons/io5'
import { MdCreditCard, MdReplyAll, MdReply } from 'react-icons/md'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { GiReceiveMoney } from 'react-icons/gi'
import { BiSolidDollarCircle } from 'react-icons/bi'
import { BsBarChartFill } from 'react-icons/bs'

interface DailyStat {
  date: string
  Cost: number
  Sales: number
  Adj_Sales: number
  Response: number
  Adj_Response: number
  Mailed: number
}

type Props = {
  data: DailyStat[]
  dateRange: [Date, Date]
}

export const Stats: React.FC<Props> = ({data, dateRange}) => {  

  const totals = useMemo(() => {
    return data.reduce(
      (acc, curr) => {
        const entryDate = new Date(curr.date)
        if(entryDate < dateRange[0] || entryDate > dateRange[1]) return acc

        acc.cost += curr.Cost
        acc.sales += curr.Sales
        acc.adjSales += curr.Adj_Sales
        acc.responses += curr.Response
        acc.adjResponses += curr.Adj_Response
        acc.mailed += curr.Mailed
        return acc
      },
      {cost: 0, sales: 0, adjSales: 0, responses: 0, adjResponses: 0, mailed: 0}
    )
  }, [data, dateRange])

  const stats = [
    {
      icon: <MdCreditCard className='text-red-600 dark:text-red-400 text-2xl'/>,
      label: 'Spend',
      value: `$${totals.cost.toLocaleString()}`,
      color: 'border-red-600 dark:border-red-400',
      info: 'Total cost of mailing',
      id: 'spend-info',
    },
    {
      icon: <MdReplyAll className='text-blue-600 dark:text-blue-400 text-2xl'/>,
      label: 'Responses',
      value: totals.responses.toLocaleString(),
      color: 'border-blue-600 dark:border-blue-400',
      info: '',
      id: 'responses-info',
    },
    {
      icon: <GiReceiveMoney className='text-green-600 text-2xl'/>,
      label: 'Sales',
      value: `$${totals.sales.toLocaleString()}`,
      color: 'border-green-600',
      info: '',
      id: 'sales-info',
    },
    {
      icon: <IoMailOutline className='text-purple-600 dark:text-purple-300 text-2xl'/>,
      label: 'Mailed',
      value: totals.mailed.toLocaleString(),
      color: 'border-purple-600 dark:border-purple-300',
      info: 'Total quantity of pieces mailed',
      id: 'mailed-info',
    },
    {
      icon: <MdReply className='text-pink-500 dark:text-pink-300 text-2xl'/>,
      label: 'Incremental Responses',
      value: totals.adjResponses.toLocaleString(),
      color: 'border-pink-600 dark:border-pink-300',
      info: '',
      id: 'inc-responses-info',
    },
    {
      icon: <BsBarChartFill className='text-yellow-500 text-2xl'/>,
      label: 'Incremental Sales',
      value: `$${totals.adjSales.toLocaleString()}`,
      color: 'border-yellow-600',
      info: '',
      id: 'inc-responses-info',
    },
  ]
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`border-2 rounded-lg p-4 flex flex-col items-start justify-between gap-2 shadow-sm ${stat.color} dark:bg-zinc-500`}
        >
          <div className='flex items-center gap-2'>
            {stat.icon}
            <h3 className='text-sm font-medium text-gray-700 dark:text-white'>{stat.label}</h3>            
          </div>
          <p className='text-xl font-semibold text-gray-900 dark:text-white'>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}