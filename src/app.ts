import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import LoggingMiddleware from './middlewares/LoggingMiddleware'
import Passport from './services/Auth/Passport'
import { Database } from './database'
import routes from './routes'

class App {
  server: any

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()

    Database

    Passport.passport()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(LoggingMiddleware.log)
  }

  routes() {
    this.server.use('/v1', routes)
    this.server.use(LoggingMiddleware.error)
  }
}

export default new App().server
