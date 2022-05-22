import React from 'react'
import { MdOutlineSettingsInputAntenna } from 'react-icons/md'

import { Relay } from '../../types/relay'

import './switch.css'

type Props = {
    relay: Relay
    updateRelayState: (GPIOnumber: number) => Promise<void>
}

const Switch: React.FC<Props> = ({ relay, updateRelayState }) => {
    const { id, GPIOnumber, state } = relay

    return (
        <div
            className="w-full mb-5 flex flex-row items-center justify-around"
            onClick={() => updateRelayState(GPIOnumber)}
        >
            <div className="flex flex-row items-center cursor-pointer select-none">
                <MdOutlineSettingsInputAntenna className="mr-2" /> Relai {id} :
            </div>
            <div className="z-50">
                <div className="switch ml-5">
                    <input type="checkbox" checked={state === 'high'} readOnly />
                    <span className="slider round"></span>
                </div>
            </div>
        </div>
    )
}

export default Switch
