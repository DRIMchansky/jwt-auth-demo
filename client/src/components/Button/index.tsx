import { ButtonHTMLAttributes } from 'react'

import { ButtonStyled } from './styles'

type Props = {
  onClick?: () => void
  children?: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ children, onClick, ...props }) => {
  return (
    <ButtonStyled onClick={onClick} {...props}>
      {children}
    </ButtonStyled>
  )
}
