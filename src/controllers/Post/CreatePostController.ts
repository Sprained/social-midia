import { Response } from 'express'

import { ICreatePostService } from '../../services/Post/ICreatePostService'
import CreatePostService from '../../services/Post/CreatePostService'

class CreatePostController {
  constructor(private postService: ICreatePostService) {}

  async handle(req, res: Response) {
    const { text, filesUrls, likes, comments } = req.body
    const { userId } = req.user

    try {
      const data = {
        text,
        filesUrls,
        likes,
        comments,
        user: userId,
      }

      await this.postService.execute(data)

      return res.status(201).send()
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new CreatePostController(CreatePostService)
