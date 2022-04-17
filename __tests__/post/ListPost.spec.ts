import request from 'supertest'

import { createFakeToken } from '../utils/Auth'
import { createFakeUser } from '../utils/User'
import { createFakePost } from '../utils/Post'
import { mongoServerInit } from '../utils'
import app from '../../src/app'
import mongoose from 'mongoose'

describe('List posts', () => {
  mongoServerInit()
  let token: any
  let user: any

  beforeEach(async () => {
    user = await createFakeUser('teste@email.com')
    token = await createFakeToken(user._id)
  })

  it('List post with a single post', async () => {
    await createFakePost(user._id)

    const { body } = await request(app)
      .get(`/v1/post?page=0&limit=15`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const meta = body.meta
    expect(meta.currentPage).toBe(0)
    expect(meta.currentCount).toBe(15)
    expect(meta.totalCount).toBe(1)
    expect(meta.totalPage).toBe(1)
    expect(meta.itensInPage).toBe(1)

    expect(body.results.length).toBe(1)
  })

  it('List post without post', async () => {
    const { body } = await request(app)
      .get(`/v1/post?page=0&limit=15`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const meta = body.meta
    expect(meta.currentPage).toBe(0)
    expect(meta.currentCount).toBe(15)
    expect(meta.totalCount).toBe(0)
    expect(meta.totalPage).toBe(0)
    expect(meta.itensInPage).toBe(0)

    expect(body.results.length).toBe(0)
  })
})
