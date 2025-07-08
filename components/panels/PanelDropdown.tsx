'use client'

import React, { useState } from 'react'
import { dashboardPanels } from '@/constants/panels'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { addPanel } from '@/features/dashboardSlice'
import { RiFunctionAddLine } from 'react-icons/ri'

export const PanelDropdown: React.FC = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const panelOrder = useAppSelector((state) => state.dashboard.panelOrder)

  const availablePanels = dashboardPanels.filter(
    (panel) => !panelOrder.includes(panel.id)
  )

  const handleAddPanel = (id: number) => {
    dispatch(addPanel(id))
    setOpen(false)
  }

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}
        className='flex p-2 border rounded bg-white dark:bg-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-500'
      >
        <RiFunctionAddLine className='mr-1'/>
        <p className='text-xs'>Add Panel</p>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-500 rounded shadow-lg z-50'>
          {availablePanels.length === 0 ? (
            <p className='p-4 text-sm'>All Panels Are Already Displayed</p>
          ) : (
            availablePanels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => handleAddPanel(panel.id)}
              className='w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-zinc-600'
            >
              <panel.icon className='mr-2'/>
              <span>{panel.title}</span>  
            </button>        
            ))
          )}
        </div>
      )}
    </div>
  )
}