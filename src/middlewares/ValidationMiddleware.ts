import { ValidationError, validationResult } from 'express-validator'
import { NextFunction, Request, Response } from 'express'

import { ValidationErrorHandler } from '../errors/ValidationError'

const parseErrors = (errors: ValidationError[]) => {
  const dict = {}
  let statusCode = 422

  errors.forEach((e) => {
    if (!!dict[e.param]) {
      if (!dict[e.param].find((singleError: { id: string }) => singleError.id === e.msg.id)) {
        dict[e.param].push({ id: e.msg.id, message: e.msg.message })
        if (e.msg.statusCode) statusCode = e.msg.statusCode
      }
    } else {
      dict[e.param] = [{ id: e.msg.id, message: e.msg.message }]
      if (e.msg.statusCode) statusCode = e.msg.statusCode
    }
  })

  return {
    errors: dict,
    statusCode,
  }
}

export const validateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors: ValidationError[] = validationResult(req).array()

    const parseError = parseErrors(errors)
    if (errors.length > 0)
      throw new ValidationErrorHandler(parseError.errors, parseError.statusCode)

    next()
  } catch (error) {
    if (error instanceof ValidationErrorHandler) {
      res.status(error.statusCode).send({ message: error.message, field_errors: error.fieldErrors })
      next(error)
    } else {
      res.status(500).send({ message: error?.message ?? 'Internal Error' })
    }
  }
}
