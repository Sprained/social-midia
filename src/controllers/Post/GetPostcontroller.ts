import { Response } from 'express'

import { IGetPostService } from '../../services/Post/IGetPostService'
import GetPostService from '../../services/Post/GetPostService'

class GetPostController {
  constructor(private getPostService: IGetPostService) {}

  async handle(req, res: Response, next) {
    const { postId } = req.params

    try {
      const post = await this.getPostService.execute(postId)

      return res.status(200).send(post)
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new GetPostController(GetPostService)
