import { v4 as uuid } from 'uuid'

export class Log {
  public readonly id?: string
  public readonly _id?: string
  public statusCode: number
  public url: string
  public user?: string
  public requestBody?: Object
  public responseBody?: Object

  constructor(props: Omit<Log, 'id' | '_id' | 'body'>, id?: string, _id?: string) {
    Object.assign(this, props)

    const uid = uuid()
    if (!id) this.id = uid
  }
}
