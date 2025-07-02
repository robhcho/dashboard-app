'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdHelp, } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { RiLogoutBoxLine, RiUserFill,} from 'react-icons/ri'
import {AiOutlineUserSwitch,} from 'react-icons/ai'
import {MdVerifiedUser,} from 'react-icons/md'  
import {CgClose} from 'react-icons/cg'
import { IoIosMore } from 'react-icons/io'

const menuItems = [
  {key: 'admin', label: 'Admin', icon: <MdVerifiedUser />, color: 'bg-purple-600', action: () => console.log('admin')},
  {key: 'switch', label: 'Switch', icon: <AiOutlineUserSwitch />, color: 'bg-blue-600', action: () => console.log('switch')},
  {key: 'support', label: 'Support', icon: <IoMdHelp />, color: 'bg-green-600', action: () => console.log('support')},
  {key: 'settings', label: 'Settings', icon: <IoSettingsSharp />, color: 'bg-yellow-600', action: () => console.log('settings')},
  {key: 'logout', label: 'Logout', icon: <RiLogoutBoxLine />, color: 'bg-red-600', action: () => console.log('logout')},
]

export const AppBarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className='fixed bottom-6 right-6 z-[200]'>
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 0.6}}
              exit={{opacity: 0}}
              onClick={() => setMenuOpen(false)}
              className='fixed inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950'
            />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {menuOpen && (
            <div className='absolute bottom-14 right-0 flex flex-col items-end gap-4 z-[200]'>
              {menuItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{ opacity: 0, y: 20}}
                  transition={{delay: i * 0.1}}
                  className='relative flex items-center justify-end'
                >
                  <motion.div
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 20}}
                    transition={{delay: i * 0.1}}
                    className='mr-4'
                    style={{marginBottom: '25px'}}
                    >
                    <span className='text-xs font-semibold text-white'>{item.label}</span>
                  </motion.div>
                  <button
                    onClick={item.action}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow ${item.color}`}
                    style={{marginBottom: '25px'}}
                  >
                    {item.icon}
                  </button>                  
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

      </div>
      <button
        onClick={() => setMenuOpen(prev => !prev)}
        className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          menuOpen ? 'bg-red-600 text-white' : 'bg-zinc-700 text-gray-200'
        }`}
      >
        {menuOpen ? <CgClose /> : <IoIosMore/>}
      </button>
    </>
  )
}