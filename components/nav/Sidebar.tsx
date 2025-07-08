'use client'

import React, { useState } from 'react'
import { RiHome4Fill, RiExchangeDollarFill } from 'react-icons/ri'
import { BiCalendarEvent } from 'react-icons/bi'
import { IoMailOpenOutline } from 'react-icons/io5'
import Link from 'next/link'
import clsx from 'clsx'

type SidebarProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const navItems = [
  {title: 'Dashboard', icon: <RiHome4Fill size={20}/>, path: '/dashboard'},
  // {title: 'Calendar', icon: <BiCalendarEvent size={20}/>, path: '/calendar'},
  {title: 'ROI', icon: <RiExchangeDollarFill size={20}/>, path: '/roi'},
  {title: 'Promos', icon: <IoMailOpenOutline size={20}/>, path: '/promos'}
]

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={clsx(
        'fixed top-0 left-0 h-full bg-zinc-800 text-white shadow-lg z-40 transition-all duration-200 ease-in-out',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className='h-14' />
      <div className='flex flex-col pt-6 space-y-2'>
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.path}
            className='flex items-center gap-3 px-4 py-3 hover:bg-zinc-700 transition'
          >
            <span>{item.icon}</span>
            {isOpen && <span className='text-sm font-medium uppercase'>{item.title}</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}