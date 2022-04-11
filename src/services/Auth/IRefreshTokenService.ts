import { ILoginReturn } from './ILoginService'

export interface IRefreshTokenService {
  execute(refreshToken: string): Promise<ILoginReturn>
}
