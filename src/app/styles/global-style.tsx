import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
:root {
  --max-width: 1100px;
  --border-radius: 12px;
  --primary-color: #fcaa52;
  --color-orange-XL: #ffefd5;
  --color-gray-XL: #f7f7f7;
  --color-gray-M: #a8a8b3;
  --color-gray-XD: #545454;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  background-color: var( --color-gray-XL);
  color: var(--color-gray-XD);
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
`
