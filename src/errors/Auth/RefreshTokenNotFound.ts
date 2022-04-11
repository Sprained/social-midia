import { Handler } from '../handler'

export class RefreshTokenNotFound extends Handler {
  constructor() {
    super(404, 'Refresh token not found')
  }
}
