import { NextFunction } from 'express';

class UserController {

  async register(req: Request, res: Response, next: NextFunction) {

    next()
  }
}

export { UserController }
