import bcrypt from 'bcrypt'

import { findToken, generateTokens, removeToken, saveToken, validateRefreshToken } from './token.service'
import { UserInfoPublic, UserModel } from '../models/user.model'
import { ApiError } from '../exceptions/api.error'

export const register = async (login: string, password: string) => {
  if (await UserModel.findOne({ login })) {
    throw ApiError.BadRequest('User already exists')
  }

  const passwordHash = await bcrypt.hash(password, 3)

  const user = await UserModel.create({ login, password: passwordHash })
  const userInfo = user.getPublicInfo()

  const tokens = generateTokens(userInfo)
  await saveToken(userInfo.id, tokens.refreshToken)

  return { ...tokens, user: userInfo }
}

export const login = async (login: string, password: string) => {
  const user = await UserModel.findOne({ login })
  if (!user) {
    throw ApiError.BadRequest('User not found')
  }

  const isPassEquals = await bcrypt.compare(password, user.password)
  if (!isPassEquals) {
    throw ApiError.BadRequest('Wrong password')
  }

  const userInfo = user.getPublicInfo()

  const tokens = generateTokens({ ...userInfo })
  await saveToken(userInfo.id, tokens.refreshToken)

  return { ...tokens, user: userInfo }
}

export const logout = async (refreshToken: string) => {
  const token = await removeToken(refreshToken)
  return token
}

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userDataToken = validateRefreshToken(refreshToken)
  const tokenFromDb = await findToken(refreshToken)
  if (!userDataToken || !tokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await UserModel.findById(userDataToken.id)

  const userInfo = user.getPublicInfo()
  const tokens = generateTokens({ ...userInfo })

  await saveToken(userInfo.id, tokens.refreshToken)

  return { ...tokens, user: userInfo }
}

export const getUserInfo = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userDataToken = validateRefreshToken(refreshToken)
  const tokenFromDb = await findToken(refreshToken)
  if (!userDataToken || !tokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await UserModel.findById(userDataToken.id)
  const userInfo = user.getPublicInfo()

  return userInfo
}

export const updateUserInfo = async (refreshToken: string, userDataUpdated: UserInfoPublic) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userDataToken = validateRefreshToken(refreshToken)
  const tokenFromDb = await findToken(refreshToken)
  if (!userDataToken || !tokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await UserModel.findById(userDataToken.id)
  user.updatePublicInfo(userDataUpdated)
  await user.save()

  const userInfo = user.getPublicInfo()
  const tokens = generateTokens({ ...userInfo })

  await saveToken(userInfo.id, tokens.refreshToken)

  return { ...tokens, user: userInfo }
}
