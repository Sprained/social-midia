import { Request, Response, Router } from 'express'

import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import LoginController from '../controllers/Auth/LoginController'
import { LoginValidation } from '../validations/Auth/Login'

const routes = Router()

routes
  .route('/login')
  .post(LoginValidation(), validateMiddleware, (req: Request, res: Response) => {
    return LoginController.handle(req, res)
  })

export default routes
