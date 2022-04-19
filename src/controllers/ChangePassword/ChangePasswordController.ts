import { NextFunction, Response } from 'express'

import { IChangePasswordService } from '../../services/ChangePassword/IChangePasswordService'
import ChangePasswordService from '../../services/ChangePassword/ChangePasswordService'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import SensitiveData from '../../utils/SensitiveData'
import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'

class ChangePasswordController {
  constructor(
    private changePasswordService: IChangePasswordService,
    private logRepository: ILogRepository
  ) {}

  async handle(req, res: Response, next: NextFunction) {
    const { password, code } = req.body

    try {
      await this.changePasswordService.execute({ password, code })

      res.status(204).send()
      await this.logRepository.update(req.logId, {
        requestBody: SensitiveData.removeSensitveData(req.body),
      })
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new ChangePasswordController(ChangePasswordService, LogRepositoryMongo)
