import request from 'supertest'
import mongoose from 'mongoose'

import { createFakeRefreshToken } from '../utils/Auth'
import { createFakeUser } from '../utils/User'
import { mongoServerInit } from '../utils'
import app from '../../src/app'

describe('Refresh token', () => {
  mongoServerInit()
  let user

  beforeEach(async () => {
    user = await createFakeUser('teste@email.com')
  })

  it('Success', async () => {
    const { _id: token } = await createFakeRefreshToken(user._id)

    const sendBody = {
      refreshToken: token,
    }

    const { body } = await request(app).post('/v1/login/refresh').send(sendBody).expect(200)

    expect(body.accessToken)
    expect(body.refreshToken)
  })

  it('Refresh token not found', () => {
    const sendBody = {
      refreshToken: new mongoose.Types.ObjectId(),
    }

    return request(app).post('/v1/login/refresh').send(sendBody).expect(404).expect({
      error: 'Refresh token not found',
    })
  })

  it('Refresh token expire', async () => {
    const { _id: token } = await createFakeRefreshToken(user._id, 1, 'millisecond')

    const sendBody = {
      refreshToken: token,
    }

    return request(app).post('/v1/login/refresh').send(sendBody).expect(400).expect({
      error: 'Refresh token expire',
    })
  })
})
