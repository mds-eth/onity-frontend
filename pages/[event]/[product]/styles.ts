import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: calc(100vh - 120px);
  background-color: #dadada;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentHomeProducts = styled.div`
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
  margin-top: 20px;
`;

export const ContentProducts = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
`;

export const ProductItem = styled.div`
  width: 320px;
  max-width: 30%;
  height: 320px;
  background-color: #f3f3f3;
  margin: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 12px;
  cursor: pointer;
  border-radius: 50%;

  img {
    border-radius: 50%;
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const NameProduct = styled.h1`
  font-size: 28px;
  color: black;
  margin-bottom: 20px;
`;

export const ContentDetailtProduct = styled.div`
  width: 70%;
  height: 100%;
  padding: 30px 30px;
  display: flex;
  flex-direction: column;
`;

export const DescriptionProduct = styled.p`
  font-size: 22px;
  color: black;
  margin-bottom: 15px;
`;

export const ButtonAddCart = styled.button`
  width: 100%;
  height: 70px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background-color: green;
  color: #ffffff;
  margin-top: 60px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }
`;

export const PriceProduct = styled.span`
  font-size: 24px;
  color: black;
  margin-bottom: 15px;
`;
