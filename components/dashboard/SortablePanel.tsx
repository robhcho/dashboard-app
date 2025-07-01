'use client'

import React, { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type SortablePanelProps = {
  id: number| string
  children: ReactNode
}

export const SortablePanel: React.FC<SortablePanelProps> = ({id, children}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab'
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}{...listeners}>
      {children}
    </div>
  )
}