import { Request, Response } from 'express'

import { IRefreshTokenService } from '../../services/Auth/IRefreshTokenService'
import RefreshTokenService from '../../services/Auth/RefreshTokenService'

class RefreshTokenController {
  constructor(private refreshTokenService: IRefreshTokenService) {}

  async hendle(req: Request, res: Response) {
    const { refreshToken } = req.body

    try {
      const token = await this.refreshTokenService.execute(refreshToken)

      return res.status(200).send(token)
    } catch (error) {
      return res.status(error.statusCode).send({ error: error.message })
    }
  }
}

export default new RefreshTokenController(RefreshTokenService)
