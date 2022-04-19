import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'

import CreatePostController from '../controllers/Post/CreatePostController'
import DeletePostController from '../controllers/Post/DeletePostController'
import { validateMiddleware } from '../middlewares/ValidationMiddleware'
import ListPostController from '../controllers/Post/ListPostController'
import { DeletePostValidation } from '../validations/Post/DeletePost'
import GetPostcontroller from '../controllers/Post/GetPostcontroller'
import { GetPostValidation } from '../validations/Post/GetPost'

const routes = Router()

routes
  .route('/post')
  .post(
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
      return CreatePostController.handle(req, res, next)
    }
  )
  .get(
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
      return ListPostController.handle(req, res, next)
    }
  )

routes
  .route('/post/:postId')
  .delete(
    passport.authenticate('jwt', { session: false }),
    DeletePostValidation(),
    validateMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      return DeletePostController.handle(req, res, next)
    }
  )
  .get(
    passport.authenticate('jwt', { session: false }),
    GetPostValidation(),
    validateMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      return GetPostcontroller.handle(req, res, next)
    }
  )

export default routes
