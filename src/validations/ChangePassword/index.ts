import { body, ValidationChain } from 'express-validator'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'

export const ChangePasswordValidation = (): ValidationChain[] => [
  body('password')
    .exists()
    .withMessage({ id: 'required-password', message: 'Password is required' }),
  body('confirmPassword')
    .exists()
    .withMessage({ id: 'required-password', message: 'Confirm password is required' })
    .bail()
    .custom(
      (value, { req }) =>
        new Promise<void>((resolve, reject) => {
          if (value !== req.body.password) return reject()
          return resolve()
        })
    )
    .withMessage({ id: 'password-not-equal', message: 'Passwords are not the same' }),
  body('code').exists().withMessage({ id: 'code-password', message: 'Code is required' }),
]
