import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const InlineLinkStyled = styled(Link)`
  color: var(--color-blue-300);
  font-weight: 700;
  text-decoration: none;
  outline-offset: var(--color-focus-offset);
  border-radius: 15px;
  transition: opacity var(--duration-transition);

  &:hover {
    opacity: var(--opacity-hover);
  }
`
