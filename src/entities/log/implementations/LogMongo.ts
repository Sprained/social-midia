import mongoose from 'mongoose'

import UserMongo from '../../user/implementations/UserMongo'

const log = new mongoose.Schema(
  {
    statusCode: Number,
    url: String,
    user: { type: mongoose.Types.ObjectId, ref: UserMongo },
    requestBody: Object,
    responseBody: Object,
  },
  {
    timestamps: true,
    collection: 'log',
  }
)

export default mongoose.model('Log', log)
