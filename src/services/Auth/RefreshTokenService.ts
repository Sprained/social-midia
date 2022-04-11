import dayjs from 'dayjs'

import RefreshTokenRepositoryMongo from '../../repositories/RefreshToken/implementations/RefreshTokenRepositoryMongo'
import { IRefreshTokenRepository } from '../../repositories/RefreshToken/IRefreshTokenRepository'
import { RefreshTokenNotFound } from '../../errors/Auth/RefreshTokenNotFound'
import { RefreshTokenExpire } from '../../errors/Auth/RefreshTokenExpire'
import { RefreshToken } from '../../entities/refreshToken/RefreshToken'
import { IRefreshTokenService } from './IRefreshTokenService'
import { ILoginReturn } from './ILoginService'
import { IPassport } from './IPassport'
import Passport from './Passport'

class RefreshTokenService implements IRefreshTokenService {
  constructor(
    private refreshTokenRepository: IRefreshTokenRepository,
    private passportService: IPassport
  ) {}

  async execute(refreshToken: string): Promise<ILoginReturn> {
    const refresh = await this.refreshTokenRepository.findById(refreshToken)

    if (!refresh) {
      throw new RefreshTokenNotFound()
    }

    const isAfter = dayjs().isAfter(dayjs.unix(refresh.expiresIn))

    if (isAfter) {
      throw new RefreshTokenExpire()
    }
    const token = await this.passportService.getToken(refresh.user)

    await this.refreshTokenRepository.deleteManyByUserId(refresh.user)

    let newRefreshToken = new RefreshToken({
      user: refresh.user,
      expiresIn: dayjs().add(Number(process.env.JWT_EXPIRATION_REFRESH), 'day').unix(),
    })

    newRefreshToken = await this.refreshTokenRepository.save(newRefreshToken)

    return {
      accessToken: token,
      refreshToken: newRefreshToken._id,
    }
  }
}

export default new RefreshTokenService(RefreshTokenRepositoryMongo, Passport)
