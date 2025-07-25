'use client'

import React, {useState, useEffect} from 'react'
import { dashboardPanels } from '@/constants/panels'
import { PanelCard } from '@/components/dashboard/PanelCard'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, } from '@dnd-kit/sortable'
import { setPanelOrder } from '@/features/dashboardSlice'
import { SortablePanel } from '@/components/dashboard/SortablePanel'
import { WelcomeBoard } from '@/components/dashboard/Welcome'
import { MdSpaceDashboard } from 'react-icons/md'
import { RiFunctionAddLine } from 'react-icons/ri'
import { PanelDropdown } from '@/components/panels/PanelDropdown'


const DashboardPage = () => {
  const dispatch =  useAppDispatch()
  const panelOrder = useAppSelector(state => state.dashboard.panelOrder)
  const [ mounted, setMounted ] = useState(false)
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    setMounted(true)

    if(panelOrder.length === 0) {
      const defaultOrder = dashboardPanels.map(p => p.id)
      dispatch(setPanelOrder(defaultOrder))
    }
  }, [dispatch, panelOrder.length])

  const filteredDashPanels = dashboardPanels.filter(panel => 
    panel.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDragEnd = (e:any) => {
    const { active, over } = e
    if(active.id !== over?.id) {
      const oldIdx = panelOrder.indexOf(active.id)
      const newIdx = panelOrder.indexOf(over.id)
      const newOrder = arrayMove(panelOrder, oldIdx, newIdx)
      dispatch(setPanelOrder(newOrder))
    }
  }

  if(!mounted) return null

  return (
    <>
      <div className='flex justify-between items-center mt-5'>
        <div className='flex items-center'>
          <MdSpaceDashboard className='mr-1'/>
          Dashboard
        </div>
        <div className='flex items-center mr-4'>
          <input 
            type='text'
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-[200px] border rounded-md mr-3 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-600'
          />
          <PanelDropdown />
        </div>
      </div>
      <WelcomeBoard user='User' companyName='Company' />
      
      <div className='p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6'>
        {(() => {
          const fixedPanel = dashboardPanels.find(p => p.id === panelOrder[0])
          if (!fixedPanel) return null
          return (
            <PanelCard
              id={fixedPanel.id} 
              key={fixedPanel.id}              
              title={fixedPanel.title}
              path={fixedPanel.path.replace('/', '')}
              icon={fixedPanel.icon}
              color={fixedPanel.color}              
              subheader={fixedPanel.subheader}
            />
          )
        })()}
        
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={panelOrder.slice(1)} strategy={verticalListSortingStrategy}>
              {panelOrder.slice(1).map(id => {
                const panel = filteredDashPanels.find(p => p.id === id)
                if(!panel) return null
                return (
                  <SortablePanel key={id} id={id}>
                    <PanelCard                                        
                      id={id}
                      title={panel.title}
                      path={panel.path.replace('/', '')}
                      icon={panel.icon}
                      color={panel.color}                    
                      subheader={panel.subheader}
                    />
                  </SortablePanel>
                )
              })}             
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}

export default DashboardPage