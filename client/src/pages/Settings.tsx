import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import { HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'
import { notify } from 'react-notify-toast'
import jwtDecode from 'jwt-decode'

import { user } from '../types/user'

import api from '../utils/api'
import { urls } from '../utils/urls'

export const Settings: React.FC = () => {
    const token = localStorage.getItem('rpiManager-token')

    let { username, phone, email, password }: user = jwtDecode(token as any)

    const [newPhone, setNewPhone] = useState(phone)
    const [newMail, setNewMail] = useState(email)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const updateContact = async (e: Event) => {
        e.preventDefault()

        setIsLoading(true)

        const { data } = await api.post(urls.api.UPDATE_CONTACT, {
            username,
            newPhone,
            newMail,
            password,
        })

        console.log(data)

        setIsLoading(false)

        if (data.success) {
            localStorage.setItem('rpiManager-token', data.token)
            notify.show('Information de contact mis à jour !', 'success')
        } else {
            notify.show('Une erreur est survenue', 'warning')
        }
    }

    return (
        <div className="w-screen h-screen relative bg-slate-200 text-p-2 text-xl transition-colors">
            <form
                className="h-full flex flex-col justify-center text-slate-800 p-10"
                onSubmit={updateContact as any}
            >
                <div className="mb-5">
                    <span>
                        Bonjour, <span className="text-bold text-green-500">{username}</span>
                    </span>
                </div>
                <div className="flex flex-row items-center mb-5">
                    <span className="flex flex-row items-center mr-4">
                        <HiOutlinePhone className="mr-2" />
                    </span>
                    <input
                        type="text"
                        name="newPhone"
                        id="newPhone"
                        value={newPhone}
                        onChange={e => setNewPhone(e.target.value)}
                        className="focus:outline-none rounded-xl p-2 justify-end text-slate-800 bg-slate-100"
                    />
                </div>
                <div className="flex flex-row items-center mb-5">
                    <span className="flex flex-row items-center mr-4">
                        <HiOutlineMail className="mr-2" />
                    </span>
                    <input
                        type="text"
                        name="newMail"
                        id="newMail"
                        value={newMail}
                        onChange={e => setNewMail(e.target.value)}
                        className="focus:outline-none rounded-xl p-2 justify-end text-slate-800 bg-slate-100"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="rounded-full py-2 px-4 text-xl text-slate-50 bg-green-500 hover:bg-green-600 transition-colors"
                    >
                        {isLoading ? (
                            <ReactLoading type="spin" color="white" height={14} width={14} />
                        ) : (
                            'Actualiser'
                        )}
                    </button>
                    <div className="text-red-500 mt-4">{error}</div>
                </div>
            </form>
        </div>
    )
}
