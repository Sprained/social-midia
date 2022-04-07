import { Request, Response, Router } from 'express'

import RequestRecoveryPasswordController from '../controllers/RequestRecoveryPassword/RequestRecoveryPasswordController'
import ValidateUserEmailController from '../controllers/ValidateUserEmail/ValidateUserEmailController'
import ChangePasswordController from '../controllers/ChangePassword/ChangePasswordController'
import { RequestRecoveryPasswordValidation } from '../validations/RequestRecoveryPassword'
import CreateUserController from '../controllers/CreateUser/CreateUserController'
import { ChangePasswordValidation } from '../validations/ChangePassword'
import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import { CreateUserValidation } from '../validations/CreateUser'

const routes = Router()

routes
  .route('/user')
  .post(CreateUserValidation(), validateMiddleware, (req: Request, res: Response) => {
    return CreateUserController.handle(req, res)
  })

routes.route('/user/validate/:id/:code').post((req: Request, res: Response) => {
  return ValidateUserEmailController.handle(req, res)
})

routes
  .route('/user/password/recovery')
  .post(RequestRecoveryPasswordValidation(), validateMiddleware, (req: Request, res: Response) => {
    return RequestRecoveryPasswordController.handle(req, res)
  })

routes
  .route('/user/passowrd/change')
  .post(ChangePasswordValidation(), validateMiddleware, (req: Request, res: Response) => {
    return ChangePasswordController.handle(req, res)
  })

export default routes
