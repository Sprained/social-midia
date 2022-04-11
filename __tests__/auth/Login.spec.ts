import request from 'supertest'

import { createFakeUser } from '../utils/User'
import { mongoServerInit } from '../utils'
import app from '../../src/app'

describe('Login', () => {
  mongoServerInit()
  const bodySend: any = {
    email: 'teste@email.com',
    password: 'teste@123',
  }

  it('Success', async () => {
    await createFakeUser(bodySend.email)

    const { body } = await request(app).post('/v1/login').send(bodySend).expect(200)

    expect(body.accessToken)
    expect(body.refreshToken)
  })

  it('Unauthenticate user', async () => {
    await createFakeUser(bodySend.email, null, null, null, true)

    return await request(app)
      .post('/v1/login')
      .send(bodySend)
      .expect(403)
      .expect({ error: 'User unauthenticated' })
  })
})
