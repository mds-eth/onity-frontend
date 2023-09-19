import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  height: 54px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 50px;

  .message {
    span {
      color: #0095d6;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    span:nth-child(2) {
      margin-left: 15px;
    }
  }

  @media (max-width: 680px) {
    padding: 0px 20px;

    .message {
      span {
        font-size: 10px;
      }
    }
  }
`;

export const Copy = styled.p`
  font-weight: 600;
  color: #ffffff;
  font-size: 14px;
`;

export const AlertPrivate = styled.a`
  color: #8f8f8f;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  @media (max-width: 680px) {
    font-size: 10px;
  }
`;
