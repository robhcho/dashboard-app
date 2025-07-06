'use client'

import React from 'react'
import { PanelConfig } from "@/constants/panels"
import { panelComponentMap } from '../panels'
import { RiDragMoveFill } from 'react-icons/ri'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { DraggableAttributes } from '@dnd-kit/core'

type PanelCardProps = {
  title: string
  path: string
  color: string
  colorDark: string
  icon: React.ReactNode
  subheader?: string
  dragListeners?: SyntheticListenerMap
  dragAttributes?: DraggableAttributes
  setDragHandleRef?: (element: HTMLElement | null) => void
}

interface Props {
  panel: PanelConfig
}

const style = {
  cursor: 'grab'
}

export const PanelCard: React.FC<PanelCardProps> = ({ 
  title, path, icon, subheader, color, colorDark, dragListeners, dragAttributes, setDragHandleRef 
}) => {  
  const Icon = icon
  const PanelComponent = panelComponentMap[path]
  
  return (
    <div
      className='w-full h-[450px] md:h-[400px] lg:h-[400px] bg-white rounded-lg border shadow-md overflow-hidden flex flex-col items-center'
      style={{borderColor: color}}
    >
      <div
        className='w-full flex items-center justify-between px-4 py-3'
        style={{ backgroundColor: color}}
      >
        <div className='flex items-center gap-2 text-white'>
          <div className='p-1 bg-white bg-opacity-0 rounded-full text-white'>
            <Icon />
          </div>
          <div className='text-sm font-medium'>{title}</div>
          {subheader && (
            <div className='text-xs opacity-70'>{subheader}</div>
          )}
        </div>

        <button
          ref={setDragHandleRef}
          {...dragAttributes}
          {...dragListeners}
          className='text-white opacity-70 hover:opacity-100 cursor-grab'
          style={style}
        >
          <RiDragMoveFill />
        </button>
      </div>
      <div className='p-4 text-sm text-gray-600 flex-grow glex items-start w-full h-full'>
        {PanelComponent ? <PanelComponent /> : <p>No content available</p>}
      </div>
    </div>
  )
}