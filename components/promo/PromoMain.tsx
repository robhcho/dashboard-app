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
  const [compareOpen, setCompareOpen] = useState(false)
  const [compareTargets, setCompareTargets] = useState<Promo[]>([])
  const [compareSelectedPromo, setCompareSelectedPromo] = useState<Promo | null>(null)
  const {promos, loading, error} = usePromoData()

  const filteredPromos = (promos ?? []).filter((promo) => {
    const promoStart = new Date(promo.promo_dates.start)
    const promoEnd = new Date(promo.promo_dates.end)
    const [rangeStart, rangeEnd] = dateRange

    return (
      promo.promo_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (
        (promoStart >= rangeStart && promoStart <= rangeEnd) ||
        (promoEnd >= rangeStart && promoEnd <= rangeEnd) ||
        (promoStart <= rangeStart && promoEnd >= rangeEnd)
      )
    )
  })

  const handleViewRoi = (promo: Promo) => {
    setSelectedPromo(promo)
    setOpenRoi(true)
  }

  const handleDrawerClose = () => {
    setOpenRoi(false)
    setSelectedPromo(null)
    setCompareOpen(false)
    setCompareSelectedPromo(null)
  }

  const handleComparePromo = () => {
    if (!selectedPromo) return

    const matches = (promos ?? []).filter((p) => 
      p.promo_name === selectedPromo.promo_name &&
      p.promo_dates.start !== selectedPromo.promo_dates.start
    )

    setCompareTargets(matches)
    setCompareOpen(true)
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
          className='w-[350px] border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-600'
        />      
        
        <DateFilter onDateChange={setDateRange} minDate={new Date('2024-01-01')} maxDate={new Date('2025-07-10')}/>
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
      
      <div className={`fixed inset-0 z-50 flex pointer-events-none`}>
        {openRoi && (
          <div className='absolute inset-0 transition-opacity duration-500 pointer-events-auto' onClick={handleDrawerClose} />
        )}

          <div 
            className={`transform transition-all duration-500 ease-in-out h-full ${
              compareOpen ?  'w-1/2 justify-start' : 'w-full justify-end'
            } bg-white dark:bg-zinc-600 shadow-xl p-6 overflow-y-auto relative pointer-events-auto
              ${openRoi ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {selectedPromo && (
              <>
                <div className='flex justify-between items-center mb-4 border-b-2 pb-4'>
                  <h2 className='text-xl font-semibold'>
                    ROI Breakdown
                  </h2>
                  <div className='flex flex-col items-end'>
                    <button
                      onClick={handleDrawerClose}
                      className='text-sm text-blue-600 hover:underline dark:text-blue-300'
                    >
                      Close
                    </button>
                    <button
                      onClick={handleComparePromo}
                      className='mt-4 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500'
                    >
                      Compare To Another Promo
                    </button>
                  </div>
                </div>
                <PromoRoiDrawer promo={selectedPromo} onClose={handleDrawerClose} />
              </>
            )}
        </div>
      </div>
    
      <div 
        className={`fixed right-0 top-0 w-1/2 h-full bg-white dark:bg-zinc-600 shadow-lg z-50 p-6 overflow-y-auto transform transition-transform duration-500 ease-in-out
          ${compareOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >          
        {!compareSelectedPromo ? (
          <>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Compare With Another Promo</h2>
              <button onClick={() => {
                setCompareOpen(false)
                setCompareSelectedPromo(null)
              }}>x</button>
            </div>
            
            {compareTargets.length > 0 ? (
              compareTargets.map((promo, idx) => (
                <div
                  key={idx}
                  className='border rounded p-4 mb-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-400'
                  onClick={() => setCompareSelectedPromo(promo)}
                >
                  <h3 className='font-semibold'>{promo.promo_name}</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-200'>
                    {promo.promo_dates.start} - {promo.promo_dates.end}
                  </p>                  
                </div>
              ))
            ) : (
              <p>No past promos found for comparison</p>
            )}
          </>
        ) : (
          <div className={`relative h-full transform transition-transform duration-500 ease-in-out
            ${compareSelectedPromo ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <div className='flex justify-between items-center mb-4 border-b pb-2'>
              <h2 className='text-xl font-bold'>ROI Breakdown</h2>
              <button
                onClick={() => setCompareSelectedPromo(null)}
                className='text-sm text-blue-600 hover:underline dark:text-blue-300'
              >
                Back To List
              </button>
            </div>
            <PromoRoiDrawer promo={compareSelectedPromo} onClose={() => setCompareSelectedPromo(null)} />
          </div>
        )}            
      </div>    
    </div>
  )
}