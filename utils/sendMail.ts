import fs from 'fs'
import { createTransport } from 'nodemailer'

import { userPath } from '../controllers/user'

export const sendEmail = async () => {
    const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SENDER_EMAIL_ADDRESS,
            pass: process.env.SENDER_MAIL_PASSWORD,
        },
    })

    fs.readFile(userPath, 'utf8', async (err, data) => {
        if (err) return

        const { email } = JSON.parse(data)

        try {
            await transporter.sendMail({
                from: `"Aleaderclim Bot" <${process.env.SENDER_EMAIL_ADDRESS}>`,
                to: `${email}, enzo.candotti31@gmail.com`,
                subject: 'Hello Subject✔',
                text: 'Hello plain text',
                html: '<b>Hello world?</b>',
            })

            console.log('Email sended success')
        } catch (error) {
            console.log('Error mail !')
        }
    })
}
