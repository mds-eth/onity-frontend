/* eslint-disable @next/next/no-img-element */
import type { GetServerSidePropsContext, NextPage } from 'next'

import { Header } from '../components/Header'
import Footer from '../components/Footer'

import ApiService from '../services/api.service';

import { Container, ContentHomeProducts, TitleEvent, SubTitle, ContentProducts, ProductItem, NameProduct } from '../pageStyles/styles';
import { useRouter } from 'next/router';
import { IProduct } from '../types/ProductType';
import { configHost } from '../services/configHost';

interface IProductList {
  products: IProduct[];
}

const HomeProductsEvent: NextPage<IProductList> = ({ products }) => {

  const router = useRouter();

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 19/09/2023 - 22/09/2023</TitleEvent>
          <SubTitle>Explore uma variedade de modelos de maçanetas e acabamentos para personalizar o estilo de fechadura Serene™.</SubTitle>
          <ContentProducts>
            {products.map((product: IProduct) => {
              return (
                <ProductItem key={product.id} onClick={() => router.push(product.slug)}>
                  <img src={`${configHost.host}${product.file_path}`} alt="image" />
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const response = await ApiService.get('/products');

  const products = response.data;

  return {
    props: { products },
  };
}


export default HomeProductsEvent
