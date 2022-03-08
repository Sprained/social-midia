import 'dotenv/config'

import express from 'express'
import cors from 'cors'

import routes from './routes'
import { Database } from './database'

class App {
  server: any

  constructor() {
    this.server = express()
    
    this.middlewares()
    this.routes()

    Database
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