'use client'

import { PanelConfig } from "@/constants/panels"

interface Props {
  panel: PanelConfig
}

export const PanelCard: React.FC<Props> = ({ panel }) => {
  const Icon = panel.icon
  
  return (
    <div
      className='w-full bg-white rounded-lg border shadow-md overflow-hidden flex flex-col'
      style={{borderColor: panel.color}}
    >
      <div
        className='flex items-center justify-between px-4 py-3'
        style={{ backgroundColor: panel.colorDark}}
      >
        <div className='flex items-center gap-2 text-white'>
          <div className='p-1 bg-white bg-opacity-20 rounded-full text-white'>
            <Icon color={panel.color}/>
          </div>
          <div className='text-sm font-medium'>{panel.title}</div>
          {panel.subheader && (
            <div className='text-xs opacity-70'>{panel.subheader}</div>
          )}
        </div>
      </div>
      <div className='p-4 text-sm text-gray-600'>
        Panel content here
      </div>
    </div>
  )
}