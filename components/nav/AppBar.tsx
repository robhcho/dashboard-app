'use client'

import Image from 'next/image'
import { useState } from 'react'
// import { BellIcon, SunIcon, MoonIcon, ChevronDown } from 'lucide-react'

export const AppBar({
  companyName,
  onLogout,
  onToggleTheme,
  darkMode,
}: {
  companyName: string
  onLogout: () => void
  onToggleTheme: () => void
  darkMode: boolean
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      
    </header>
  )
}