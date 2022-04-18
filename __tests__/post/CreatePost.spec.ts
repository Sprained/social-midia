import request from 'supertest'

import PostMongo from '../../src/entities/post/implementations/PostMongo'
import { createFakeToken } from '../utils/Auth'
import { createFakeUser } from '../utils/User'
import { mongoServerInit } from '../utils'
import app from '../../src/app'

describe('Create post', () => {
  mongoServerInit()
  let token: any
  let user: any

  beforeEach(async () => {
    user = await createFakeUser('teste@email.com')
    token = await createFakeToken(user._id)
  })

  it('Success', async () => {
    const data = {
      text: 'teste',
    }

    await request(app)
      .post('/v1/post')
      .set('Authorization', `Bearer ${token}`)
      .send(data)
      .expect(201)

    const post = await PostMongo.findOne({ user: user._id })
    expect(post)
  })
})
