import { Handler } from '../handler'

export class SamePassword extends Handler {
  constructor() {
    super(400, 'Same Password')
  }
}
