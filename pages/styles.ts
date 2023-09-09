import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: calc(100vh - 120px);
  background-color: #dadada;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 880px) {
    padding: 0px 20px;
    height: auto;
  }
`;

export const ContentHomeProducts = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  background-color: #dadada;
  flex-direction: column;
  margin-bottom: 60px;
 

  @media (max-width: 880px) {
    overflow: none;
  }
`;

export const TitleEvent = styled.h2`
  color: #b6a379;
  font-size: 36px;
  font-weight: 700;
  margin-top: 30px;

  @media (max-width: 880px) {
    font-size: 28px;
    text-align: center;
    line-height: 30px;
  }
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: black;
  font-weight: 300;
  text-align: center;
  margin-top: 20px;
`;

export const ContentProducts = styled.ul`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ProductItem = styled.li`
  width: 160px;
  height: 160px;
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

  @media (max-width: 660px) {
    width: 120px;
    height: 120px;
  }
`;

export const NameProduct = styled.h3`
  font-size: 16px;
  color: black;
  margin-bottom: 20px;
`;
