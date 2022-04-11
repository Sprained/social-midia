import { Request, Response, Router } from 'express'
import passport from 'passport'

import CreatePostController from '../controllers/Post/CreatePostController'

const routes = Router()

routes
  .route('/post')
  .post(passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    return CreatePostController.handle(req, res)
  })

export default routes
