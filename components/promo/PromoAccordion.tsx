'use client'

import React, {useState, useRef} from 'react'
import { Promo } from '@/app/hooks/usePromoData'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

type PromoAccordionProps = {
  promo: Promo
  onViewRoi: (promo: Promo) => void
}

export const PromoAccordion: React.FC<PromoAccordionProps> = ({promo, onViewRoi}) => {
  const [expanded, setExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const {
    promo_name,
    promo_dates,
    creatives,
    total_data
  } = promo

  const responseRate = total_data.mailed > 0 ? (total_data.responses / total_data.mailed) * 100 : 0
  const avgTicket = total_data.responses > 0 ? total_data.sales / total_data.responses : 0

  return (
    <div className='border border-gray-300 rounded-lg shadow-sm overlow-hidden bg-white dark:bg-zinc-500 dark:text-white'>
      <button
        className='w-full text-left px-4 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-400'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='w-full'>
          <h3 className='font-semibold text-lg'>{promo_name}</h3>
          <div className='flex items-center'>
            <p className='text-sm text-gray-500 dark:text-white'>
              {promo_dates.start} - {promo_dates.end}
            </p>            
            <span className='flex ml-24 items-center transition-opacity duration-300 ease-in-out' style={{opacity: expanded ? 0 : 100}}>
              <span className='mr-5'><Metric label="Mailed" value={total_data.mailed.toLocaleString()}/></span> | 
              <span className='ml-5'><Metric label="Response Rate" value={responseRate.toFixed(2)}/></span>
            </span>            
          </div>
        </div>
        <span>{expanded ? <FaChevronUp/> : <FaChevronDown/>}</span>
      </button>
  
      <div
        ref={contentRef}
        className='transition-all duration-300 ease-in-out overflow-hidden'
        style={{ maxHeight: expanded ? `${contentRef.current?.scrollHeight}px` : '0px'}}
      >
        <div className='px-4 pb-4'>        
          <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2 text-sm'>
            <Metric label='Spend' value={`$${Math.floor(total_data.spend).toLocaleString()}`} />
            <Metric label='Mailed' value={total_data.mailed.toLocaleString()} />
            <Metric label='Responses' value={total_data.responses.toLocaleString()} />
            <Metric label='Sales' value={`$${total_data.sales.toLocaleString()}`} />
            <Metric label='Response Rate' value={`${responseRate.toFixed(2)}`} />
            <Metric label='Avg Ticket' value={`$${Math.floor(avgTicket).toLocaleString()}`} />
          </div>

          <div className='mt-4'>
            <button
              onClick={() => onViewRoi(promo)}
              className='px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              View ROI
            </button>
          </div>
        </div>
      </div>      
    </div>
  )
}

const Metric = ({label, value}: { label: string; value: string}) => (
  <div>
    <span className='text-gray-500 dark:text-white'>{label}: </span>
    <span className='font-medium'>{value}</span>
  </div>
)
