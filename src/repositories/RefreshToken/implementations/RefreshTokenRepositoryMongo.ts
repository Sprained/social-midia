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

  async findById(refreshTokenId: string): Promise<RefreshToken> {
    const token = await RefreshTokenMongo.findById(refreshTokenId)

    return token
  }
}

export default new RefreshTokenRepositoryMongo()
