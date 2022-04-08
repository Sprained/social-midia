import { Handler } from '../handler'

export class UserAndPasswordWrong extends Handler {
  constructor() {
    super(401, 'Email or password invalid')
  }
}
