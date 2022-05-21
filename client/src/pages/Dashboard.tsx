import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'

import Switch from '../components/switch/Switch'

import api from '../utils/api'
import { urls } from '../utils/urls'

export const Dashboard: React.FC = () => {
    const [relaysList, setRelaysList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getRelaysState()
    }, [])

    const getRelaysState = async (e?: Event) => {
        e?.preventDefault()
        const token = localStorage.getItem('rpiManager-token')

        setIsLoading(true)
        const { data } = await api.get(urls.api.GET_RELAYS, {
            headers: {
                authorization: token!,
            },
        })
        setIsLoading(false)

        if (data.success) {
            setRelaysList(data.relays)
        } else {
            setRelaysList([])
        }
    }

    return (
        <div className="w-screen h-screen relative bg-slate-200 text-p-2 text-xl transition-colors">
            <div className="h-full flex flex-col p-10 justify-evenly items-center">
                {relaysList?.length > 1 ? (
                    relaysList?.map((relay: any) => <Switch key={relay.id} relay={relay} />)
                ) : (
                    <div className="text-center">
                        <div>Impossible de recuperer les états des relais</div>
                        <button
                            type="button"
                            className="mt-4 rounded-full py-2 px-4 text-xl text-slate-50 bg-green-500 hover:bg-green-600 transition-colors"
                            onClick={() => getRelaysState()}
                        >
                            {isLoading ? (
                                <ReactLoading type="spin" color="white" height={14} width={14} />
                            ) : (
                                'Réessayer'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
