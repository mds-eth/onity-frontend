import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: auto;
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

export const ContentProducts = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 40px;
`;

export const ProductItem = styled.div`
  width: 216px;
  height: 374px;
  background-color: #ffffff;
  margin: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 6px;

  @media (max-width: 660px) {
    width: 120px;
    height: 120px;
  }
`;

export const SpaceImage = styled.div`
  width: 100%;
  height: 215px;
  display: flex;
  align-items: center;
  flex-direction: column;
  

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SpaceTitle = styled.div`
  width: 184px;
  height: 129px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

export const SpaceAddCart = styled.div`
  width: 184px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: #0095d6;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;
`;
