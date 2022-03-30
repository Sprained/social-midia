import { v4 as uuid } from 'uuid'
import moment from 'moment'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'
import { IRequestRecoveryPasswordDto } from '../../dto/user/RequestRecoveryPassword'
import { IRequestRecoveryPasswordService } from './IRequestRecoveryPasswordService'
import { IUpdateUserDto, IUpdateUserSearchDto } from '../../dto/user/UpdateUser'
import MailTrapProvider from '../../providers/implementations/MailTrapProvider'
import { IUserRepository } from '../../repositories/User/IUserRepository'
import { IMailProvider } from '../../providers/IMailProvider'
import { TypeEmail } from '../../providers/mailEnums'

class RequestRecoveryPasswordService implements IRequestRecoveryPasswordService {
  constructor(private userRepository: IUserRepository, private mailProvider: IMailProvider) {}

  async execute(data: IRequestRecoveryPasswordDto): Promise<void> {
    const update: IUpdateUserDto = {
      passwordRecovery: {
        code: uuid(),
        expires: moment().add(10, 'minutes').toDate(),
      },
    }

    const search: IUpdateUserSearchDto = {
      email: data.email,
    }

    await this.userRepository.update(search, update)

    await this.mailProvider.sendMail(
      {
        email: data.email,
        subject: 'Forgot password',
        code: update.passwordRecovery.code,
      },
      TypeEmail.FORGOT_PASSWORD
    )
  }
}

export default new RequestRecoveryPasswordService(UserRepositoryMongo, MailTrapProvider)
