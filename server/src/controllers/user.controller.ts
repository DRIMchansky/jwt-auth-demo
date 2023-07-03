import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import { ApiError } from '../exceptions/api.error'

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Request validation error', errors.array()))
      }

      //

      res.json('register success')
    } catch (e) {
      next(e)
    }
  }
}

const userController = new UserController()
export { userController }
