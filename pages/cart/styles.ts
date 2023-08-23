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

export const ContainerCart = styled.div`
  width: 100%;
  height: 600px;
  background-color: red;
  max-width: 1200px;
`;

export const ContentCart = styled.ul`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  overflow: scroll scroll;

  li:nth-child(even) {
    margin: 15px 0px;
  }
`;

export const ItemCart = styled.li`
  width: 100%;
  min-height: 130px;
  background-color: #ffffff;
  border: 1px solid #c5c5c5;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SpaceImage = styled.div`
  max-width: 80px;
  max-height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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

export const ButtonRemove = styled.button`
  width: 100%;
  min-height: 30px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: red;
  color: #ffffff;
  margin-top: 60px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 10px;
  }
`;

export const ContentActionsItem = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

