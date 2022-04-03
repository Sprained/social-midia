import { body, ValidationChain } from 'express-validator'
import moment from 'moment'

export const CreateUserValidation = (): ValidationChain[] => [
  body('name').exists().withMessage({ id: 'required-name', message: 'Name is required' }),
  body('email')
    .exists()
    .withMessage({ id: 'required-name', message: 'Email is required' })
    .bail()
    .isEmail()
    .withMessage({ id: 'invalid-email', message: 'Email is invalid' }),
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
  body('birthDate')
    .exists()
    .withMessage({ id: 'required-birth-date', message: 'Birth date is required' })
    .bail()
    .custom(
      (value) =>
        new Promise<void>((resolve, reject) => {
          const years = moment().diff(moment(value).toDate(), 'years')
          if (years < 18) return reject()
          return resolve()
        })
    )
    .withMessage({ id: 'minimum-age', message: 'Minimum age to use the system is 18 years old' }),
]
