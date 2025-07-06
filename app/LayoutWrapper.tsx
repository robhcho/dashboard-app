'use client'

import React, { useState, useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'
import { AppBar } from '@/components/nav/AppBar'
import { Sidebar } from '@/components/nav/Sidebar'

export const LayoutWrapper = ({children}: { children: React.ReactNode}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const darkMode = useAppSelector((state) => state.theme.darkMode)

  const sidebarWidth = isSidebarOpen ? 240 : 64
  const mainMargin = sidebarWidth + 16

  useEffect(() => {
    if(darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <>
      <AppBar companyName='Company' onLogout={() => console.log('loggin out')}/>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
      <main 
        style={{marginLeft: `${mainMargin}px`, maxWidth: `calc(100% - ${mainMargin}px)`}}
        className='transition-all duration-200 ease-in-out w-full mx-auto p-6 pt-14'
      >
        {children}
      </main>
    </>
  )
}