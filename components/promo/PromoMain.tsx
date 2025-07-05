'use client'

import React, {useEffect, useState} from 'react'
import { DateFilter } from '../ui/DateFilter'
import { IoMailOpenOutline } from 'react-icons/io5'
import { usePromoData } from '@/app/hooks/usePromoData'
import { PromoAccordion } from './PromoAccordion'
import { Promo } from '@/app/hooks/usePromoData'
import { PromoRoiDrawer } from './PromoRoi'

export const PromoPage = () => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [openRoi, setOpenRoi] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState<Promo | null>(null)
  const {promos, loading, error} = usePromoData()

  const filteredPromos = (promos ?? []).filter((promo) => 
    promo.promo_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewRoi = (promo: Promo) => {
    setSelectedPromo(promo)
    setOpenRoi(true)
  }

  const handleDrawerClose = () => {
    setOpenRoi(false)
    setSelectedPromo(null)
  }

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
            <PromoAccordion key={idx} promo={promo} onViewRoi={handleViewRoi}/>
          ))
        ): (
          <div className='text-gray-500'>No Results Found</div>
        )}
      </div>

      {openRoi && selectedPromo && (
        <div className='fixed inset-0 z-50 flex justify-end'>
          <div className='absolute inset-0 bg-black opacity-50' onClick={handleDrawerClose} />

            <div className='relative w-full h-full bg-white shadow-xl p-6 overflow-y-auto'>
              <div className='flex justify-between items-center mb-4 border-b-2 pb-4'>
                <h2 className='text-xl font-semibold'>
                  ROI Breakdown
                </h2>
                <button
                  onClick={handleDrawerClose}
                  className='text-sm text-blue-600 hover:underline'
                >
                  Close
                </button>
              </div>
              <PromoRoiDrawer promo={selectedPromo} onClose={handleDrawerClose} />
          </div>
        </div>
      )}
    </div>
  )
}