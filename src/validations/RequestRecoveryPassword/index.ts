import { body, ValidationChain } from 'express-validator'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'

export const RequestRecoveryPasswordValidation = (): ValidationChain[] => [
  body('email')
    .exists()
    .withMessage({ id: 'required-email', message: 'Email is required' })
    .bail()
    .isEmail()
    .withMessage({ id: 'invalid-email', message: 'Email is invalid' })
    .bail()
    .custom(
      (value) =>
        new Promise<void>(async (resolve, reject) => {
          const exists = await UserRepositoryMongo.exists({ email: value })
          exists ? resolve() : reject()
        })
    )
    .withMessage({ id: 'email-not-exist', message: 'Email doesn`t exist' }),
]
