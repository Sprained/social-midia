import { Handler } from '../handler'

export class UserUnauthenticated extends Handler {
  constructor() {
    super(403, 'User unauthenticated')
  }
}
