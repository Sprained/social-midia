import UserModel from '../../src/entities/user/implementations/UserMongo'
import { User } from '../../src/entities/user/Users'

export const createFakeUser = async (
  email: string,
  name?: string,
  phone?: string,
  birthDate?: Date,
  confirm?: boolean,
) => {
  const confirmCode = confirm ? 'teste' : null

  const obj = {
    email,
    name,
    password: 'teste@123',
    phone,
    birthDate,
    confirmCode
  }

  const user = new User(obj)

  await UserModel.create(user)
}