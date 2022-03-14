import UserMongo from '../../../entities/user/implementations/UserMongo'

import { IValidateUserEmailDto } from '../../../dto/user/ValidateUserEmail'
import { IUserRepository } from '../IUserRepository'
import { User } from '../../../entities/user/Users'

class UserRepositoryMongo implements IUserRepository {
  async save(user: User): Promise<void> {
    await UserMongo.create(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await UserMongo.findOne({ email })

    return user
  }

  async findByEmailAndCode(data: IValidateUserEmailDto): Promise<User> {
    const emailAuthentication = {
      code: data.code,
      status: false,
    }

    const newEmailAuthentication = {
      code: null,
      status: true,
    }

    const user = await UserMongo.findOneAndUpdate(
      { _id: data.id, emailAuthentication },
      { emailAuthentication: newEmailAuthentication }
    )

    return user
  }
}

export default new UserRepositoryMongo()
