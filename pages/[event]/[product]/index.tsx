import type { NextPage } from 'next'

import Image from 'next/image';

import { useRouter } from 'next/router';

import { BsCartPlus } from "react-icons/bs";

import { Header } from '../../../components/Header'
import Footer from '../../../components/Footer'

import AdvanceTrillium from '../../../assets/img/advance-trillium-rfid.jpg';

import productsData from '../../../data/products.json';

import { Container, ContentHomeProducts, TitleEvent, ContentProducts, ProductItem, PriceProduct, ContentDetailtProduct, ButtonAddCart, NameProduct, DescriptionProduct } from './styles';
import { useCart } from '../../../contexts/CartContext';

const ProductDetail: NextPage = () => {

  const router = useRouter();

  const { addToCart } = useCart();

  const handleAddProductToCart = () => {
    addToCart(productsData[Math.floor(Math.random() * 4) + 1]);

    router.push('/cart');
  }

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 10/09/2023 - 20/09/2023</TitleEvent>
          <ContentProducts>
            <ProductItem>
              <Image src={AdvanceTrillium} alt="image" layout='responsive' />
            </ProductItem>
            <ContentDetailtProduct>
              <NameProduct>Advance Trillium</NameProduct>
              <DescriptionProduct>
                Serene da Onity é uma fechadura elegante para hotéis de luxo. Seu contorno brilhante simboliza tanto o design atemporal quanto a tecnologia
                inovadora de acesso móvel DirectKey. Essa solução permite acesso muito fácil ao quarto e encanta os hóspedes com a abertura da porta sem contato.
              </DescriptionProduct>
              <PriceProduct>Valor Total: R$ 2.530,22</PriceProduct>
              <ButtonAddCart onClick={() => handleAddProductToCart()}>
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
