import { NextFunction, Response } from 'express'

import { IRequestRecoveryPasswordService } from '../../services/RequestRecoveryPassword/IRequestRecoveryPasswordService'
import RecoveryPasswordService from '../../services/RequestRecoveryPassword/RequestRecoveryPasswordService'
import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import SensitiveData from '../../utils/SensitiveData'

class RequestRecoveryPasswordController {
  constructor(
    private requestRecoveryPasswordService: IRequestRecoveryPasswordService,
    private logRepository: ILogRepository
  ) {}

  async handle(req, res: Response, next: NextFunction) {
    await this.logRepository.update(req.logId, {
      requestBody: SensitiveData.removeSensitveData(req.body),
    })
    const { email } = req.body

    try {
      await this.requestRecoveryPasswordService.execute({ email })

      return res.status(204).send()
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new RequestRecoveryPasswordController(RecoveryPasswordService, LogRepositoryMongo)
