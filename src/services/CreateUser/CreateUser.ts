import { v4 as uuid } from 'uuid'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'
import MailTrapProvider from '../../providers/implementations/MailTrapProvider'
import { IUserRepository } from '../../repositories/User/IUserRepository'
import { FieldAreadyInUse } from '../../errors/FieldAlreadyInUse'
import { IMailProvider } from '../../providers/IMailProvider'
import { IUserCreateDto } from '../../dto/user/CreateUser'
import { TypeEmail } from '../../providers/mailEnums'
import { User } from '../../entities/user/Users'
import { ICreateUser } from './ICreateUser'

class CreateUser implements ICreateUser {
  constructor(
    private userRepository: IUserRepository,
    private mailProvader: IMailProvider
  ) {}

  async execute(data: IUserCreateDto) {
    const userEmail = await this.userRepository.findByEmail(data.email)

    if(userEmail) {
      throw new FieldAreadyInUse('Email')
    }

    const emailAuthentication = {
      code: uuid()
    }
    data.emailAuthentication = emailAuthentication
    const user = new User(data)

    await this.userRepository.save(user)

    await this.mailProvader.sendMail(
      {
        email: data.email,
        subject: 'Confirme seu e-mail',
        code: data.emailAuthentication.code,
        name: data.name
      },
      TypeEmail.CONFIRM
    )
  }
}

export default new CreateUser(
  UserRepositoryMongo,
  MailTrapProvider
)