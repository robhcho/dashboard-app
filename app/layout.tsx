'use client'

import React, {useState, useEffect} from 'react'
import { Providers } from './Providers'
import { LayoutWrapper } from './LayoutWrapper'
import { store } from '@/lib/store'
import {Sidebar} from '@/components/nav/Sidebar'
import {AppBar} from '@/components/nav/AppBar'
import { useAppSelector } from '@/lib/hooks'
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className='dark:bg-zinc-600 dark:text-white'>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
