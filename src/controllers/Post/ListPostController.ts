import { NextFunction, Response } from 'express'

import { IListPostService } from '../../services/Post/IListPostService'
import ListPostService from '../../services/Post/ListPostService'
import Pagination from '../../utils/Pagination'

class ListPostController {
  constructor(private listPostService: IListPostService) {}

  async handle(req, res: Response, next: NextFunction) {
    const { page = 0, limit = 15 } = req.query

    try {
      const post = await this.listPostService.execute({ page, limit })

      const result = Pagination.metrics(post.results, post.count, page, limit)

      return res.status(200).send(result)
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new ListPostController(ListPostService)
