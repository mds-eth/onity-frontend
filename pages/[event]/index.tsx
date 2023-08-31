import type { NextPage } from 'next'

import Image from 'next/image';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';

import productsData from '../../data/products.json';

import { Container, ContentHomeProducts, TitleEvent, SubTitle, ContentProducts, ProductItem, NameProduct } from './styles';
import { useRouter } from 'next/router';
import { CartItem } from '../../@types/products-type';

const HomeProductsEvent: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 18/09/2023 - 22/09/2023</TitleEvent>
          <SubTitle>Explore uma variedade de modelos de maçanetas e acabamentos para personalizar o estilo de fechadura Serene™.</SubTitle>
          <ContentProducts>
            {productsData.map((product: CartItem) => {
              return (
                <ProductItem key={product.id} onClick={() => router.push(`${event}/advance-trillium`)}>
                  <Image src={AdvanceTrillium} alt="image" layout='responsive' />
                  <NameProduct>{product.title}</NameProduct>
                </ProductItem>
              )
            })}
          </ContentProducts>
        </ContentHomeProducts>
      </Container>
      <Footer />
    </>
  )
}

export default HomeProductsEvent
