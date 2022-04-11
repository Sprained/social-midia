import { v4 as uuid } from 'uuid'

export class Post {
  public readonly id: string
  public readonly _id: string
  public user: string
  public text?: string
  public filesUrls?: string[]
  public likes?: string[]
  public comments?: string[]

  constructor(props: Omit<Post, 'id' | '_id'>, id?: string, _id?: string) {
    Object.assign(this, props)

    const uid = uuid()
    if (!id) this.id = uid
  }
}
