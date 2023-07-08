import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { CustomError, InputOnChangeEvent } from '../../utils/types'
import { useLoginMutation } from '../../slices/user.api.slice'
import { setCredentials } from '../../slices/auth.slice'
import { useAppDispatch } from '../../hooks'
import { InlineLink } from '../../components/InlineLink'

import { ButtonFormStyled, FormStyled, HeaderStyled, InputStyled, LabelStyled, LoginStyled } from './styles'

export const LoginPage = () => {
  const [userLogin, setUserLogin] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await login({ login: userLogin, password: userPassword }).unwrap()

      dispatch(setCredentials({ ...res }))
      navigate('/')
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.data?.message || customError.error)
    }
  }

  return (
    <LoginStyled>
      <HeaderStyled>Login page</HeaderStyled>

      <FormStyled onSubmit={submitHandler} aria-busy="false">
        <LabelStyled>
          Login
          <InputStyled
            type="text"
            value={userLogin}
            onChange={(e: InputOnChangeEvent) => setUserLogin(e.target.value)}
            autoComplete="username"
          />
        </LabelStyled>

        <LabelStyled>
          Password
          <InputStyled
            type="password"
            value={userPassword}
            onChange={(e: InputOnChangeEvent) => setUserPassword(e.target.value)}
            autoComplete="current-password"
          />
        </LabelStyled>

        <ButtonFormStyled type="submit" disabled={isLoading}>
          Log In
        </ButtonFormStyled>

        <div>Not registered? {<InlineLink to="/register">Register</InlineLink>}</div>
      </FormStyled>
    </LoginStyled>
  )
}
