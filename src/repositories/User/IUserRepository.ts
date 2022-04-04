import { IUpdateUserDto, IUpdateUserSearchDto } from '../../dto/user/UpdateUser'
import { IValidateUserEmailDto } from '../../dto/user/ValidateUserEmail'
import { User } from '../../entities/user/Users'

export interface IUserRepository {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
  findByEmailAndCode(data: IValidateUserEmailDto): Promise<User>
  update(search: IUpdateUserSearchDto, update: IUpdateUserDto): Promise<void>
  exists(search: IUpdateUserSearchDto): Promise<boolean>
  findByCodePassword(code: string): Promise<User>
}
