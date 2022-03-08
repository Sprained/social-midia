import { Router } from 'express'

import Users from './Users'

const routes = Router()

routes.use(Users)

export default routes