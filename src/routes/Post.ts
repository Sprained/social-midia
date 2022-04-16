import { Request, Response, Router } from 'express'
import passport from 'passport'

import CreatePostController from '../controllers/Post/CreatePostController'
import DeletePostController from '../controllers/Post/DeletePostController'
import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import { DeletePostValidation } from '../validations/Post/DeletePost'

const routes = Router()

routes
  .route('/post')
  .post(passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    return CreatePostController.handle(req, res)
  })

routes
  .route('/post/:postId')
  .delete(
    passport.authenticate('jwt', { session: false }),
    DeletePostValidation(),
    validateMiddleware,
    (req: Request, res: Response) => {
      return DeletePostController.handle(req, res)
    }
  )

export default routes
