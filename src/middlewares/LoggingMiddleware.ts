import { NextFunction, Response } from 'express'

import LogRepositoryMongo from '../repositories/Log/implementations/LogRepositoryMongo'
import { ValidationErrorHandler } from '../errors/ValidationError'
import { Log } from '../entities/log/Logs'
import { Handler } from '../errors/handler'

class LoggingMiddleware {
  async log(req, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'test') return next()

    let log: Log = {
      statusCode: res.statusCode,
      url: req.url,
    }

    if (req.user) log.user = req.user

    log = new Log(log)
    log = await LogRepositoryMongo.save(log)
    req.logId = log._id ? log._id : log.id

    next()
  }

  async error(err: ValidationErrorHandler | Handler, req, res: Response, next: NextFunction) {
    if (process.env.NODE_ENV === 'test') return next()

    if (err) {
      const log: any = {
        stautsCode: err.statusCode,
      }

      if (err instanceof ValidationErrorHandler) {
        log.responseBody = { message: err.message, field_errors: err.fieldErrors }
      }

      if (err instanceof Handler) {
        log.responseBody = { message: err.message }
      }

      await LogRepositoryMongo.update(req.logId, log)
    }

    delete req.logId
    next()
  }
}

export default new LoggingMiddleware()
