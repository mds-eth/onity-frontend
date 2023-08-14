import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  min-height: 330px;
  height: auto;
  background-image: url("./img/background-offers.jpeg");
  display: flex;
  flex-direction: column;

  #container-form {
    background: none !important;
  }
`;

export const ContainerListOffers = styled.ul`
  width: 100%;
  min-height: 500px;
  height: auto;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0px 150px;
  margin-bottom: 60px;

  @media (max-width: 800px) {
    padding: 0px 20px;
  }
`;

export const ContainerNotContent = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 28px;
    font-family: Estricta Bold, Arial, sans-serif;
  }
`;

export const ContainerLi = styled.li`
  width: 45%;
  height: 320px;
  max-height: 380px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid #666666;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 100%;
    max-height: 250px;
  }
`;

export const ContentTextOffer = styled.div`
  width: 100%;
  height: 80px;
  background: #0a2d82;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageOffer = styled.img`
  width: 100%;
  height: 300px;
  max-height: 300px;
`;

export const TextOffer = styled.h2`
  font-size: 22px;
  color: #ffffff;
  font-family: Estricta Bold, Arial, sans-serif;
  text-align: center;

  @media (max-width: 800px) {
    font-size: 16px;
  }
`;
