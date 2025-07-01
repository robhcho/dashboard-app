'use client'

import React, {useState} from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import {Sidebar} from '@/components/nav/Sidebar'
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const sidebarWidth = isSidebarOpen ? 240 : 64
  const mainMargin = sidebarWidth + 16
  
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen}/>
          <main 
            style={{marginLeft: `${mainMargin}px`}}
            className='transition-all duration-200 ease-in-out w-full mx-auto p-6'
          >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
