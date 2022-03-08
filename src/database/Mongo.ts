import mongoose from 'mongoose'

class Database {
  private mongoConnection

  constructor() {
    this.mongo()
  }

  mongo() {
    if(process.env.NODE_ENV !== 'test')
      this.mongoConnection = mongoose.connect(
        process.env.MONGO_URI
      )
  }
}

export default new Database()