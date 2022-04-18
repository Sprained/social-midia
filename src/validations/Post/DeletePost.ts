import { param, ValidationChain } from 'express-validator'
import { isValidObjectId } from 'mongoose'

import PostRepositoryMongo from '../../repositories/Post/implementations/PostRepositoryMongo'

export const DeletePostValidation = (): ValidationChain[] => [
  param('postId')
    .exists()
    .withMessage({ id: 'post-id-name', message: 'Post id is required' })
    .bail()
    .custom(
      (value) =>
        new Promise<void>(async (resolve, reject) => {
          let exists: any
          if (isValidObjectId(value)) {
            exists = await PostRepositoryMongo.findOneById(value)
          }

          if (!exists) return reject()
          return resolve()
        })
    )
    .withMessage({ id: 'post-not-found', message: 'Post not found', statusCode: 404 }),
]
