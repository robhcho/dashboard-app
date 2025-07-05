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


const DashboardPage = () => {
  const dispatch =  useAppDispatch()
  const panelOrder = useAppSelector(state => state.dashboard.panelOrder)
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)

    if(panelOrder.length === 0) {
      const defaultOrder = dashboardPanels.map(p => p.id)
      dispatch(setPanelOrder(defaultOrder))
    }
  }, [dispatch, panelOrder.length])

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
      <WelcomeBoard user='User' companyName='Company' />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={panelOrder} strategy={verticalListSortingStrategy}>
          <div className='p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6'>
            {panelOrder.map(id => {
              const panel = dashboardPanels.find(p => p.id === id)
              if(!panel) return null
              return (
                <SortablePanel key={id} id={id}>
                  <PanelCard                 
                    panel={panel} 
                    title={panel.title}
                    path={panel.path.replace('/', '')}
                    icon={panel.icon}
                    color={panel.color}
                    colorDark={panel.colorDark}
                    subheader={panel.subheader}
                  />
                </SortablePanel>
              )
            })}             
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default DashboardPage