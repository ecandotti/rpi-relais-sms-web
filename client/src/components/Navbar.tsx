import React from 'react'
import { GrHomeRounded, GrUserSettings } from 'react-icons/gr'
import { Link, useLocation } from 'react-router-dom'

import { urls } from '../utils/urls'

export const Navbar = () => {
    const resolved = useLocation()

    return (
        <nav className="w-full flex flex-row sticky bottom-0 bg-slate-50">
            <div className="flex-1">
                <Link
                    to={urls.app.DASHBOARD}
                    className={`flex items-center justify-center p-5 border-t-2 transition-colors ${
                        resolved.pathname === urls.app.DASHBOARD
                            ? 'border-green-500 text-green-500'
                            : 'hover:border-green-500 hover:text-green-500'
                    }`}
                >
                    <GrHomeRounded className="text-xl" />
                </Link>
            </div>
            <div className="flex-1">
                <Link
                    to={urls.app.SETTINGS}
                    className={`flex items-center justify-center p-5 border-t-2 text-slate-800 transition-colors ${
                        resolved.pathname === urls.app.SETTINGS
                            ? 'border-green-500 text-green-500'
                            : 'hover:border-green-500 hover:text-green-500'
                    }`}
                >
                    <GrUserSettings className="text-xl" />
                </Link>
            </div>
        </nav>
    )
}
