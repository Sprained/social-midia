import { Handler } from './handler'

export class FieldAreadyInUse extends Handler {
  constructor(field: string) {
    super(409, `${field} already in use`)
  }
}
