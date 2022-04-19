import { NextFunction, Response } from 'express'

import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import { ILoginService } from '../../services/Auth/ILoginService'
import LoginService from '../../services/Auth/LoginService'
import { IPassport } from '../../services/Auth/IPassport'
import SensitiveData from '../../utils/SensitiveData'
import Passport from '../../services/Auth/Passport'

class LoginController {
  constructor(
    private passportService: IPassport,
    private loginService: ILoginService,
    private logRepository: ILogRepository
  ) {}

  async handle(req, res: Response, next: NextFunction) {
    try {
      const user = await this.passportService.localAuthentication(req, res)

      const token = await this.loginService.execute(user._id)

      res.status(200).send(token)

      await this.logRepository.update(req.logId, {
        requestBody: SensitiveData.removeSensitveData(req.body),
      })
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new LoginController(Passport, LoginService, LogRepositoryMongo)
