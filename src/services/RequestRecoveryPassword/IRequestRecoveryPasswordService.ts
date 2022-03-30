import { IRequestRecoveryPasswordDto } from '../../dto/user/RequestRecoveryPassword'

export interface IRequestRecoveryPasswordService {
  execute(data: IRequestRecoveryPasswordDto): Promise<void>
}
