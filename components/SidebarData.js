import React,{useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Buyland',
    path: '/search',
    icon: <FaIcons.FaSearch />,
    cName: 'nav-text'
  },
  {
    title: 'Requests',
    path: '/requests',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <FaIcons.FaUserAlt />,
    cName: 'nav-text'
  }
]
