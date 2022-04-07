import bcrypt from 'bcryptjs'
import moment from 'moment'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'
import { IUserRepository } from '../../repositories/User/IUserRepository'
import { SamePassword } from '../../errors/ChangePassword/SamePassword'
import { ExpiredPasswordCode } from '../../errors/ExpiredPasswordCode'
import { IChangePasswordDto } from '../../dto/user/ChangePassword'
import { IChangePasswordService } from './IChangePasswordService'
import { UserDontExists } from '../../errors/UserDontExists'

class ChangePasswordService implements IChangePasswordService {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findByCodePassword(data.code)

    if (!user) {
      throw new UserDontExists()
    }

    const diffTime = moment().diff(user.passwordRecovery.expires, 'minutes')

    if (diffTime > 10) {
      throw new ExpiredPasswordCode()
    }

    if (await bcrypt.compare(data.password, user.password)) {
      throw new SamePassword()
    }

    const search = {
      'passwordRecovery.code': data.code,
    }

    const update = {
      password: data.password,
      passwordRecovery: null,
    }

    await this.userRepository.update(search, update)
  }
}

export default new ChangePasswordService(UserRepositoryMongo)
