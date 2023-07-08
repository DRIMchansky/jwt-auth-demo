import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { LOGIN_MAX_LENGTH, LOGIN_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../../utils/constants'
import { CustomError, InputOnChangeEvent } from '../../utils/types'
import { ErrorMessage } from '../../components/Form/ErrorMessage'
import { useLoginMutation } from '../../slices/user.api.slice'
import { InlineLink } from '../../components/InlineLink'
import { setCredentials } from '../../slices/auth.slice'
import { Button } from '../../components/Form/Button'
import { Headline } from '../../components/Headline'
import { Label } from '../../components/Form/Label'
import { Input } from '../../components/Form/Input'
import { Form } from '../../components/Form'
import { useAppDispatch } from '../../hooks'

export const LoginPage = () => {
  const [userLogin, setUserLogin] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const [loginValidateError, setLoginValidateError] = useState<string | null>(null)
  const [passwordValidateError, setPasswordValidateError] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const res = await login({ login: userLogin, password: userPassword }).unwrap()

      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.data?.message || customError.error)
    }
  }

  const validateLogin = (): boolean => {
    if (userLogin.length < LOGIN_MIN_LENGTH) {
      setLoginValidateError('Login is too short')
      return false
    } else if (userLogin.length > LOGIN_MAX_LENGTH) {
      setLoginValidateError('Login is too long')
      return false
    } else {
      setLoginValidateError(null)
    }

    return true
  }

  const validatePassword = (): boolean => {
    if (userPassword.length < PASSWORD_MIN_LENGTH) {
      setPasswordValidateError('Password is too short')
      return false
    } else if (userPassword.length > PASSWORD_MAX_LENGTH) {
      setPasswordValidateError('Password is too long')
      return false
    } else {
      setPasswordValidateError(null)
    }

    return true
  }

  const validateForm = (): boolean => {
    const result = validateLogin() && validatePassword()
    if (!result) {
      toast.error('Please, check your login form data')
    }
    return result
  }

  return (
    <>
      <Headline>Login page</Headline>
      <Form onSubmit={submitHandler} aria-busy="false">
        <Label>
          Login
          <Input
            type="text"
            value={userLogin}
            onChange={(e: InputOnChangeEvent) => {
              setUserLogin(e.target.value)
              validateLogin()
            }}
            autoComplete="username"
          />
          {loginValidateError && <ErrorMessage>{loginValidateError}</ErrorMessage>}
        </Label>

        <Label>
          Password
          <Input
            type="password"
            value={userPassword}
            onChange={(e: InputOnChangeEvent) => {
              setUserPassword(e.target.value)
              validatePassword()
            }}
            autoComplete="current-password"
          />
          {passwordValidateError && <ErrorMessage>{passwordValidateError}</ErrorMessage>}
        </Label>

        <Button type="submit" disabled={isLoading}>
          Log In
        </Button>

        <div>Not registered? {<InlineLink to="/register">Register</InlineLink>}</div>
      </Form>
    </>
  )
}
