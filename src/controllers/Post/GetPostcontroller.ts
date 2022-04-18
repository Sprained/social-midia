import { Response } from 'express'

import { IGetPostService } from '../../services/Post/IGetPostService'
import GetPostService from '../../services/Post/GetPostService'

class GetPostController {
  constructor(private getPostService: IGetPostService) {}

  async handle(req, res: Response) {
    const { postId } = req.params

    try {
      const post = await this.getPostService.execute(postId)

      return res.status(200).send(post)
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new GetPostController(GetPostService)
