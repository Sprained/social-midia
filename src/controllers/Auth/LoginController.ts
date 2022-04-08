import { Request, Response } from 'express'

import { ILoginService } from '../../services/Auth/ILoginService'
import LoginService from '../../services/Auth/LoginService'
import { IPassport } from '../../services/Auth/IPassport'
import Passport from '../../services/Auth/Passport'

class LoginController {
  constructor(private passportService: IPassport, private loginService: ILoginService) {}

  async handle(req: Request, res: Response) {
    try {
      const user = await this.passportService.localAuthentication(req, res)

      const token = await this.loginService.execute(user._id)

      return res.status(200).send(token)
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new LoginController(Passport, LoginService)
