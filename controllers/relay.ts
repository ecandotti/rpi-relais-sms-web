import fs from 'fs'
import { Gpio } from 'onoff'
import path from 'path'

import { mainRelaysList } from '../server'

import { Relay } from '../types/relay'

import { sendEmail } from '../utils/sendMail'

export const relaysPath = path.join(__dirname, '../configs/relaysState.json')

export const getRelaysState = (req: any, res: any) => {
    try {
        const data = fs.readFileSync(relaysPath, 'utf8')

        const relays = JSON.parse(data)

        return res.json({
            success: true,
            relays,
        })
    } catch (error) {
        return res.json({
            success: false,
            error,
        })
    }
}

export const updateRelayState = (req: any, res: any) => {
    const pin: number = req.body.GPIOnumber
    const relayNumber: number = req.body.relayNumber
    const state: string = req.body.state

    try {
        // Read GPIO value synchronously and write reverse value
        const read = mainRelaysList.get(pin).readSync()
        if (read === 0) {
            mainRelaysList.get(pin).writeSync(1)
        } else {
            mainRelaysList.get(pin).writeSync(0)
        }

        const data = fs.readFileSync(relaysPath, 'utf8')
        const relays: [] = JSON.parse(data)

        let newRelaysState: any[] = []

        relays.map((relay: Relay) => {
            if (relay.GPIOnumber === pin) {
                Object.keys(relay).forEach(key => {
                    if (key === 'state') {
                        relay.state = relay.state === 'low' ? 'high' : 'low'
                    }
                })
            }

            newRelaysState.push(relay)
        })

        fs.writeFileSync(relaysPath, JSON.stringify(newRelaysState))

        sendEmail(relayNumber, state)

        const newData = fs.readFileSync(relaysPath, 'utf8')
        const newRelays = JSON.parse(newData)

        return res.json({
            success: true,
            newRelays,
        })
    } catch (error) {
        return res.json({
            success: false,
            error,
        })
    }
}
