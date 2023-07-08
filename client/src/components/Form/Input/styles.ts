import styled from 'styled-components'

export const InputStyled = styled.input`
  display: block;
  width: 100%;
  padding: 16px;
  border: 0;
  appearance: none;
  background: none;
  box-shadow: 0 0 0 2px var(--color-form-border);
  color: var(--color-form-text);
  border-radius: 8px;
  margin-top: 5px;
  outline: 0;
  font-weight: 500;

  &:not(:disabled):hover {
    box-shadow: 0 0 0 2px var(--color-focus);
  }

  &:not(:disabled):focus {
    box-shadow: 0 0 0 4px var(--color-focus);
  }
`
