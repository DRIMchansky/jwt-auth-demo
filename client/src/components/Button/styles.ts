import styled from 'styled-components'

export const ButtonStyled = styled.button`
  font-family: var(--font-family-primary);
  font-weight: 500;
  background: var(--color-button-bg-origin);
  padding: 15px 30px;
  border: none;
  border-radius: 15px;
  color: var(--color-button-text-origin);
  outline-offset: var(--color-focus-offset);
  outline-color: var(--color-focus);
  cursor: pointer;
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  transition: opacity var(--duration-transition);

  @media (hover: hover) {
    &:not(:disabled):hover {
      background: var(--color-button-bg-hover);
      color: var(--color-button-text-hover);
    }
  }

  &:not(:disabled):active {
    background: var(--color-button-bg-active);
    color: var(--color-button-text-active);
  }

  &:disabled {
    background: var(--color-button-bg-disabled);
    color: var(--color-button-text-disabled);
    cursor: default;
  }
`
