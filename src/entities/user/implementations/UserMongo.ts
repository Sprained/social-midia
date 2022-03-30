import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const User = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    name: String,
    password: String,
    phone: { type: String, maxlength: 11, minlength: 11 },
    birthDate: Date,
    emailAuthentication: {
      code: String,
      status: { type: Boolean, default: false },
    },
    passwordRecovery: {
      code: String,
      expires: Date,
    },
  },
  {
    timestamps: true,
    collection: 'user',
  }
)

User.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 8)
  next()
})

export default mongoose.model('User', User)
