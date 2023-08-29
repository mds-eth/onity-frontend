import type { NextPage } from 'next'

import Image from 'next/image';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { BsFillTrashFill } from "react-icons/bs";

import { Container, ContentHomeProducts, TitleEvent, ContentCart, Row, FooterForm, Submit, HeaderForm, FormCart, ItemCart, SpaceMeio, ContentActionsItem, ButtonRemove, ContainerCart, SpaceImage, ContentForm } from './styles';
import { useRouter } from 'next/router';

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';
import { NameProduct } from '../[event]/styles';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../@types/products-type';

const CartUser: NextPage = () => {

  const router = useRouter();

  const { cart, countCart, removeFromCart } = useCart();
  console.log(countCart)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    router.push('/success');
  }

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 10/09/2023 - 20/09/2023</TitleEvent>
          <ContainerCart>
            <ContentCart>
              {countCart > 0 ? (
                cart?.map((item: CartItem) => {
                  return (
                    <ItemCart key={item.id}>
                      <SpaceImage>
                        <Image src={AdvanceTrillium} alt="image" />
                      </SpaceImage>
                      <SpaceMeio>
                        <NameProduct>{item.title}</NameProduct>
                        <input type="number" min="0" />
                      </SpaceMeio>
                      <ContentActionsItem>
                        <ButtonRemove onClick={() => removeFromCart(item.id)}>
                          <BsFillTrashFill />
                        </ButtonRemove>
                      </ContentActionsItem>
                    </ItemCart>
                  )
                })
              ) : (
                <p>Seu carrinho esta vazio...</p>
              )}
            </ContentCart>
            <ContentForm>
              <HeaderForm>
                <span>Preencha os dados abaixo para solicitar orçamento.</span>
              </HeaderForm>
              <FormCart onSubmit={handleSubmit}>
                <label htmlFor="hotel">Hotel</label>
                <input disabled={countCart === 0} type="text" name="hotel" id="hotel" />

                <label htmlFor="nome">Nome</label>
                <input disabled={countCart === 0} type="text" name="nome" id="nome" />

                <label htmlFor="email">Email</label>
                <input disabled={countCart === 0} type="text" name="email" id="email" />
                <Row>
                  <div>
                    <label htmlFor="phone">Celular</label>
                    <input disabled={countCart === 0} type="text" name="phone" id="phone" />
                  </div>
                  <div>
                    <label htmlFor="state">Estado</label>
                    <input disabled={countCart === 0} type="text" name="state" id="state" />
                  </div>
                </Row>
                <Row>
                  <div>
                    <label htmlFor="cnpj">CNPJ</label>
                    <input disabled={countCart === 0} type="text" name="cnpj" id="cnpj" />
                  </div>
                  <div>
                    <label htmlFor="icms">Contribuinte ICMS?</label>
                    <select id="icms" name="icms" disabled={countCart === 0}>
                      <option value="null">Selecione</option>
                      <option value="1">SIM</option>
                      <option value="0">NAO</option>
                    </select>
                  </div>
                </Row>
                <FooterForm>
                  <span>Valor total: <b>R$ 2530,10</b></span>
                  <Submit type='submit' disabled={countCart === 0}>Enviar</Submit>
                </FooterForm>
              </FormCart>
            </ContentForm>
          </ContainerCart>
        </ContentHomeProducts>
      </Container>
      <Footer />
    </>
  )
}

export default CartUser
