import fs from 'fs'
import path from 'path'
import rpiGPIO from 'rpi-gpio'

import { sendEmail } from '../utils/sendMail'

export const relaysPath = path.join(__dirname, '../configs/relaysState.json')

export const getRelaysState = (req: any, res: any) => {
    fs.readFile(relaysPath, 'utf8', (err, data) => {
        if (err) {
            return res.json({
                success: false,
                err,
            })
        }

        const relays = JSON.parse(data)

        return res.json({
            success: true,
            relays,
        })
    })
}

export const updateRelayState = (req: any, res: any) => {
    const pin: number = req.body.GPIOnumber

    fs.readFile(relaysPath, 'utf8', (err, data) => {
        if (err) {
            return res.json({
                success: false,
                err,
            })
        }

        const relays = JSON.parse(data)

        rpiGPIO.read(pin, (err, state) => {
            if (err) {
                return res.json({
                    success: false,
                    err,
                })
            }

            if (state) {
                rpiGPIO.write(pin, false, err => {
                    if (err) {
                        return res.json({
                            success: false,
                            err,
                        })
                    }
                })
            } else {
                rpiGPIO.write(pin, true, err => {
                    if (err) {
                        return res.json({
                            success: false,
                            err,
                        })
                    }
                })
            }
        })

        // sendEmail()

        fs.readFile(relaysPath, 'utf8', (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    err,
                })
            }

            const relays = JSON.parse(data)

            return res.json({
                success: true,
                relays,
            })
        })
    })
}
