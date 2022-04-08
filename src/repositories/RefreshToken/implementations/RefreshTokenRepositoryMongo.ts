import RefreshTokenMongo from '../../../entities/refreshToken/implementations/RefreshTokenMongo'
import { RefreshToken } from '../../../entities/refreshToken/RefreshToken'
import { IRefreshTokenRepository } from '../IRefreshTokenRepository'

class RefreshTokenRepositoryMongo implements IRefreshTokenRepository {
  async save(refreshToken: RefreshToken): Promise<RefreshToken> {
    const token = await RefreshTokenMongo.create(refreshToken)

    return token
  }

  async deleteManyByUserId(userId: string): Promise<void> {
    await RefreshTokenMongo.deleteMany({ user: userId })
  }
}

export default new RefreshTokenRepositoryMongo()
