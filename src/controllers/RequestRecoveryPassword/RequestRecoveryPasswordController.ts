import { Request, Response } from 'express'

import { IRequestRecoveryPasswordService } from '../../services/RequestRecoveryPassword/IRequestRecoveryPasswordService'
import RecoveryPasswordService from '../../services/RequestRecoveryPassword/RequestRecoveryPasswordService'

class RequestRecoveryPasswordController {
  constructor(private requestRecoveryPasswordService: IRequestRecoveryPasswordService) {}

  async handle(req: Request, res: Response) {
    const { email } = req.body

    try {
      await this.requestRecoveryPasswordService.execute({ email })

      return res.status(204).send()
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new RequestRecoveryPasswordController(RecoveryPasswordService)
