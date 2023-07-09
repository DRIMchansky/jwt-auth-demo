import { Router } from 'express'
import { getUserInfo, login, logout, refresh, register, updateUserInfo } from '../controllers/user.controller'
import { body } from 'express-validator'

export const userRouter = Router()

userRouter.post(
  '/register',
  body('login').isLength({ min: 5, max: 30 }),
  body('password').isLength({ min: 5, max: 30 }),
  register
)

userRouter.post('/login', login)

userRouter.post('/logout', logout)

userRouter.get('/refresh', refresh)

userRouter.get('/userinfo', getUserInfo)

userRouter.put('/userinfo', updateUserInfo)
