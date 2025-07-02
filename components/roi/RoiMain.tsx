import React from 'react'
import {Stats} from '@/components/roi/Stats'

export const RoiMain = () => {
  return (
    <div>
      ROI MAIN
      <Stats 
        data={{
          Spend: 18750,
          Sales: 32500,
          ROI: 0.73,
          Response_Rate: 0.045,
          Impressions: 126000,
        }}
        dark={false}
      />
    </div>
  )
}