import { register, login, verifyToken, updateContact } from '../controllers/user'
import { getRelaysState } from '../controllers/relay'

const routes = (app: any) => {
    app.route('/api/user/register').post(register)
    app.route('/api/user/login').post(login)
    app.route('/api/user/updateContact').post(updateContact)
    app.route('/api/user/verifyToken').post(verifyToken)

    app.route('/api/relay/all').get(getRelaysState)
}

export default routes
