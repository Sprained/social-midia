import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'
import { IUserRepository } from '../../repositories/User/IUserRepository'
import { IValidateUserEmailDto } from '../../dto/user/ValidateUserEmail'
import { IValidateUserEmail } from './IValidateUserEmail'
import { Handler } from '../../errors/handler'

class ValidateUSerEmail implements IValidateUserEmail {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: IValidateUserEmailDto): Promise<void> {
    const user = await this.userRepository.findByEmailAndCode(data)

    if (!user) {
      throw new Handler(404, 'User not found or already activated')
    }
  }
}

export default new ValidateUSerEmail(UserRepositoryMongo)
