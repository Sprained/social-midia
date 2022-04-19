import { NextFunction, Request, Response, Router } from 'express'

import RefreshTokenController from '../controllers/Auth/RefreshTokenController'
import { RefreshTokenValidation } from '../validations/Auth/RefreshToken'
import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import LoginController from '../controllers/Auth/LoginController'
import { LoginValidation } from '../validations/Auth/Login'

const routes = Router()

routes
  .route('/login')
  .post(
    LoginValidation(),
    validateMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      return LoginController.handle(req, res, next)
    }
  )

routes
  .route('/login/refresh')
  .post(
    RefreshTokenValidation(),
    validateMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      return RefreshTokenController.hendle(req, res, next)
    }
  )

export default routes
