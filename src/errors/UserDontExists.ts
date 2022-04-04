import { Handler } from './handler'

export class UserDontExists extends Handler {
  constructor() {
    super(404, 'User don`t exists')
  }
}
