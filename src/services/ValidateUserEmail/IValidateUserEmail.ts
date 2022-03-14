import { IValidateUserEmailDto } from '../../dto/user/ValidateUserEmail'

export interface IValidateUserEmail {
  execute(data: IValidateUserEmailDto): Promise<void>
}
