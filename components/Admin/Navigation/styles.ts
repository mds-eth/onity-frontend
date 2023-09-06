import styled from "styled-components";

export const ContainerOptions = styled.ul`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  li:nth-child(even) {
    margin: 0px 20px;
  }
`;

export const OptionMenu = styled.li`
  width: 160px;
  height: 100%;
  border-radius: 8px;
  background-color: green;
  color: #ffffff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkgreen; 
  }
`;
