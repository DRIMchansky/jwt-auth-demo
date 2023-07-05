import { ButtonStyled } from './styles'

type Props = {
  onClick: () => void
  children?: React.ReactNode
}

export const Button: React.FC<Props> = props => {
  return (
    <ButtonStyled type="button" onClick={props.onClick}>
      {props.children}
    </ButtonStyled>
  )
}
