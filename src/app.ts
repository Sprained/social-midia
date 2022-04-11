import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import { Database } from './database'
import routes from './routes'
import Passport from './services/Auth/Passport'

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
  }

  routes() {
    this.server.use('/v1', routes)
  }
}

export default new App().server
