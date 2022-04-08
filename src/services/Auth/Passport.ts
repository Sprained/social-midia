import { Request, Response, NextFunction } from 'express'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { UserAndPasswordWrong } from '../../errors/Auth/UserAndPasswordWrong'
import { IUserRepository } from '../../repositories/User/IUserRepository'

class Passport {
  jwtOpts = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }

  constructor(private userRepository: IUserRepository) {}

  async passport(req, res: Response) {
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
            throw new UserAndPasswordWrong()
          }

          if (!(await bcrypt.compare(password, user.password))) {
            throw new UserAndPasswordWrong()
          }

          return done(null, user, { message: 'Signed in successfully.' })
        } catch (error) {
          return res.status(error.statusCode).send({ error: error.message })
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
}
