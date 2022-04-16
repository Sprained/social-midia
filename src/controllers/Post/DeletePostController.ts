import { Response } from 'express'

import { IDeletePostService } from '../../services/Post/IDeletePostService'
import DeletePostService from '../../services/Post/DeletePostService'

class DeletePostController {
  constructor(private deletePostService: IDeletePostService) {}

  async handle(req, res: Response) {
    const { postId } = req.params
    const { userId } = req.user

    try {
      await this.deletePostService.execute({ postId, userId })

      return res.status(204).send()
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new DeletePostController(DeletePostService)
