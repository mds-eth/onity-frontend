import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
    border-radius: 6px;
    outline: none;
  }

  @media screen and (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  html, body {
    height: 100%;
  }

  #__next {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;
