import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { CustomError, InputOnChangeEvent } from '../../utils/types'
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
    <>
      <Headline>Login page</Headline>
      <Form onSubmit={submitHandler} aria-busy="false">
        <Label>
          Login
          <Input
            type="text"
            value={userLogin}
            onChange={(e: InputOnChangeEvent) => setUserLogin(e.target.value)}
            autoComplete="username"
          />
        </Label>

        <Label>
          Password
          <Input
            type="password"
            value={userPassword}
            onChange={(e: InputOnChangeEvent) => setUserPassword(e.target.value)}
            autoComplete="current-password"
          />
        </Label>

        <Button type="submit" disabled={isLoading}>
          Log In
        </Button>

        <div>Not registered? {<InlineLink to="/register">Register</InlineLink>}</div>
      </Form>
    </>
  )
}
