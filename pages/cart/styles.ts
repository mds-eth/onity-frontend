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

export const SpaceMeio = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  justify-self: start;
  text-align: flex-start;

  &.count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90px;
    flex-direction: row;

    .total{
      font-size: 10px;
    }

    .less,
    .more,
    .total {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #1c1c1c;
      cursor: pointer;
    }
  }

  input {
    width: 50px;
    height: 28px;
    border: none;
  }
`;

export const ContainerCart = styled.div`
  width: 100%;
  height: 480px;
  max-width: 1200px;
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
`;

export const ContentCart = styled.ul`
  width: 49%;
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
  min-height: 100px;
  border: 1px solid #c5c5c5;
  padding: 10px 30px;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 1fr;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  align-items: center;
  gap: 5px;
`;

export const SpaceImage = styled.div`
  width: 100px;
  max-height: 100%;
  border-radius: 50%;
  justify-self: start;

  img {
    width: 60%;
    height: 60%;
    object-fit: cover;
    border-radius: 50%;
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
  width: 40px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background-color: red;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentActionsItem = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: end;
`;

export const ContentForm = styled.div`
  width: 49%;
  height: 100%;
  border: 1px solid #c5c5c5;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px;
`;

export const HeaderForm = styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormCart = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  .error {
    border: 1px solid red;
  }

  input {
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 0px 10px;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  div {
    display: flex;
    flex-direction: column;
    width: 50%;
  }

  input,
  select {
    width: 98%;
    height: 30px;
    border: none;
    border-radius: 6px;
    outline: none;
    padding: 0px 10px;
  }
`;

export const FooterForm = styled.footer`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;

export const Submit = styled.button`
  width: 120px;
  height: 100%;
  background-color: green;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
