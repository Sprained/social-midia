import { v4 as uuid } from 'uuid'

import UserModel from '../../src/entities/user/implementations/UserMongo'
import { User } from '../../src/entities/user/Users'

export const createFakeUser = async (
  email: string,
  name?: string,
  phone?: string,
  birthDate?: Date,
  confirm?: boolean
) => {
  const emailAuthentication = {
    code: null,
    status: true,
  }
  if (confirm) {
    emailAuthentication.code = uuid()
    emailAuthentication.status = false
  }

  const obj = {
    email,
    name,
    password: 'teste@123',
    phone,
    birthDate,
    emailAuthentication,
  }

  let user = new User(obj)

  user = await UserModel.create(user)

  return user
}
