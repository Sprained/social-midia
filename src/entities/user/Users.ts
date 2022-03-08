import { v4 as uuid } from 'uuid'

export class User {
  public readonly id: string
  public readonly _id: string
  public name: string
  public email: string
  public password: string
  public phone: string
  public birthDate: Date
  public confirmCode?: string

  constructor(props: Omit<User, 'id'|'_id'>, id?: string, _id?: string) {
    Object.assign(this, props)

    const uid = uuid()
    if(!id) this.id = uid
  }
}