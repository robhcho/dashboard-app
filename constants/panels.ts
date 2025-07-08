import React from 'react'
import {
  IoCalendarClearOutline,
  IoCashOutline,
  IoMailOpenOutline
} from 'react-icons/io5'
import { MdCallMissed } from 'react-icons/md'
import { FaPersonWalkingArrowLoopLeft } from 'react-icons/fa6'
import { BiWorld } from 'react-icons/bi'

export type PanelConfig = {
  id: number
  title: string
  path: string
  icon: React.ElementType
  color: string  
  subheader?: string
}

export const dashboardPanels: PanelConfig[] = [
  {
    id: 1,
    title: 'Calendar',
    path: '/calendar',
    color: '#bd4c46',    
    icon: IoCalendarClearOutline,
  },
  {
    id: 2,
    title: 'ROI',
    path: '/roi',    
    color: '#3b80b8',    
    subheader: 'Past 12 Months',
    icon: IoCashOutline,
  },  
  {
    id: 3,
    title: 'Promo',
    path: '/promo',    
    color: '#3b80b8',    
    subheader: 'Most Recent Running Promotion',
    icon: IoMailOpenOutline,
  },  
  {
    id: 4,
    title: 'Lost Opportunities',
    path: '/lostOpp',    
    color: '#3b80b8',    
    subheader: '',
    icon: MdCallMissed,
  },  
  {
    id: 5,
    title: 'Retention',
    path: '/retention',    
    color: '#f5c556',    
    subheader: '',
    icon: FaPersonWalkingArrowLoopLeft,
  },  
  {
    id: 5,
    title: 'Demographics',
    path: '/demographics',    
    color: '#8eb858',    
    subheader: '',
    icon: BiWorld,
  },  
]