import { Request, Response } from 'express'

import { IChangePasswordService } from '../../services/ChangePassword/IChangePasswordService'
import ChangePasswordService from '../../services/ChangePassword/ChangePasswordService'

class ChangePasswordController {
  constructor(private changePasswordService: IChangePasswordService) {}

  async handle(req: Request, res: Response) {
    const { password, code } = req.body

    try {
      await this.changePasswordService.execute({ password, code })

      return res.status(204).send()
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new ChangePasswordController(ChangePasswordService)
