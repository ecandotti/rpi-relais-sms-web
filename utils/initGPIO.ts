import fs from 'fs'
import rpiGPIO from 'rpi-gpio'

import { Relay } from '../types/relay'

import { relaysPath } from '../controllers/relay'

export const initGPIO = () => {
    // Passage en mode BCM
    rpiGPIO.setMode('mode_bcm')

    fs.readFile(relaysPath, 'utf8', (err, data) => {
        if (err) return

        const relays: [] = JSON.parse(data)

        relays.map((relay: Relay) => {
            rpiGPIO.setup(relay.GPIOnumber, relay.state)
        })
    })
}
