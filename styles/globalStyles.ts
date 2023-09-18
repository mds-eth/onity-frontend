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
    background-color: #DADADA;
  }

  a {
    text-decoration: none;
    color: #007bff;
  }

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
