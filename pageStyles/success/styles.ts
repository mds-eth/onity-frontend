import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: auto;
  background-color: #eff0f2;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 880px) {
    padding: 0px 20px;
  }
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

  @media (max-width: 880px) {
    font-size: 28px;
    text-align: center;
  }
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
    @media (max-width: 880px) {
      text-align: center;
    }
  }

  button {
    width: 120px;
    height: 40px;
    border: none;
    background-color: #0095d6;
    color: #ffffff;
    margin-top: 40px;
  }
`;
