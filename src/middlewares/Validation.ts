import { ValidationError, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

import { ErrorExpressValidation } from '../errors/ErrorExpressValidation'

const parseErrors = (errors: ValidationError[]) => {
  const dict = {}

  errors.forEach((e) => {
    if (!!dict[e.param]) {
      if (!dict[e.param].find((singleError: { id: string }) => singleError.id === e.msg.id)) {
        dict[e.param].push(e.msg)
      }
    } else {
      dict[e.param] = [e.msg]
    }
  })

  return dict
}

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors: ValidationError[] = validationResult(req).array()

    if (errors.length > 0) throw new ErrorExpressValidation(parseErrors(errors))

    next()
  } catch (error) {
    if (error instanceof ErrorExpressValidation) {
      res.status(error.statusCode).send({ message: error.message, field_errors: error.fieldErrors })
    } else {
      res.status(500).send({ message: error?.message ?? 'Internal Error' })
    }
  }
}
