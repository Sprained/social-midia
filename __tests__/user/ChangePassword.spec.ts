import request from 'supertest'

import { createFakeCodePassword, createFakeUser } from '../utils/User'
import { mongoServerInit } from '../utils'
import app from '../../src/app'

describe('Change Password', () => {
  mongoServerInit()
  let user
  const body: any = {
    password: 'teste@1234',
    confirmPassword: 'teste@1234',
  }

  beforeEach(async () => {
    user = await createFakeUser('teste@email.com')
    body.code = await createFakeCodePassword(user._id)
  })

  it('Success', () => {
    return request(app).post('/v1/user/passowrd/change').send(body).expect(204)
  })

  it('Password same in database', () => {
    body.password = 'teste@123'
    body.confirmPassword = 'teste@123'

    return request(app)
      .post('/v1/user/passowrd/change')
      .send(body)
      .expect(400)
      .expect({ error: 'Same Password' })
  })
})
