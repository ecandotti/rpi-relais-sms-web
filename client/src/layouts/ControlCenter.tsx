import React from 'react'
import { Outlet } from 'react-router-dom'
import Notification from 'react-notify-toast'

import { Navbar } from '../components/Navbar'
import { Topbar } from '../components/Topbar'

export const ControlCenter: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full bg-slate-100 text-slate-800 transition-colors">
            <Topbar />
            <Outlet />
            <Navbar />
            <Notification />
        </div>
    )
}
