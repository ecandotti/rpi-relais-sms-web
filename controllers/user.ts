import fs from 'fs'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userPath = path.join(__dirname, '../configs/user.json')

export const register = (req: any, res: any) => {
    try {
        const data = fs.readFileSync(userPath, 'utf8')
        const { username, password } = JSON.parse(data)

        if (username !== '' && password !== '') {
            return res.json({
                success: false,
                message: 'Vous avez déjà défini un utilisateur.',
            })
        }

        if (req.body.username === '' && req.body.password === '') {
            return res.json({
                success: false,
                message: "Nom d'utilisateur ou mot de passe vide.",
            })
        }

        const newUser = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            phone: '',
            email: '',
        }

        fs.writeFileSync(userPath, JSON.stringify(newUser))

        return res.json({
            success: true,
            token: jwt.sign(
                {
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 10),
                    phone: '',
                    email: '',
                },
                process.env.SECRET_KEY as string,
            ),
        })
    } catch (error) {
        return res.json({
            success: false,
            error,
        })
    }
}

export const login = (req: any, res: any) => {
    try {
        const data = fs.readFileSync(userPath, 'utf8')
        const { username, password, phone, email } = JSON.parse(data)

        if (username === '' && password === '') {
            return res.json({
                success: false,
                message: "Vous n'avez pas défini d'utilisateur",
            })
        }

        if (!bcrypt.compareSync(req.body.password, password)) {
            return res.json({
                success: false,
                message: 'Identifiant ou mot de passe incorect.',
            })
        }

        return res.json({
            success: true,
            token: jwt.sign({ username, password, phone, email }, process.env.SECRET_KEY as string),
        })
    } catch (error) {
        return res.json({
            success: false,
            error,
        })
    }
}

export const updateContact = (req: any, res: any) => {
    try {
        const data = fs.readFileSync(userPath, 'utf8')
        const { username, password } = JSON.parse(data)

        const updateUser = {
            username,
            password,
            phone: req.body.newPhone,
            email: req.body.newMail,
        }

        fs.writeFileSync(userPath, JSON.stringify(updateUser))

        return res.json({
            success: true,
            token: jwt.sign(
                {
                    username,
                    password,
                    phone: req.body.newPhone,
                    email: req.body.newMail,
                },
                process.env.SECRET_KEY as string,
            ),
        })
    } catch (error) {
        return res.json({
            success: false,
            error,
        })
    }
}

export const verifyToken = (req: any, res: any) => {
    jwt.verify(req.body.token, process.env.SECRET_KEY as string, (err: any, user: any) => {
        if (err) return res.json({ success: false })

        return res.json({ success: true })
    })
}

export const loginRequired = (req: any, res: any, next: any) => {
    if (req.user) next()
    else return res.status(401).json({ message: 'Unauthorized user !' })
}
