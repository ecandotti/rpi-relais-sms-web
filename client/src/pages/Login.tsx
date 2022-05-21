import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { RiRemoteControlLine } from 'react-icons/ri'
import { useNavigate, Navigate } from 'react-router-dom'

import api from '../utils/api'
import { urls } from '../utils/urls'

export const Login: React.FC = () => {
    const navigate = useNavigate()

    const [hide, setHide] = useState(true)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState({})

    if (localStorage.getItem('rpiManager-token')) {
        return <Navigate to={urls.app.DASHBOARD} replace />
    }

    const hidePass = (e: Event) => {
        e.preventDefault()
        if (hide) {
            document.getElementById('password')?.setAttribute('type', 'text')
            setHide(false)
        } else {
            document.getElementById('password')?.setAttribute('type', 'password')
            setHide(true)
        }
    }

    const handleLogin = async (e: Event) => {
        e.preventDefault()
        setIsLoading(true)

        const { data } = await api.post(urls.api.LOGIN, user)

        setIsLoading(false)

        if (data.success) {
            localStorage.setItem('rpiManager-token', data.token)
            navigate(urls.app.DASHBOARD)
        } else {
            setError(data.message)
        }
    }

    return (
        <div className="w-full h-full relative bg-slate-200 text-p-2 text-xl transition-colors">
            <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="text-center w-80 z-50">
                    <div className="flex justify-center items-center mb-10 text-3xl text-slate-800 select-none">
                        <span className="text-green-500">Control</span>Center{' '}
                        <RiRemoteControlLine />
                    </div>
                    <form className="flex flex-col" onSubmit={handleLogin as any}>
                        <label
                            htmlFor="identifiant"
                            className="mb-1 text-left cursor-pointer text-slate-800"
                        >
                            Identifiant
                        </label>
                        <input
                            type="text"
                            placeholder="johndoe"
                            name="identifiant"
                            id="identifiant"
                            required
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            className="mb-10 focus:outline-none rounded-xl p-4 justify-end text-slate-800 bg-slate-100"
                        />
                        <label
                            htmlFor="password"
                            className="mb-1 text-left cursor-pointer text-slate-800"
                        >
                            Mot de passe
                        </label>
                        <div className="relative mb-10 h-16">
                            <input
                                type="password"
                                placeholder="**********"
                                name="password"
                                id="password"
                                required
                                onChange={e => setUser({ ...user, password: e.target.value })}
                                className="absolute left-0 w-full focus:outline-none rounded-xl p-4 justify-end text-slate-800 bg-slate-100"
                            />
                            <button
                                className="absolute right-4 bottom-6 text-slate-800"
                                onClick={hidePass as any}
                            >
                                {hide ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="rounded-full py-4 px-8 text-2xl text-slate-50 bg-green-500 hover:bg-green-600 transition-colors"
                            >
                                {isLoading ? (
                                    <ReactLoading
                                        type="spin"
                                        color="white"
                                        height={27}
                                        width={27}
                                    />
                                ) : (
                                    "S'identifier"
                                )}
                            </button>
                            <div className="text-red-500 mt-4">{error}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
