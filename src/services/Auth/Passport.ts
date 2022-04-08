import { Request, Response, NextFunction } from 'express'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { IUserRepository } from '../../repositories/User/IUserRepository'

class Passport {
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

          // if (await bcrypt.compare(data.password, user.password)) {
          //   throw new SamePassword()
          // }

          // if (!user) {
          //   return done(new ErrorHandler(401, 'Email and password combination is invalid.'))
          // }

          // const passwordMatches = await user.comparePassword(password)
          // if (passwordMatches) return done(null, user, { message: 'Signed in successfully.' })
          // return done(new ErrorHandler(401, 'Email and password combination is invalid.'))
        } catch (error) {
          // return done(new ErrorHandler(500, error.message))
        }
      }
    )
  }
}
