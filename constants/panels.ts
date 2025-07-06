import React from 'react'
import {
  IoCalendarClearOutline,
  IoCashOutline,
  IoMailOpenOutline
} from 'react-icons/io5'
import { MdCallMissed } from 'react-icons/md'

export type PanelConfig = {
  id: number
  title: string
  path: string
  icon: React.ElementType
  color: string
  colorDark: string
  subheader?: string
}

export const dashboardPanels: PanelConfig[] = [
  {
    id: 1,
    title: 'Calendar',
    path: '/calendar',
    color: '#bd4c46',
    colorDark: 'rgba(189, 76, 70, 0.5)',    
    icon: IoCalendarClearOutline,
  },
  {
    id: 2,
    title: 'ROI',
    path: '/roi',    
    color: '#3b80b8',
    colorDark: 'rgba(59, 128, 184, 0.5)',
    subheader: 'Past 12 Months',
    icon: IoCashOutline,
  },  
  {
    id: 3,
    title: 'Promo',
    path: '/promo',    
    color: '#3b80b8',
    colorDark: 'rgba(59, 128, 184, 0.5)',
    subheader: 'Most Recent Running Promotion',
    icon: IoMailOpenOutline,
  },  
  {
    id: 4,
    title: 'Lost Opportunities',
    path: '/lost-opp',    
    color: '#3b80b8',
    colorDark: 'rgba(59, 128, 184, 0.5)',
    subheader: '',
    icon: MdCallMissed,
  },  
  {
    id: 5,
    title: 'Retention',
    path: '/retention',    
    color: '#f5c556',
    colorDark: 'rgba(255, 190, 38, 0.5)',
    subheader: '',
    icon: MdCallMissed,
  },  
]