'use client'

import Image from 'next/image'
import { useState } from 'react'
import { IoIosNotifications, IoIosSunny, IoIosMoon, IoIosMore } from 'react-icons/io'
import { AppBarMenu } from './AppBarMenu'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { toggleDarkMode } from '@/features/themeSlice'

export const AppBar = ({
  companyName,
  onLogout,  
}: {
  companyName: string
  onLogout: () => void  
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.theme.darkMode)

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
        <button onClick={() => dispatch(toggleDarkMode())} className='hover:text-gray-300'>
          {darkMode ? <IoIosSunny /> : <IoIosMoon />}
        </button>
        <div className='h-6 w-px bg-gray-500'/>
        <div className='relative'>
          <AppBarMenu />
          {/* <button onClick={() => setMenuOpen(prev => !prev)} className='flex items-center gap-1 hover:text-gray-300'>
            <IoIosMore/>
          </button> */}
        </div>
      </div>
    </header>
  )
}