import { css } from 'styled-components'

export default css`
  :root {
    --color-white: #fff;
    --color-black: #000;
    --color-blue-300: #166dfc;
    --color-blue-500: #003399;
    --color-red-400: #e55241;
    --color-dark-400: #1e222e;
    --color-gray-100: #fdfdfd;
    --color-gray-400: #afb2c4;
    --color-gray-900: #1c3653;

    --color-focus: var(--color-blue-300);
    --color-focus-offset: 3px;

    --color-button-bg-origin: var(--color-blue-300);
    --color-button-bg-hover: var(--color-blue-500);
    --color-button-bg-active: var(--color-dark-400);
    --color-button-bg-disabled: var(--color-gray-900);
    --color-button-text-origin: var(--color-gray-100);
    --color-button-text-hover: var(--color-gray-400);
    --color-button-text-active: var(--color-gray-400);
    --color-button-text-disabled: var(--color-gray-900);

    --color-header-bg: var(--color-blue-300);
    --color-header-text: var(--color-gray-100);

    --color-form-text: var(--color-dark-400);
    --color-form-border: var(--color-dark-400);
  }
`
