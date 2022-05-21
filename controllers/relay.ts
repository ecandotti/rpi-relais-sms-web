import fs from 'fs'
import path from 'path'

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
    fs.readFile(relaysPath, 'utf8', (err, data) => {
        if (err) {
            return res.json({
                success: false,
                err,
            })
        }

        const relays = JSON.parse(data)

        sendEmail()

        return res.json({
            success: true,
        })
    })
}
