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
  const [searchTerm, setSearchTerm] = useState('')
  const {promos, loading, error} = usePromoData()

  const filteredPromos = (promos ?? []).filter((promo) => 
    promo.promo_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if(loading) return <div>Loading..</div>
  if(error) return <div>Error loading promos: {error}</div>
  if(!promos || promos.length < 1) return <div>No promos found</div>
  
  return (
    <div className='pt-5'>
      <h4 className='flex items-center text-lg'><IoMailOpenOutline className='mr-1'/> PROMOS</h4>
      <div className='mb-3 flex justify-between items-center'>        
        <input 
          type='text'
          placeholder='Search by Promo'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[350px] border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />      
        
        <DateFilter onDateChange={setDateRange} />
      </div>
      <div className='mt-6'>
        {filteredPromos.length > 0 ?(
          filteredPromos.map((promo, idx) => (
            <PromoAccordion key={idx} promo={promo}/>
          ))
        ): (
          <div className='text-gray-500'>No Results Found</div>
        )}
      </div>
    </div>
  )
}