export interface ILoginReturn {
  accessToken: string
  refreshToken: string
}

export interface ILoginService {
  execute(userId: string): Promise<ILoginReturn>
}
