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

export const ContainerOrderDashboard = styled.section`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  
`;

export const ContentTable = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 20px;
  max-width: 1800px;

  h1 {
    color: white;
    text-align: center;
    margin-top: 60px;
    font-size: 22px;
  }
`;

export const ContainerCreate = styled.section`
  width: 100%;
  height: 550px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 60px;
  padding: 20px 20px;
  background-color: white;
  max-width: 1200px;
`;
