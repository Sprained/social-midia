import { Request, Response, Router } from 'express'

import CreateUserController from '../controllers/CreateUser/CreateUserController'

const routes = Router()

routes
  .route('/user')
  .post((req: Request, res: Response) => {
    return CreateUserController.handle(req, res)
  })

export default routes