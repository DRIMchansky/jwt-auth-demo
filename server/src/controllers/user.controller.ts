import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import * as userService from '../services/user.service'
import { ApiError } from '../exceptions/api.error'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Request validation error', errors.array()))
    }

    const { login, password } = req.body

    const userData = await userService.register(login, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { login, password } = req.body

    const userData = await userService.login(login, password)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')

    return res.json(token)
  } catch (e) {
    next(e)
  }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const userData = await userService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

    return res.json(userData)
  } catch (e) {
    next(e)
  }
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const userInfo = await userService.getUserInfo(refreshToken)

    return res.json(userInfo)
  } catch (e) {
    next(e)
  }
}

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const userInfo = await userService.getUserInfo(refreshToken)
    const updatedUserInfo = { ...userInfo }

    updatedUserInfo.firstName = req.body.firstName || userInfo.firstName
    updatedUserInfo.lastName = req.body.lastName || userInfo.lastName

    const user = await userService.updateUserInfo(refreshToken, updatedUserInfo)

    res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    return res.json(updatedUserInfo)
  } catch (e) {
    next(e)
  }
}
