import { NextFunction, Response } from 'express'

import { IDeletePostService } from '../../services/Post/IDeletePostService'
import DeletePostService from '../../services/Post/DeletePostService'

class DeletePostController {
  constructor(private deletePostService: IDeletePostService) {}

  async handle(req, res: Response, next: NextFunction) {
    const { postId } = req.params
    const { userId } = req.user

    try {
      await this.deletePostService.execute({ postId, userId })

      return res.status(204).send()
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new DeletePostController(DeletePostService)
