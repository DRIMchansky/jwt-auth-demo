import styled from 'styled-components'

import { Button } from '../../components/Button'

export const LoginStyled = styled.div``

export const HeaderStyled = styled.h1`
  font-size: var(--font-size-headline);
  line-height: var(--line-height-headline);
  color: var(--color-form-text);
`

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border: 2px solid var(--color-form-border);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  font-weight: 500;
`

export const LabelStyled = styled.label`
  width: 100%;
  font-size: var(--font-size-l);
  line-height: var(--line-height-l);
  font-weight: 500;
  color: var(--color-form-text);
`

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

export const ButtonFormStyled = styled(Button)`
  padding: 15px 40px;
`
