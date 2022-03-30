import { Response } from 'express'

import { IValidateUserEmail } from '../../services/ValidateUserEmail/IValidateUserEmail'
import ValidateUserEmail from '../../services/ValidateUserEmail/ValidateUserEmail'

class ValidateUserEmailController {
  constructor(private validateUserEmailService: IValidateUserEmail) {}

  async handle(req, res: Response) {
    const { id, code } = req.params

    try {
      await this.validateUserEmailService.execute({ id, code })

      return res.status(204).send()
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new ValidateUserEmailController(ValidateUserEmail)
