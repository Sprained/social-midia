import { NextFunction, Response } from 'express'

import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'
import { IRefreshTokenService } from '../../services/Auth/IRefreshTokenService'
import RefreshTokenService from '../../services/Auth/RefreshTokenService'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import SensitiveData from '../../utils/SensitiveData'

class RefreshTokenController {
  constructor(
    private refreshTokenService: IRefreshTokenService,
    private logRepository: ILogRepository
  ) {}

  async hendle(req, res: Response, next: NextFunction) {
    await this.logRepository.update(req.logId, {
      requestBody: SensitiveData.removeSensitveData(req.body),
    })
    const { refreshToken } = req.body

    try {
      const token = await this.refreshTokenService.execute(refreshToken)

      return res.status(200).send(token)
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new RefreshTokenController(RefreshTokenService, LogRepositoryMongo)
