import type { NextPage } from 'next'

import Image from 'next/image';

import { useRouter } from 'next/router';

import { BsCartPlus } from "react-icons/bs";

import { Header } from '../../../components/Header'
import Footer from '../../../components/Footer'

import AdvanceTrillium from '../../../assets/img/advance-trillium-rfid.jpg';

import { Container, ContentHomeProducts, TitleEvent, ContentProducts, ProductItem, ContentDetailtProduct, ButtonAddCart, NameProduct, DescriptionProduct } from './styles';

const ProductDetail: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 10/09/2023 - 20/09/2023</TitleEvent>
          <ContentProducts>
            <ProductItem onClick={() => router.push(`${event}/advance-trillium`)}>
              <Image src={AdvanceTrillium} alt="image" layout='responsive' />
            </ProductItem>
            <ContentDetailtProduct>
              <NameProduct>Advance Trillium</NameProduct>
              <DescriptionProduct>
                Serene da Onity é uma fechadura elegante para hotéis de luxo. Seu contorno brilhante simboliza tanto o design atemporal quanto a tecnologia
                inovadora de acesso móvel DirectKey. Essa solução permite acesso muito fácil ao quarto e encanta os hóspedes com a abertura da porta sem contato.
              </DescriptionProduct>
              <ButtonAddCart onClick={() => router.push('/cart')}>
                <BsCartPlus />
                Adicionar ao carrinho
              </ButtonAddCart>
            </ContentDetailtProduct>
          </ContentProducts>
        </ContentHomeProducts>
      </Container>
      <Footer />
    </>
  )
}

export default ProductDetail
