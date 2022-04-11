import mongoose from 'mongoose'

import UserMongo from '../../user/implementations/UserMongo'

const RefreshToken = new mongoose.Schema({
  expiresIn: Number,
  user: { type: mongoose.Types.ObjectId, ref: UserMongo },
})

export default mongoose.model('RefreshToken', RefreshToken)
