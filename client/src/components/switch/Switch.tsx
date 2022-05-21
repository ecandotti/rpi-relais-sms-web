import React, { useState } from 'react'
import { MdOutlineSettingsInputAntenna } from 'react-icons/md'

import './switch.css'

type Props = {
    relay: {
        number: number
        state: boolean
    }
}

const Switch: React.FC<Props> = ({ relay }) => {
    const [stateValue, setStateValue] = useState(relay.state)

    return (
        <div className="w-full mb-5 flex flex-row items-center justify-around">
            <div
                className="flex flex-row items-center cursor-pointer select-none"
                onClick={() => setStateValue(!stateValue)}
            >
                <MdOutlineSettingsInputAntenna className="mr-2" /> Relai {relay.number}:
            </div>
            <div onClick={() => setStateValue(!stateValue)} className="z-50">
                <label className="switch ml-5">
                    <input type="checkbox" checked={stateValue} readOnly />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default Switch
