import { useEffect, useState } from 'react'
import { usePromoData } from '@/app/hooks/usePromoData'
import Image from 'next/image'
import dayjs from 'dayjs'

export const PromoPanel = () => {
  const { promos } = usePromoData()

  if (!promos || promos.length === 0) return null

  const latestPromo = [...promos].sort((a,b) => 
    dayjs(b.promo_dates.end).unix() - dayjs(a.promo_dates.end).unix()
  )[0]

  const mailed = latestPromo.roi.find((r) => r.status === 'mailed')
  const holdout = latestPromo.roi.find((r) => r.status === 'holdout')
  const mailedRate = mailed && mailed.mailed > 0
    ? mailed.responses / mailed.mailed
    : 0
  const holdoutRate = holdout && holdout.mailed > 0
    ? holdout.responses / holdout.mailed
    : 0

  const averageTicket = latestPromo.total_data.responses > 0
    ? Math.floor(latestPromo.total_data.sales / latestPromo.total_data.responses)
    : 0

  const incrementalSales = mailed && holdout ? mailed.sales - holdout.sales : 0
  const incrementalResponseRate = Math.max((mailedRate - holdoutRate) * 100, 0).toFixed(2)

  return (
    <div className='bg-white rounded-lgx p-4 w-full'>
      <h2 className='text-lg font-semibold mb-2'>{latestPromo.promo_name}</h2>
      <p className='text-sm text-gray-600 mb-4'>
        {dayjs(latestPromo.promo_dates.start).format('MMM DD, YYYY')} - {dayjs(latestPromo.promo_dates.end).format('MMM DD, YYYY')}
      </p>

      <div className='flex grid grid-cols-2 gap-4 mb-4'>
        <div className='grid gap-4 text-sm'>          
          <div>
            <span className='font-semibold'>AVG TICKET:</span><br/>
            ${averageTicket.toLocaleString()}
          </div>
          <div>
            <span className='font-semibold'>Inc. Sales:</span><br/>
            ${incrementalSales.toLocaleString()}
          </div>
          <div>
            <span className='font-semibold'>Inc. Response Rate:</span><br/>
            {incrementalResponseRate.toLocaleString()}%
          </div>
        </div>
        
        <div className='w-1/2 border'>
          <Image 
            src={latestPromo.creatives.front}
            alt='Front Creative'
            width={150}
            height={100}
            className='rounded-md object-cover w-full h-auto'
          />
        </div>
      </div>
    </div>
  )
}