import { Request, Response } from 'express'

import { ICreateUser } from '../../services/CreateUser/ICreateUser'
import CreateUser from '../../services/CreateUser/CreateUser'

class CreateUserController {
  constructor(
    private createUserService: ICreateUser
  ) {}

  async handle(req: Request, res: Response) {
    const { name, email, password, phone, birthDate } = req.body

    try {
      await this.createUserService.execute({
        name, email, password, phone, birthDate
      })
  
      return res.status(201).send()
    } catch (error) {
      return res.status(error.statusCode).send({ 'error': error.message })
    }
  }
}

export default new CreateUserController(
  CreateUser
)