import dayjs from 'dayjs'

import RefreshTokenRepositoryMongo from '../../repositories/RefreshToken/implementations/RefreshTokenRepositoryMongo'
import { IRefreshTokenRepository } from '../../repositories/RefreshToken/IRefreshTokenRepository'
import { RefreshToken } from '../../entities/refreshToken/RefreshToken'
import { ILoginReturn, ILoginService } from './ILoginService'
import { IPassport } from './IPassport'
import Passport from './Passport'

class LoginService implements ILoginService {
  constructor(
    private passportService: IPassport,
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute(userId: string): Promise<ILoginReturn> {
    const token = await this.passportService.getToken(userId)

    let refreshToken = new RefreshToken({
      user: userId,
      expiresIn: dayjs().add(Number(process.env.JWT_EXPIRATION_REFRESH), 'day').unix(),
    })

    await this.refreshTokenRepository.deleteManyByUserId(userId)
    refreshToken = await this.refreshTokenRepository.save(refreshToken)

    return {
      accessToken: token,
      refreshToken: refreshToken._id,
    }
  }
}

export default new LoginService(Passport, RefreshTokenRepositoryMongo)
