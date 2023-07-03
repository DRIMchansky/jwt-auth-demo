import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { body } from 'express-validator'

const userRouter = Router()

userRouter.post(
  '/register',
  body('login').isLength({ min: 5, max: 30 }),
  body('password').isLength({ min: 5, max: 30 }),
  userController.register
)

export { userRouter }
