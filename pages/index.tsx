/* eslint-disable @next/next/no-img-element */
import type { GetServerSidePropsContext, NextPage } from 'next'

import { Header } from '../components/Header'
import Footer from '../components/Footer'

import ApiService from '../services/api.service';

import { Container, ContentHomeProducts, ContentProducts, Title, SubTitle, ProductItem, SpaceImage, SpaceTitle, SpaceAddCart, ContainerBanner } from '../pageStyles/styles';
import { useRouter } from 'next/router';
import { IProduct } from '../types/ProductType';
import { configHost } from '../services/configHost';
import { useCart } from '../contexts/CartContext';

interface IProductList {
  products: IProduct[];
}

const HomeProductsEvent: NextPage<IProductList> = ({ products }) => {

  const router = useRouter();

  const { addToCart } = useCart();

  const handleAddProductToCart = (product: IProduct) => {
    addToCart(product, 1);

    router.push('/cart');
  }

  return (
    <>
      <Header />
      <Container>
        <ContainerBanner>
          <Title>Feira Equipotel</Title>
          <span>19/09/2023 - 22/09/2023</span>
          <SubTitle>Explore uma variedade de equipamentos Onity para o seu hotel.</SubTitle>
        </ContainerBanner>
        <ContentHomeProducts>
          <h2>Categoria do produto</h2>
          <ContentProducts>
            {products.map((product: IProduct) => {
              return (
                <ProductItem key={product.id}>
                  <SpaceImage>
                    <img src={`${configHost.host}${product.file_path}`} alt="image" />
                  </SpaceImage>
                  <SpaceTitle>
                    <span>{product.title}</span>
                  </SpaceTitle>
                  <SpaceAddCart onClick={() => handleAddProductToCart(product)}>
                    <div className="icon">
                      <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.7533 1.09923C12.5978 0.936276 12.3868 0.844727 12.1668 0.844727C11.9468 0.844727 11.7358 0.936276 11.5802 1.09923C11.4247 1.26219 11.3373 1.48321 11.3373 1.71367V2.58262H10.5078C10.2878 2.58262 10.0768 2.67417 9.92121 2.83713C9.76565 3.00009 9.67825 3.22111 9.67825 3.45156C9.67825 3.68202 9.76565 3.90304 9.92121 4.066C10.0768 4.22896 10.2878 4.32051 10.5078 4.32051H11.3373V5.18946C11.3373 5.41991 11.4247 5.64093 11.5802 5.80389C11.7358 5.96685 11.9468 6.0584 12.1668 6.0584C12.3868 6.0584 12.5978 5.96685 12.7533 5.80389C12.9089 5.64093 12.9963 5.41991 12.9963 5.18946V4.32051H13.8258C14.0458 4.32051 14.2568 4.22896 14.4123 4.066C14.5679 3.90304 14.6553 3.68202 14.6553 3.45156C14.6553 3.22111 14.5679 3.00009 14.4123 2.83713C14.2568 2.67417 14.0458 2.58262 13.8258 2.58262H12.9963V1.71367C12.9963 1.48321 12.9089 1.26219 12.7533 1.09923Z" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.344727 1.48054C0.344727 1.13725 0.610386 0.858961 0.938093 0.858961H3.31156C3.59437 0.858961 3.83788 1.06805 3.89339 1.35855L4.39174 3.96686H8.2202C8.5479 3.96686 8.81356 4.24515 8.81356 4.58844C8.81356 4.93172 8.5479 5.21002 8.2202 5.21002H4.62927L5.48378 9.68239C5.51091 9.82548 5.58522 9.95401 5.6937 10.0455C5.80217 10.137 5.93791 10.1856 6.07715 10.1828C6.08094 10.1827 6.08473 10.1826 6.08852 10.1826H11.856C11.8588 10.1826 11.8616 10.1827 11.8644 10.1827C11.8654 10.1827 11.8664 10.1827 11.8674 10.1828C12.0066 10.1856 12.1424 10.137 12.2509 10.0455C12.3588 9.95442 12.433 9.82663 12.4604 9.68432L12.7829 7.91299C12.8443 7.57577 13.155 7.35454 13.4769 7.41885C13.7988 7.48316 14.01 7.80865 13.9486 8.14586L13.6256 9.91992L13.6248 9.92458C13.5434 10.3538 13.3205 10.7394 12.995 11.0139C12.6712 11.2869 12.2665 11.4326 11.851 11.4258H6.0936C5.6781 11.4326 5.27334 11.2869 4.94954 11.0139C4.62423 10.7395 4.40135 10.3541 4.31988 9.9251L3.32864 4.73712C3.32462 4.71996 3.32128 4.70252 3.31865 4.68483L2.82519 2.10212H0.938093C0.610386 2.10212 0.344727 1.82383 0.344727 1.48054ZM4.49829 13.9121C4.49829 13.2255 5.02961 12.669 5.68503 12.669C6.34044 12.669 6.87176 13.2255 6.87176 13.9121C6.87176 14.5987 6.34044 15.1553 5.68503 15.1553C5.02961 15.1553 4.49829 14.5987 4.49829 13.9121ZM11.0253 13.9121C11.0253 13.2255 11.5566 12.669 12.2121 12.669C12.8675 12.669 13.3988 13.2255 13.3988 13.9121C13.3988 14.5987 12.8675 15.1553 12.2121 15.1553C11.5566 15.1553 11.0253 14.5987 11.0253 13.9121Z" fill="white" />
                      </svg>
                    </div>
                    <div className="text">
                      <span>ADICIONAR AO CARRINHO</span>
                    </div>
                  </SpaceAddCart>
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
