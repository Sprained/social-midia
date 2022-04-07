import { Handler } from './handler'

export class ExpiredPasswordCode extends Handler {
  constructor() {
    super(418, 'Expired code')
  }
}
