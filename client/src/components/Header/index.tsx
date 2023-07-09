import { useAppSelector } from '../../hooks'
import { LogoutButton } from './LogoutButton'

import { HeaderStyled, LinkStyled, LogoStyled } from './styles'

export const Header: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.auth)

  return (
    <HeaderStyled>
      <LogoStyled to="/">Logo</LogoStyled>

      <div>
        {userInfo ? (
          <>
            <LinkStyled to="/profile">Profile</LinkStyled>
            <LogoutButton>Log Out</LogoutButton>
          </>
        ) : (
          <>
            <LinkStyled to="/login">Log In</LinkStyled>
            <LinkStyled to="/register">Register</LinkStyled>
          </>
        )}
      </div>
    </HeaderStyled>
  )
}
