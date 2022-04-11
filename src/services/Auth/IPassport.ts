import { Request, Response } from 'express'

export interface IPassport {
  passport(): Promise<void>
  localAuthentication(req: Request, res: Response): Promise<any>
  getToken(user_id: string): Promise<string>
}
