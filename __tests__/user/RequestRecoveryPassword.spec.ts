import request from 'supertest'

import { mongoServerInit } from '../utils'
import { createFakeUser } from '../utils/User'
import app from '../../src/app'

jest.setTimeout(10000)

describe('Request Recovery Password', () => {
  mongoServerInit()
  const body = {
    email: 'teste@email.com',
  }

  beforeEach(async () => {
    await createFakeUser(body.email)
  })

  it('Success', () => {
    return request(app).post('/v1/user/password/recovery').send(body).expect(204)
  })

  it('Email not exist', () => {
    body.email = 'teste1@email.com'

    return request(app)
      .post('/v1/user/password/recovery')
      .send(body)
      .expect(422)
      .expect({
        message: 'There are validation errors.',
        field_errors: {
          email: [
            {
              id: 'email-not-exist',
              message: 'Email doesn`t exist',
            },
          ],
        },
      })
  })
})
