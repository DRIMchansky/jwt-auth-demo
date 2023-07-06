import { createGlobalStyle } from 'styled-components'

import normalize from './normalize'
import colors from './colors'
import fonts from './fonts'

export const GlobalStyles = createGlobalStyle`
  ${fonts}
  ${colors}
  ${normalize}

  body {
    font-family: var(--font-family-primary);
  }
`
