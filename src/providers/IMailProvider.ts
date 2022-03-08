export interface IMessage {
  email: string
  subject: string
  name: string
  code?: string
  user_id?: string
}

export interface IMailProvider {
  sendMail(message: IMessage, type: string): Promise<void>
  readFileHtml(pathAddress: string, data: {}): string
}