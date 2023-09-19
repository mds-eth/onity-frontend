import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: auto;
  background-color: #eff0f2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 880px) {
    height: auto;
  }
`;

export const ContentHomeProducts = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  background-color: #eff0f2;
  flex-direction: column;
  margin-bottom: 60px;

  h2 {
    color: #003395;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 40px;
  }

  @media (max-width: 880px) {
    overflow: none;
  }
`;
export const Title = styled.h2`
  color: #ffffff;
  font-size: 36px;
  font-weight: 700;

  @media (max-width: 880px) {
    font-size: 28px;
    text-align: center;
    line-height: 30px;
  }
`;

export const SubTitle = styled.p`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  min-height: 374px;
  background-color: #ffffff;
  margin: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 6px;

  @media (max-width: 660px) {
    width: 100%;
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
  justify-content: flex-start;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;

  .icon {
    width: 30px;
    height: 100%;
    background-color: #1aa0da;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      font-size: 10px;
    }
  }

  @media (max-width: 660px) {
    width: 90%;
  }
`;

export const ContainerBanner = styled.section`
  width: 100%;
  height: 277px;
  background-image: url("./assets/banner.svg");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 680px) {
    padding: 0px 10px;
  }
`;
