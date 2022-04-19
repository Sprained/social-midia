import { NextFunction, Response } from 'express'

import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'
import { ICreatePostService } from '../../services/Post/ICreatePostService'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import CreatePostService from '../../services/Post/CreatePostService'
import SensitiveData from '../../utils/SensitiveData'

class CreatePostController {
  constructor(private postService: ICreatePostService, private logRepository: ILogRepository) {}

  async handle(req, res: Response, next: NextFunction) {
    await this.logRepository.update(req.logId, {
      requestBody: SensitiveData.removeSensitveData(req.body),
    })
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
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new CreatePostController(CreatePostService, LogRepositoryMongo)
