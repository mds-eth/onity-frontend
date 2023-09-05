import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #041424;
  padding: 0px 50px;

  button {
    width: 120px;
    height: 30px;
    border-radius: 8px;
    color: black;
    border: none;
    outline: none;
  }

  h1 {
    color: #ffffff;
    font-size: 14px;
  }
`;
