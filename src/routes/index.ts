import { Router } from 'express'

import Users from './Users'
import Auth from './Auth'

const routes = Router()

routes.use(Users)
routes.use(Auth)

export default routes
