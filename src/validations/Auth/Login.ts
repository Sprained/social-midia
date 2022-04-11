import { body, ValidationChain } from 'express-validator'

export const LoginValidation = (): ValidationChain[] => [
  body('email')
    .exists()
    .withMessage({ id: 'required-name', message: 'Email is required' })
    .bail()
    .isEmail()
    .withMessage({ id: 'invalid-email', message: 'Email is invalid' }),
  body('password')
    .exists()
    .withMessage({ id: 'required-password', message: 'Password is required' }),
]
