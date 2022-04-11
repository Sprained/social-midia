import { Router } from 'express'

import Users from './Users'
import Auth from './Auth'
import Post from './Post'

const routes = Router()

routes.use(Users)
routes.use(Auth)
routes.use(Post)

export default routes
