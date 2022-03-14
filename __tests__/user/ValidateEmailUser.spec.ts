import { v4 as uuid } from 'uuid'
import request from 'supertest'
import mongoose from 'mongoose'

import UserMongo from '../../src/entities/user/implementations/UserMongo'

import { createFakeUser } from '../utils/User'
import { mongoServerInit } from '../utils'
import app from '../../src/app'

describe('Validate email user', () => {
  mongoServerInit()

  it('Success', async () => {
    let user = await createFakeUser(null, null, null, null, true)

    await request(app)
      .post(`/v1/user/validate/${user._id}/${user.emailAuthentication.code}`)
      .expect(204)

    user = await UserMongo.findById(user._id)

    expect(user.emailAuthentication.status).toBeTruthy()
    expect(user.emailAuthentication.code).toBeNull()
  })

  it('User not found or already activated', () => {
    const id = new mongoose.Types.ObjectId()
    const code = uuid()
    return request(app)
      .post(`/v1/user/validate/${id}/${code}`)
      .expect(404)
      .expect({ error: 'User not found or already activated' })
  })
})
