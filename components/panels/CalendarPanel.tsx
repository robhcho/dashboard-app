'use client'

import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs'

import { IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5'

const mockCalData = [
  {
    Written_Date: '2025-06-10',
    Data: [{ Sales_YOY_Flag: 1, Sales_YOY: 0.12 }]
  },
  {
    Written_Date: '2025-06-08',
    Data: [{ Sales_YOY_Flag: -1, Sales_YOY: -0.09 }]
  },
]

export const CalendarPanel = () => {
  const [date, setDate] = useState<Date | null>(new Date())
  const [calData, setCalData] = useState<any[]>([])

  useEffect(() => {
    setCalData(mockCalData)
  }, [date])

  const renderTileContent = ({ date: tileDate }: {date: Date}) => {
    const dayStr = dayjs(tileDate).format('YYYY-MM-DD')
    const entry = calData.find(entry => entry.Written_Date === dayStr)

    if(entry) {
      const flag = entry.Data[0].Sales_YOY_Flag
      const delta = entry.Data[0].Sales_YOY

      return (
        <div
          className='flex flex-row justify-center items-center gap-1 mt-1'
          title={`Sales ${
            flag === 1 ? '↑' : '↓'
          } ${Math.round(delta * 100)}% vs last year`}
        >
          {flag === 1 && (
            <IoArrowUpOutline className='text-green-600 text-xs'/>
          )}
          {flag === -1 && (
            <IoArrowDownOutline className='text-red-600 text-xs'/>
          )}
        </div>
      )
    }

    return null
  }

  return (    
    <div className='w-full h-full flex items-center justify-center'>
      <Calendar 
        value={date}
        onChange={(val) => {
          if(val instanceof Date) setDate(val)
        }}
        tileContent={renderTileContent}
        locale='en-US'
        className='calendar-custom'
      />
    </div>
  )
}