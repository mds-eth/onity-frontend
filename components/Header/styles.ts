import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #041424;
  padding: 0px 50px;

  img {
    cursor: pointer;
  }
`;

export const TextTopHeader = styled.span`
  font-weight: 600;
  color: #ffffff;
`;

export const SpaceCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: white;
    width: 28px;
    height: 28px;
  }
  .counter {
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: red;
    color: white;
    border-radius: 50%;
    margin-left: 25px;
    margin-bottom: 25px;
    font-size: 8px;
    text-align: center;
    font-weight: bold;
  }
`;
