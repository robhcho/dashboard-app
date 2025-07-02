'use client'

import React from 'react'
import { IoMailOutline } from 'react-icons/io5'
import { MdCreditCard, MdReplyAll, MdReply } from 'react-icons/md'
import { IoMdHelpCircleOutline } from 'react-icons/io'
import { GiReceiveMoney } from 'react-icons/gi'
import { BiSolidDollarCircle } from 'react-icons/bi'
import { BsBarChartFill } from 'react-icons/bs'

const stats = [
  {
    icon: <MdCreditCard className='text-red-600 text-2xl'/>,
    label: 'Spend',
    value: '$45,000',
    color: 'border-red-600',
    info: 'Total cost of mailing',
    id: 'spend-info',
  },
  {
    icon: <MdReplyAll className='text-blue-600 text-2xl'/>,
    label: 'Responses',
    value: '6,800',
    color: 'border-blue-600',
    info: '',
    id: 'responses-info',
  },
  {
    icon: <GiReceiveMoney className='text-green-600 text-2xl'/>,
    label: 'Sales',
    value: '$112,000',
    color: 'border-green-600',
    info: '',
    id: 'sales-info',
  },
  {
    icon: <IoMailOutline className='text-purple-600 text-2xl'/>,
    label: 'Mailed',
    value: '100,000',
    color: 'border-purple-600',
    info: 'Total quantity of pieces mailed',
    id: 'mailed-info',
  },
  {
    icon: <MdReply className='text-pink-500 text-2xl'/>,
    label: 'Incremental Responses',
    value: '3,200',
    color: 'border-pink-600',
    info: '',
    id: 'inc-responses-info',
  },
  {
    icon: <BsBarChartFill className='text-yellow-500 text-2xl'/>,
    label: 'Incremental Sales',
    value: '$54,000',
    color: 'border-yellow-600',
    info: '',
    id: 'inc-responses-info',
  },
]

export const Stats= () => {  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`border-2 rounded-lg p-4 flex flex-col items-start justify-between gap-2 shadow-sm ${stat.color}`}
        >
          <div className='flex items-center gap-2'>
            {stat.icon}
            <h3 className='text-sm font-medium text-gray-700'>{stat.label}</h3>            
          </div>
          <p className='text-xl font-semibold text-gray-900'>{stat.value}</p>
        </div>
      ))}
    </div>
  )
}