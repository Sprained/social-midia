import { Request, Response } from 'express'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import UserRepositoryMongo from '../../repositories/User/implementations/UserRepositoryMongo'
import { UserAndPasswordWrong } from '../../errors/Auth/UserAndPasswordWrong'
import { UserUnauthenticated } from '../../errors/Auth/UserUnouthenticated'
import { IUserRepository } from '../../repositories/User/IUserRepository'
import { Handler } from '../../errors/handler'
import { IPassport } from './IPassport'

class Passport implements IPassport {
  jwtOpts = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  constructor(private userRepository: IUserRepository) {}

  async passport() {
    const localStrategy = new passportLocal.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (
        req,
        username: string,
        password: string,
        done: (error: Error, user?: object, options?: passportLocal.IVerifyOptions) => void
      ) => {
        try {
          const user = await this.userRepository.findByEmail(username)

          if (!user) {
            return done(new UserAndPasswordWrong())
          }

          if (!(await bcrypt.compare(password, user.password))) {
            return done(new UserAndPasswordWrong())
          }

          return done(null, user, { message: 'Signed in successfully.' })
        } catch (error) {
          return done(new Handler(500, error.message))
        }
      }
    )

    const jwtStrategy = new passportJwt.Strategy(
      this.jwtOpts,
      async (payload: { _id: string }, done: passportJwt.VerifiedCallback) => {
        return done(null, payload)
      }
    )

    passport.use(localStrategy)
    passport.use(jwtStrategy)
  }

  async localAuthentication(req: Request, res: Response): Promise<any> {
    const promise = await new Promise((resolve, reject) => {
      passport.authenticate('local', { session: false }, async (err, user, info) => {
        if (err) return reject(err)

        if (!user) return reject(new UserAndPasswordWrong())

        if (!user.emailAuthentication.status) return reject(new UserUnauthenticated())

        return resolve(user)
      })(req, res)
    })

    return promise
  }

  async getToken(user_id: string): Promise<string> {
    const token = jwt.sign(
      {
        user_id: user_id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    )

    return token
  }
}

export default new Passport(UserRepositoryMongo)
