import UserMongo from '../../../entities/user/implementations/UserMongo'
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
}

export default new UserRepositoryMongo