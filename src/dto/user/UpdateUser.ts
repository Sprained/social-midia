import { IPasswordRecovery } from './CreateUser'

interface IEmailAuthentication {
  code?: string
  status: boolean
}

export interface IUpdateUserSearchDto {
  _id?: string
  email?: string
  name?: string
  phone?: string
  birthDate?: Date
  emailAuthentication?: IEmailAuthentication
  codeRecovery?: string
  createdAt?: Date
  updatedAt?: Date
  passwordRecovery?: IPasswordRecovery
}

export interface IUpdateUserDto {
  email?: string
  name?: string
  phone?: string
  birthDate?: Date
  emailAuthentication?: IEmailAuthentication
  passwordRecovery?: IPasswordRecovery
  password?: string
}
