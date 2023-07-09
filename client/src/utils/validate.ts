import { LOGIN_MAX_LENGTH, LOGIN_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from './constants'

export const validateLogin = (login: string): true | string => {
  if (login.length < LOGIN_MIN_LENGTH) {
    return 'Login is too short'
  } else if (login.length > LOGIN_MAX_LENGTH) {
    return 'Login is too long'
  }

  return true
}

export const validatePassword = (password: string): true | string => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return 'Password is too short'
  } else if (password.length > PASSWORD_MAX_LENGTH) {
    return 'Password is too long'
  }

  return true
}
