import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useLogoutMutation } from '../../../slices/user.api.slice'
import { logout } from '../../../slices/auth.slice'
import { CustomError } from '../../../utils/types'
import { useAppDispatch } from '../../../hooks'

import { LogoutButtonStyled } from './styles'

type Props = {
  children?: React.ReactNode
}

export const LogoutButton: React.FC<Props> = ({ children }) => {
  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const clickHandler = async () => {
    try {
      await logoutApiCall(null).unwrap()
      dispatch(logout())
      navigate('/')
    } catch (err) {
      const customError = err as CustomError
      toast.error(customError?.data?.message || customError.error)
    }
  }

  return <LogoutButtonStyled onClick={clickHandler}>{children}</LogoutButtonStyled>
}
