import React from 'react'
import { RiRemoteControlLine } from 'react-icons/ri'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { urls } from '../utils/urls'

export const Topbar: React.FC = () => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('rpiManager-token')
        navigate(urls.app.LOGIN, { replace: true })
    }

    return (
        <div className="w-full h-14 z-40 text-xl text-slate-800 bg-slate-50 select-none">
            <div className="flex justify-between items-center text-3xl text-slate-800 select-none p-3">
                <div className="flex items-center">
                    <span className="text-green-700">Control</span>Center{' '}
                    <RiRemoteControlLine className="ml-4" />
                </div>
                <div className="absolute right-2 top-3 cursor-pointer" onClick={logout}>
                    <HiOutlineLogout color="red" />
                </div>
            </div>
        </div>
    )
}
