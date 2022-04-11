import dayjs from 'dayjs'

import RefreshTokenMongo from '../../src/entities/refreshToken/implementations/RefreshTokenMongo'
import { RefreshToken } from '../../src/entities/refreshToken/RefreshToken'

import { config } from 'dotenv'
config()

export const createFakeRefreshToken = async (
  userId: string,
  expiresIn?: number,
  typeExpiresIn?: string
) => {
  const typeExpires = typeExpiresIn ? typeExpiresIn : 'day'

  const newExpiresIn = dayjs().add(Number(process.env.JWT_EXPIRATION_REFRESH), typeExpires).unix()

  const obj = {
    user: userId,
    expiresIn: expiresIn ? dayjs().add(Number(expiresIn), typeExpires).unix() : newExpiresIn,
  }

  let refreshToken = new RefreshToken(obj)

  refreshToken = await RefreshTokenMongo.create(refreshToken)

  return refreshToken
}
