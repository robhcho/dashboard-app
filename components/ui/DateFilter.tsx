'use client'

import React, {useEffect, useState, useRef} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type DateFilterProps = {
  onDateChange: (range: [Date, Date]) => void
  minDate?: Date
  maxDate?: Date

}

export const DateFilter: React.FC<DateFilterProps> = ({onDateChange, minDate, maxDate}) => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ])
  const [showCalendar, setShowCalendar] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowCalendar(false)
      }
    }

    if(showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])
  
  const handleChange = (
    range: Date | [Date | null, Date | null] | null, 
    _event?: React.MouseEvent<HTMLButtonElement>
  ) => {        
    if (Array.isArray(range) && range[0] && range[1]) {
      setDateRange([range[0], range[1]])
      onDateChange([range[0], range[1]])
      setShowCalendar(false)
    }    
  }

  return (
    <div className='bg-white dark:bg-zinc-600 rounded-lg w-fit'>
      <label className='text-sm font-semibold text-gray-700 dark:text-white mb-2'>Date Range: </label>
      <input 
        type='text'
        readOnly
        value={`${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`}
        onClick={() => setShowCalendar((prev) => !prev)}
        className='border border-gray-300 rounded px-3 py-2 text-sm w-[250]px cursor-pointer shadow-sm dark:bg-zinc-600'
      />

      {showCalendar && (
        <div className='absolute z-50 mt-2 shadow-lg border border-gray-200 rounded bg-white dark:bg-zinc-600 right-0'>
          <Calendar 
            selectRange
            onChange={handleChange}
            value={dateRange}
            minDate={minDate}
            maxDate={maxDate}
            className='REACT-CALENDAR p-2 rounded dark:bg-zinc-600'
          />
        </div>
      )}      
    </div>
  )
}