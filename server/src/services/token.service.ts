import jwt from 'jsonwebtoken'
import { TokenModel } from '../models/token.model'

type Payload = string | Buffer | object

export const generateTokens = (payload: Payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

  return { accessToken, refreshToken }
}

export const validateAccessToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return payload
  } catch (e) {
    return null
  }
}

export const validateRefreshToken = (token: string): jwt.JwtPayload => {
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return payload as jwt.JwtPayload
  } catch (e) {
    return null
  }
}

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await TokenModel.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  const token = await TokenModel.create({ user: userId, refreshToken })
  return token
}

export const removeToken = async (refreshToken: string) => {
  const tokenData = await TokenModel.deleteOne({ refreshToken })
  return tokenData
}

export const findToken = async (refreshToken: string) => {
  const tokenData = await TokenModel.findOne({ refreshToken })
  return tokenData
}
