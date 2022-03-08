import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

export const mongoServerInit = () => {
  let mongoServer

  beforeEach(async () => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }

    mongoServer = await MongoMemoryServer.create()
    const mongoUri = await mongoServer.getUri()
    await mongoose.connect(mongoUri).catch((err) => console.log(err))

    // done()
  })

  afterEach(async () => {
    await mongoServer.stop()
    await mongoose.connection.close()
    // done()
  })
}