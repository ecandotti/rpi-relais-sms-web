import fs from 'fs'
import { createTransport } from 'nodemailer'

import { userPath } from '../controllers/user'

export const sendEmail = async () => {
    const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SENDER_EMAIL_ADRESS,
            pass: process.env.SENDER_MAIL_PASSWORD,
        },
    })

    let recipientMail = ''

    fs.readFile(userPath, 'utf8', (err, data) => {
        if (err) return

        recipientMail = JSON.parse(data).email
    })

    try {
        await transporter.sendMail({
            from: `"Aleaderclim Bot" <${process.env.SENDER_EMAIL_ADRESS}>`,
            to: `${recipientMail}, enzo.candotti31@gmail.com`,
            subject: 'Hello Subject✔',
            text: 'Hello plain text',
            html: '<b>Hello world?</b>',
        })

        console.log('Email sended success')
    } catch (error) {
        console.log('Error mail !')
    }
}
