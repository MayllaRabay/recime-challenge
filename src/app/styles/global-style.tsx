import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
:root {
  --max-width: 960px;
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
  cursor: default;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: fit-content;
  width: 100vw;
}

@media (max-width: 720px) {
  html {
    font-size: 87.5%; //14px
  }
}

@media (max-width: 480px) {
  html {
    font-size: 75%; //12px 
  }
  }

`
