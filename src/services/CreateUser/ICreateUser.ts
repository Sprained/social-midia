import { IUserCreateDto } from '../../dto/user/CreateUser'

export interface ICreateUser {
  execute(data: IUserCreateDto): Promise<void>
}