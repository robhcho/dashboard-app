'use client'

import React, { useState } from 'react'
import { RiHome4Fill, RiExchangeDollarFill } from 'react-icons/ri'
import { BiCalendarEvent } from 'react-icons/bi'
import Link from 'next/link'
import clsx from 'clsx'

type SidebarProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navItems = [
  {title: 'Dashboard', icon: <RiHome4Fill />, path: '/dashboard'},
  {title: 'Calendar', icon: <BiCalendarEvent />, path: '/calendar'},
  {title: 'ROI', icon: <RiExchangeDollarFill />, path: '/roi'}
]

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  // const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={clsx(
        'fixed top-0 left-0 h-full bg-zinc-800 text-white shadow-lg z-40 transition-all duration-200 ease-in-out',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className='flex flex-col pt-6 space-y-2'>
        {navItems.map((item, i) => (
          <Link
            href={item.path}
            className='flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition'
          >
            <span>{item.icon}</span>
            {isOpen && <span className='text-sm font-medium'>{item.title}</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}