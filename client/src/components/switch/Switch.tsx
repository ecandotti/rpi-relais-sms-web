import React from 'react'
import { MdOutlineSettingsInputAntenna } from 'react-icons/md'

import { Relay } from '../../types/relay'

import './switch.css'

type Props = {
    relay: Relay
    updateRelayState: (GPIOnumber: number, relayNumber: number, state: string) => Promise<void>
}

const Switch: React.FC<Props> = ({ relay, updateRelayState }) => {
    const { id, GPIOnumber, state } = relay

    return (
        <div
            className="w-full flex flex-row items-center justify-around"
            onClick={() => updateRelayState(GPIOnumber, id, state)}
        >
            <div className="flex flex-row items-center cursor-pointer select-none">
                <MdOutlineSettingsInputAntenna className="mr-2" /> Relai {id} :
            </div>
            <div>
                <div className="switch ml-5">
                    <input type="checkbox" checked={state === 'high'} readOnly />
                    <span className="slider round"></span>
                </div>
            </div>
        </div>
    )
}

export default Switch
