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
    <div className='p-4'>
      <h2 className='text-lg font-semibold w-full'>{latestPromo.promo_name}</h2>
      <p className='text-sm text-gray-600 mb-4'>
        {dayjs(latestPromo.promo_dates.start).format('MMM DD, YYYY')} - {dayjs(latestPromo.promo_dates.end).format('MMM DD, YYYY')}
      </p>

      <div className='flex flex-row gap-6 justify-between items-center'>
        <div className='flex flex-col w-full lg:w-1/2 space-y-4 text-left'>
          <div>
            <h5 className='text-xs text-cyan-600'>AVERAGE TICKET</h5>
            <p className='font-bold text-gray-700'>${averageTicket.toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-lime-700'>INCREMENTAL SALES</h5>
            <p className='font-bold text-gray-700'>${incrementalSales.toLocaleString()}</p>
          </div>
          <div>
            <h5 className='text-xs text-pink-600'>INCREMENTAL RESPONSE RATE</h5>
            <p className='font-bold text-gray-700'>{incrementalResponseRate.toLocaleString()}%</p>
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