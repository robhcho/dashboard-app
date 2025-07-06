'use client'

import React from 'react'

type WelcomeBoardProps = {
  user: string
  companyName: string
}

export const WelcomeBoard: React.FC<WelcomeBoardProps> = ({ user, companyName }) => {
  return (
    <div className='flex flex-col justify-between items-start bg-gradient-to-r from-[#0492cf] to-[#2cdbb2] border-2 border-white border-opacity-80 rounded-lg px-5 py-5 mr-4 mb-6 mt-4 animate-fade-in'>
      <h2 className='text-2xl font-bold text-white'>
        Hello {user} ({companyName})
      </h2>
      <p className='text-white text-base mt-1'>
        Welcome to your Dashboard
      </p>
    </div>
  )
}