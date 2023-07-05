import { css } from 'styled-components'

export default css`
  @font-face {
    font-family: 'Open Sans';
    src: url('assets/fonts/OpenSans-VariableFont_wdth,wght.ttf') format('truetype');
    font-style: normal;
    font-display: swap;
  }

  :root {
    --font-family-primary: 'Open Sans', sans-serif;

    --font-size-s: 12px;
    --line-height-s: 18px;

    --font-size-m: 14px;
    --line-height-m: 20px;

    --font-size-l: 14px;
    --line-height-l: 20px;

    --font-size-xl: 16px;
    --line-height-xl: 24px;

    --font-size-xxl: 16px;
    --line-height-xxl: 24px;

    --font-size-headline: 22px;
    --line-height-headline: 30px;
  }
`
