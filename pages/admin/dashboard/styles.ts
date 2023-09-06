import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100vh;
  background: #000000;
  background: -webkit-linear-gradient(to right, #434343, #000000);
  background: linear-gradient(to right, #434343, #000000);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
export const ContainerListDashboard = styled.ul`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 60px 0px;

  li:nth-child(even) {
    margin: 0px 20px;
  }
`;

export const ItemDashboard = styled.li`
  width: 180px;
  height: 180px;
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  h3 {
    font-size: 18px;
  }

  h4 {
    margin-top: 20px;
    font-weight: 700;
    font-size: 48px;
  }
`;
