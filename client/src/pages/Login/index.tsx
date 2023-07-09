import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { validateLogin, validatePassword } from '../../utils/validate'
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

  const [loginApiCall, { isLoading }] = useLoginMutation()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      const res = await loginApiCall({ login: userLogin, password: userPassword }).unwrap()

      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.data?.message || customError.error)
    }
  }

  const onLoginInputChange = (e: InputOnChangeEvent) => {
    const login = e.target.value
    const validationResult = validateLogin(login)
    setUserLogin(login)
    setLoginValidateError(validationResult === true ? null : validationResult)
  }

  const onPasswordInputChange = (e: InputOnChangeEvent) => {
    const password = e.target.value
    const validationResult = validatePassword(password)
    setUserPassword(password)
    setPasswordValidateError(validationResult === true ? null : validationResult)
  }

  const validateForm = (): boolean => {
    const result = validateLogin(userLogin) && validatePassword(userPassword)
    if (!result) {
      toast.error('Please, check your login form data')
    }
    return result === true
  }

  return (
    <>
      <Headline>Login page</Headline>
      <Form onSubmit={submitHandler} aria-busy="false">
        <Label>
          Login
          <Input type="text" value={userLogin} onChange={onLoginInputChange} autoComplete="username" />
          {loginValidateError && <ErrorMessage>{loginValidateError}</ErrorMessage>}
        </Label>

        <Label>
          Password
          <Input
            type="password"
            value={userPassword}
            onChange={onPasswordInputChange}
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
