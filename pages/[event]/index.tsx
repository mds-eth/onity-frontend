import type { NextPage } from 'next'

import Image from 'next/image';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';
import HTStin from '../../assets/img/ht-626-satin.jpg';
import Serene from '../../assets/img/serene.jpg';
import TrilliumRfid from '../../assets/img/trillium-rfid.jpg';

import { Container, ContentHomeProducts, TitleEvent, SubTitle, ContentProducts, ProductItem, NameProduct } from './styles';
import router, { useRouter } from 'next/router';

const HomeProductsEvent: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 10/09/2023 - 20/09/2023</TitleEvent>
          <SubTitle>Explore uma variedade de modelos de maçanetas e acabamentos para personalizar o estilo de fechadura Serene™.</SubTitle>
          <ContentProducts>
            <ProductItem onClick={() => router.push(`${event}/advance-trillium`)}>
              <Image src={AdvanceTrillium} alt="image" layout='responsive' />
              <NameProduct>Advance Trillium</NameProduct>
            </ProductItem>
            <ProductItem onClick={() => router.push(`${event}/ht-stin`)}>
              <Image src={HTStin} alt="image" layout='responsive' />
              <NameProduct>HT Stin</NameProduct>
            </ProductItem>
            <ProductItem onClick={() => router.push(`${event}/serene`)}>
              <Image src={Serene} alt="image" layout='responsive' />
              <NameProduct>Serene</NameProduct>
            </ProductItem>
            <ProductItem onClick={() => router.push(`${event}/trillium-rfid`)}>
              <Image src={TrilliumRfid} alt="image" layout='responsive' />
              <NameProduct>Trillium RFID</NameProduct>
            </ProductItem>
          </ContentProducts>
        </ContentHomeProducts>
      </Container>
      <Footer />
    </>
  )
}

export default HomeProductsEvent
