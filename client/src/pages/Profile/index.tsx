import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useUpdateUserInfoMutation } from '../../slices/user.api.slice'
import { CustomError, InputOnChangeEvent } from '../../utils/types'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCredentials } from '../../slices/auth.slice'
import { Button } from '../../components/Form/Button'
import { Headline } from '../../components/Headline'
import { Label } from '../../components/Form/Label'
import { Input } from '../../components/Form/Input'
import { Form } from '../../components/Form'

import { ProfilerStyled } from './styles'

export const ProfilePage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const dispatch = useAppDispatch()
  const [updateUserInfoApiCall, { isLoading }] = useUpdateUserInfoMutation()

  const userInfo = useAppSelector(state => state.auth.userInfo)

  useEffect(() => {
    if (userInfo?.firstName) {
      setFirstName(userInfo?.firstName)
    }
    if (userInfo?.lastName) {
      setLastName(userInfo?.lastName)
    }
  }, [userInfo?.firstName, userInfo?.lastName])

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await updateUserInfoApiCall({ firstName, lastName }).unwrap()

      dispatch(setCredentials({ ...res }))
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.data?.message || customError.error)
    }
  }

  const onFirstNameChange = (e: InputOnChangeEvent) => {
    setFirstName(e.target.value)
  }

  const onLastNameChange = (e: InputOnChangeEvent) => {
    setLastName(e.target.value)
  }

  return (
    <ProfilerStyled>
      <Headline>Profile page</Headline>
      <Form onSubmit={submitHandler} aria-busy="false">
        <Label>
          First name
          <Input type="text" value={firstName} onChange={onFirstNameChange} autoComplete="given-name" />
        </Label>

        <Label>
          Last name
          <Input type="text" value={lastName} onChange={onLastNameChange} autoComplete="family-name" />
        </Label>

        <Button type="submit" disabled={isLoading}>
          Update info
        </Button>
      </Form>
    </ProfilerStyled>
  )
}
