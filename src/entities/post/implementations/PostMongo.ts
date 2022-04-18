import mongoose from 'mongoose'

import UserMongo from '../../user/implementations/UserMongo'

const Post = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: UserMongo },
    text: String,
    filesUrls: [String],
    likes: [String],
    comments: [String],
  },
  {
    timestamps: true,
    collection: 'post',
  }
)

export default mongoose.model('Post', Post)
