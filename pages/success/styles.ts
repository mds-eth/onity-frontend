import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: calc(100vh - 120px);
  background-color: #dadada;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentSuccess = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TitleEvent = styled.h2`
  color: #b6a379;
  font-size: 36px;
  font-weight: 700;
  margin-top: 30px;
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: black;
  font-weight: 300;
`;

export const ContentMessage = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  flex-direction: column;

  svg {
    width: 48px;
    height: 48px;
    margin-top: 120px;
  }

  p {
    font-size: 22px;
    font-weight: 500;
    margin-top: 30px;
  }

  button {
    width: 120px;
    height: 40px;
    border: none;
    background-color: green;
    color: #ffffff;
    margin-top: 40px;
  }
`;
