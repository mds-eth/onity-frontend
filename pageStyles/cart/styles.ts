import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: auto;
  background-color: #eff0f2;
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

  @media (max-width: 880px) {
    font-size: 28px;
    text-align: center;
  }
`;

export const SubTitle = styled.p`
  font-size: 18px;
  color: black;
  font-weight: 300;
  margin-top: 20px;
`;

export const SpaceMeio = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px;

  span {
    color: #1d1d1c;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
  @media (max-width: 880px) {
    span {
      font-size: 12px;
    }
  }
`;

export const ContainerCart = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 60px;
  display: flex;
  margin-bottom: 60px;
  flex-direction: column;

  h2 {
    color: #003395;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 15px;
  }

  @media (max-width: 880px) {
    height: auto;
  }
`;

export const ContentCart = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  overflow: scroll scroll;
  max-height: 200px;

  @media (max-width: 880px) {
    width: 100%;
  }
`;

export const ItemCart = styled.li`
  width: 100%;
  max-height: 100px;
  min-height: 100px;
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  margin: 10px 0px;
`;

export const SpaceImage = styled.div`
  width: 100px;
  height: 100%;

  img {
    width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  @media (max-width: 880px) {
    width: 80px;
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

export const ButtonRemove = styled.div`
  min-height: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  span {
    color: #0095d6;
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 10px;
  }
`;

export const ContentActionsItem = styled.div`
  width: 150px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-self: end;

  @media (max-width: 880px) {
    width: 100px;
  }

  .count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 130px;
    height: 100%;
    flex-direction: row;
    margin-right: 20px;

    @media(max-width: 680px){
      margin-right: 40px;
    }

    input {
      text-align: center;
      width: 30px !important;
      height: 30px !important;
      border: none;
    }

    .total {
      font-size: 10px;
      width: 200px;
      height: 100px;
      background-color: red;
    }

    .less,
    .more,
    .total {
      display: flex;
      align-items: center;
      justify-content: center;
      color: black;
      font-weight: bold;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #eff0f2;
      cursor: pointer;
    }
  }
`;

export const ContentForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px;
  margin: 20px 0px 60px 0px;
  background-color: #fff;
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
    border-radius: 4px;
    border: 1px solid #eaeaea;
    background: #fff;
  }
  label {
    color: #1d1d1c;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  .terms {
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .label-terms {
      margin-left: 10px;

      @media (max-width: 680px) {
        font-size: 10px;
      }
    }

    input {
      width: 15px !important;
      margin: 0px !important;
      height: 15px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    width: 50%;

    input {
      width: 95%;
      height: 30px;
      border: none;
      border-radius: 6px;
      outline: none;
      padding: 0px 10px;
      border-radius: 4px;
      border: 1px solid #eaeaea;
      background: #fff;
      margin-top: 5px;
    }
    select {
      border-radius: 4px;
      border: 1px solid #eaeaea;
      background: #fff;
      width: 95%;
      margin-top: 5px;
    }
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

  @media (max-width: 680px) {
    flex-direction: column;
    div {
      width: 100%;
    }
    div:nth-child(2) {
      margin-top: 10px;
    }
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
  background-color: #0095d6;
  border-radius: 6px;
  border: none;
  color: #ffffff;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
