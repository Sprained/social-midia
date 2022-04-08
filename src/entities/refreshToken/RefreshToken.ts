import { v4 as uuid } from 'uuid'

export class RefreshToken {
  public readonly id: string
  public readonly _id: string
  public expiresIn: number
  public user: string

  constructor(props: Omit<RefreshToken, 'id' | '_id'>, id?: string, _id?: string) {
    Object.assign(this, props)

    const uid = uuid()
    if (!id) this.id = uid
  }
}
