import styled from "styled-components";

export const ContainerOptions = styled.ul`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  li:nth-child(even) {
    margin: 0px 20px;
  }
`;

export const OptionMenu = styled.li`
  width: 160px;
  height: 100%;
  border-radius: 12px;
  background-color: green;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;