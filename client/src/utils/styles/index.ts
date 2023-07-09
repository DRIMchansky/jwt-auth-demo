import { createGlobalStyle } from 'styled-components'

import normalize from './normalize'
import colors from './colors'
import fonts from './fonts'

export const GlobalStyles = createGlobalStyle`
  ${fonts}
  ${colors}
  ${normalize}

  :root {
    --opacity-hover: 0.8;
    --duration-transition: 0.1s;
  }

  body {
    font-family: var(--font-family-primary);
  }
`
