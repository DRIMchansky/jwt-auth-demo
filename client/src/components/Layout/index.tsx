import { LayoutStyled } from './styles'

type Props = {
  children?: React.ReactNode
}

export const Layout: React.FC<Props> = ({ children }) => {
  return <LayoutStyled>{children}</LayoutStyled>
}
