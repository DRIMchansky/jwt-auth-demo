import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 60px;
  background: var(--color-header-bg);
  color: var(--color-header-text);

  --color-focus: var(--color-header-text);
`

export const LogoStyled = styled(Link)`
  display: inline;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid var(--color-header-text);
  color: var(--color-header-text);
  text-decoration: none;
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  outline-offset: var(--color-focus-offset);
  outline-color: var(--color-focus);
  transition: opacity var(--duration-transition);

  &:hover {
    opacity: var(--opacity-hover);
  }
`

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--color-header-text);
  padding: 10px;
  border-radius: 15px;
  transition: opacity var(--duration-transition);

  &:hover {
    opacity: var(--opacity-hover);
  }

  &:focus {
    outline-color: var(--color-focus);
  }

  &:not(:last-child) {
    margin-right: 15px;
  }
`
