import 'dotenv/config'
import express from 'express'
import { Gpio } from 'onoff'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

import routes from './routes'

import { relaysPath } from './controllers/relay'

import { Relay } from './types/relay'

// Initialisation GPIOs
const data = fs.readFileSync(relaysPath, 'utf8')
const relays: Relay[] = JSON.parse(data)

export const mainRelaysList = new Map()
mainRelaysList.set(4, new Gpio(relays[0].GPIOnumber, relays[0].state))
mainRelaysList.set(27, new Gpio(relays[1].GPIOnumber, relays[1].state))
mainRelaysList.set(22, new Gpio(relays[2].GPIOnumber, relays[2].state))
mainRelaysList.set(23, new Gpio(relays[3].GPIOnumber, relays[3].state))
mainRelaysList.set(24, new Gpio(relays[4].GPIOnumber, relays[4].state))
mainRelaysList.set(25, new Gpio(relays[5].GPIOnumber, relays[5].state))

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Provide API Server routes
routes(app)

app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

// In case of route Not Found
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found !!' })
})

// Launch WebServer
app.listen(process.env.WEBSERVER_PORT, () => {
    console.log(`🚀 Server on PORT ${process.env.WEBSERVER_PORT}`)
})
