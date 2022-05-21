import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import routes from './routes'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Provide API Server routes
routes(app)

// In case of route Not Found
app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found !!' })
})

// Launch WebServer
app.listen(process.env.WEBSERVER_PORT, () => {
    console.log(`🚀 Server on PORT ${process.env.WEBSERVER_PORT}`)
})