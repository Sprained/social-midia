export interface IEmailAuthentication {
  code?: string
  status?: boolean
}

export interface IUserCreateDto {
  name: string
  email: string
  password: string
  phone: string
  birthDate: Date
  emailAuthentication?: IEmailAuthentication
}

export interface IPasswordRecovery {
  code: string
  expires: Date
}
