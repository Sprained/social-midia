import { NextFunction, Response } from 'express'

import LogRepositoryMongo from '../../repositories/Log/implementations/LogRepositoryMongo'
import { ILogRepository } from '../../repositories/Log/ILogRepository'
import { ICreateUser } from '../../services/CreateUser/ICreateUser'
import CreateUser from '../../services/CreateUser/CreateUser'
import SensitiveData from '../../utils/SensitiveData'

class CreateUserController {
  constructor(private createUserService: ICreateUser, private logRepository: ILogRepository) {}

  async handle(req, res: Response, next: NextFunction) {
    const { name, email, password, phone, birthDate } = req.body

    try {
      await this.createUserService.execute({
        name,
        email,
        password,
        phone,
        birthDate,
      })

      res.status(201).send()
      await this.logRepository.update(req.logId, {
        requestBody: SensitiveData.removeSensitveData(req.body),
      })
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new CreateUserController(CreateUser, LogRepositoryMongo)
