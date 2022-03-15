import { Request, Response, Router } from 'express'

import ValidateUserEmailController from '../controllers/ValidateUserEmail/ValidateUserEmailController'
import CreateUserController from '../controllers/CreateUser/CreateUserController'

const routes = Router()

routes.route('/user').post((req: Request, res: Response) => {
  return CreateUserController.handle(req, res)
})

routes.route('/user/validate/:id/:code').post((req: Request, res: Response) => {
  return ValidateUserEmailController.handle(req, res)
})

export default routes
