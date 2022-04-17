import request from 'supertest'

import { createFakeToken } from '../utils/Auth'
import { createFakeUser } from '../utils/User'
import { createFakePost } from '../utils/Post'
import { mongoServerInit } from '../utils'
import app from '../../src/app'
import mongoose from 'mongoose'

describe('Delete post', () => {
  mongoServerInit()
  let token: any
  let user: any

  beforeEach(async () => {
    user = await createFakeUser('teste@email.com')
    token = await createFakeToken(user._id)
  })

  it('Not found post', () => {
    const id = new mongoose.Types.ObjectId()

    return request(app)
      .delete(`/v1/post/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect({
        message: 'There are validation errors.',
        field_errors: {
          postId: [
            {
              id: 'post-not-found',
              message: 'Post not found',
            },
          ],
        },
      })
  })

  it('Success', async () => {
    const { _id } = await createFakePost(user._id)
    return request(app)
      .delete(`/v1/post/${_id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  })
})
