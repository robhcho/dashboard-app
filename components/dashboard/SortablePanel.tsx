'use client'

import React, { ReactElement, ReactNode } from 'react'
import { AnimateLayoutChanges, useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type SortablePanelProps = {
  id: number| string
  children: ReactElement<any>
}

export const SortablePanel: React.FC<SortablePanelProps> = ({id, children}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    animateLayoutChanges: defaultAnimateLayoutChanges as AnimateLayoutChanges,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,    
  }

  return (
    <div ref={setNodeRef} style={style}>
      {React.cloneElement(children, {
        dragListeners: listeners,
        dragAttributes: attributes,
        setDragHandleRef: setActivatorNodeRef,
      })}
    </div>
  )
}