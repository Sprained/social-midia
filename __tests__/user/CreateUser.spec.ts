import request from 'supertest'

import { mongoServerInit } from "../utils"
import app from '../../src/app'
import { createFakeUser } from '../utils/User'

describe('Create User', () => {
  mongoServerInit()
  const body = {
    email: 'teste@email.com',
    name: 'teste',
    password: 'teste@123',
    phone: '81999999999',
    birthDate: '12/12/2012'
  }

  it('Success', () => {
    return request(app)
      .post('/v1/user')
      .send(body)
      .expect(201)
  })

  it('Conflit email', async () => {
    await createFakeUser(body.email)

    return request(app)
      .post('/v1/user')
      .send(body)
      .expect(409)
      .expect({ error: 'Email already in use' })
  })
})