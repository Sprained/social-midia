import { RefreshToken } from '../../entities/refreshToken/RefreshToken'

export interface IRefreshTokenRepository {
  save(refreshToken: RefreshToken): Promise<RefreshToken>
  deleteManyByUserId(userId: string): Promise<void>
}
