import { NextFunction, Response } from 'express'

import { IValidateUserEmail } from '../../services/ValidateUserEmail/IValidateUserEmail'
import ValidateUserEmail from '../../services/ValidateUserEmail/ValidateUserEmail'

class ValidateUserEmailController {
  constructor(private validateUserEmailService: IValidateUserEmail) {}

  async handle(req, res: Response, next: NextFunction) {
    const { id, code } = req.params

    try {
      await this.validateUserEmailService.execute({ id, code })

      return res.status(204).send()
    } catch (error) {
      res.status(error.statusCode).send({ error: error.message })
      next(error)
    }
  }
}

export default new ValidateUserEmailController(ValidateUserEmail)
