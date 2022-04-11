import { Handler } from '../handler'

export class RefreshTokenExpire extends Handler {
  constructor() {
    super(400, 'Refresh token expire')
  }
}
