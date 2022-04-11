import { body, ValidationChain } from 'express-validator'

export const RefreshTokenValidation = (): ValidationChain[] => [
  body('refreshToken')
    .exists()
    .withMessage({ id: 'required-refresh-token', message: 'Refresh token is required' }),
]
