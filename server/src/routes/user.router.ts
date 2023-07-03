import { Router } from 'express'
import { register } from '../controllers/user.controller'
import { body } from 'express-validator'

const userRouter = Router()

userRouter.post(
  '/register',
  body('login').isLength({ min: 5, max: 30 }),
  body('password').isLength({ min: 5, max: 30 }),
  register
)

export { userRouter }
