import { IChangePasswordDto } from '../../dto/user/ChangePassword'

export interface IChangePasswordService {
  execute(data: IChangePasswordDto): Promise<void>
}
