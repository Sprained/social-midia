import request from 'supertest'

import { mongoServerInit } from '../utils'
import app from '../../src/app'
import { createFakeUser } from '../utils/User'
import moment from 'moment'

describe('Create User', () => {
  mongoServerInit()
  const body = {
    email: 'teste@email.com',
    name: 'teste',
    password: 'teste@123',
    confirmPassword: 'teste@123',
    phone: '81999999999',
    birthDate: '2000-01-01',
  }

  it('Success', () => {
    return request(app).post('/v1/user').send(body).expect(201)
  })

  it('Conflit email', async () => {
    await createFakeUser(body.email)

    return request(app)
      .post('/v1/user')
      .send(body)
      .expect(409)
      .expect({ error: 'Email already in use' })
  })

  it('Password not equal', () => {
    body.confirmPassword = 'teste@12'

    return request(app)
      .post('/v1/user')
      .send(body)
      .expect(422)
      .expect({
        message: 'There are validation errors.',
        field_errors: {
          confirmPassword: [
            {
              id: 'password-not-equal',
              message: 'Passwords are not the same',
            },
          ],
        },
      })
  })

  it('Minimum age', () => {
    body.confirmPassword = 'teste@123'
    body.birthDate = moment().format('YYYY-MM-DD')

    return request(app)
      .post('/v1/user')
      .send(body)
      .expect(422)
      .expect({
        message: 'There are validation errors.',
        field_errors: {
          birthDate: [
            {
              id: 'minimum-age',
              message: 'Minimum age to use the system is 18 years old',
            },
          ],
        },
      })
  })
})
