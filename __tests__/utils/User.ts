import { v4 as uuid } from 'uuid'
import moment from 'moment'

import UserModel from '../../src/entities/user/implementations/UserMongo'
import { IUpdateUserDto } from '../../src/dto/user/UpdateUser'
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

export const createFakeCodePassword = async (user_id) => {
  const update: IUpdateUserDto = {
    passwordRecovery: {
      code: uuid(),
      expires: moment().add(10, 'minutes').toDate(),
    },
  }

  await UserModel.findOneAndUpdate({ _id: user_id }, update)

  return update.passwordRecovery.code
}
