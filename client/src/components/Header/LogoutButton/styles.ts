import styled from 'styled-components'

export const LogoutButtonStyled = styled.button`
  background: transparent;
  border: none;
  color: var(--color-header-text);
  transition: opacity var(--duration-transition);

  &:hover {
    cursor: pointer;
    opacity: var(--opacity-hover);
  }
`
