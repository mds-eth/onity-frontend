import type { NextPage } from 'next'

import Image from 'next/image';

import { CiCircleRemove } from "react-icons/ci";

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import { Container, ContentHomeProducts, TitleEvent, SubTitle, ContentCart, ItemCart, ContentActionsItem, ButtonRemove, ContainerCart, SpaceImage } from './styles';
import { useRouter } from 'next/router';

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';
import HTStin from '../../assets/img/ht-626-satin.jpg';
import Serene from '../../assets/img/serene.jpg';
import TrilliumRfid from '../../assets/img/trillium-rfid.jpg';
import { NameProduct } from '../[event]/styles';

const CartUser: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 10/09/2023 - 20/09/2023</TitleEvent>
          <ContainerCart>
            <ContentCart>
              <ItemCart>
                <SpaceImage>
                  <Image src={AdvanceTrillium} alt="image" layout='responsive' />
                </SpaceImage>
                <NameProduct>Advance Trillium</NameProduct>
                <ContentActionsItem>
                  <ButtonRemove>
                    <CiCircleRemove />
                    Remover
                  </ButtonRemove>
                  <ButtonRemove>
                    <CiCircleRemove />
                    Remover
                  </ButtonRemove>
                </ContentActionsItem>
              </ItemCart>
              <ItemCart />
              <ItemCart />
              <ItemCart />
              <ItemCart />
              <ItemCart />
              <ItemCart />
              <ItemCart />
              <ItemCart />
            </ContentCart>
          </ContainerCart>
        </ContentHomeProducts>
      </Container>
      <Footer />
    </>
  )
}

export default CartUser
