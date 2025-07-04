'use client'

import React, {useEffect, useState} from 'react'
import { DateFilter } from '../ui/DateFilter'
import { IoMailOpenOutline } from 'react-icons/io5'
import { usePromoData } from '@/app/hooks/usePromoData'
import { PromoAccordion } from './PromoAccordion'

export const PromoPage = () => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ])
  const {promos, loading, error} = usePromoData()

  if(loading) return <div>Loading..</div>
  if(error) return <div>Error loading promos: {error}</div>
  if(!promos || promos.length < 1) return <div>No promos found</div>
  
  return (
    <div className='pt-5'>
      <div className='mb-3 flex justify-between items-center'>
        <h4 className='flex items-center text-lg'><IoMailOpenOutline className='mr-1'/> PROMOS</h4>
        <DateFilter onDateChange={setDateRange} />
      </div>
      <div className='mt-6'>
        {promos.map((promo, idx) => (
          <PromoAccordion key={idx} promo={promo}/>
        ))}
      </div>
    </div>
  )
}