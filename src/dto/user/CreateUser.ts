export interface IUserCreateDto {
  name: string
  email: string
  password: string
  phone: string
  birthDate: Date
  confirmCode?: string
}