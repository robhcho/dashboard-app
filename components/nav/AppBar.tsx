'use client'

import Image from 'next/image'
import { useState } from 'react'
// import { BellIcon, SunIcon, MoonIcon, ChevronDown } from 'lucide-react'
import { IoIosNotifications, IoIosSunny, IoIosMoon, IoIosMore } from 'react-icons/io'

export const AppBar = ({
  companyName,
  onLogout,
  onToggleTheme,
  darkMode,
}: {
  companyName: string
  onLogout: () => void
  onToggleTheme: () => void
  darkMode: boolean
}) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header 
      className='flex items-center justify-between px-4 h-14 bg-gradient-to-r from-zinc-800 to-zinc-700 text-white shadow-md fixed top-0 left-0 w-full z-50'
    >
      <div className='flex items-center gap-4'>
        {/* <div className='h-6 bg-gray-500'/> */}
        <span className='text-xs uppercase tracking-wide text-gray-200'>{companyName}</span>
      </div>

      <div className='flex items-center gap-4'>
        <div className='h-6 w-px bg-gray-500'/>
        <button className='hover:text-gray-300'>
          <IoIosNotifications />
        </button>
        <div className='h-6 w-px bg-gray-500'/>
        <button onClick={onToggleTheme} className='hover:text-gray-300'>
          {darkMode ? <IoIosSunny /> : <IoIosMoon />}
        </button>
        <div className='h-6 w-px bg-gray-500'/>
        <div className='relative'>
          <button onClick={() => setMenuOpen(prev => !prev)} className='flex items-center gap-1 hover:text-gray-300'>
            <IoIosMore/>
          </button>
        </div>
      </div>
    </header>
  )
}