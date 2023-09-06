import type { NextPage } from 'next'

import Image from 'next/image';

import { useRouter } from 'next/router';

import { BsCartPlus } from "react-icons/bs";

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';

import productsData from '../../data/products.json';

import { Container, ContentHomeProducts, TitleEvent, ContentProducts, ProductItem, PriceProduct, ContentDetailtProduct, ButtonAddCart, NameProduct, DescriptionProduct } from './styles';
import { useCart } from '../../contexts/CartContext';
import { useEffect, useState } from 'react';
import { CartItem } from '../../@types/products-type';
import { formatCoinBR } from '../../utils/Utils';

const ProductDetail: NextPage = () => {

  const router = useRouter();
  const [product, setProduct] = useState<CartItem>();

  useEffect(() => {
    setProduct(productsData[Math.floor(Math.random() * 10) + 1]);
  }, []);

  const { addToCart } = useCart();

  const handleAddProductToCart = () => {
    addToCart(product);

    router.push('/cart');
  }

  return (
    <>
      <Header />
      <Container>
        <ContentHomeProducts>
          <TitleEvent>Feira Equipotel - 18/09/2023 - 22/09/2023</TitleEvent>
          <ContentProducts>
            <ProductItem>
              <Image src={AdvanceTrillium} alt="image" layout='responsive' />
            </ProductItem>
            <ContentDetailtProduct>
              <NameProduct>{product?.title}</NameProduct>
              <DescriptionProduct>
                {product?.description}
              </DescriptionProduct>
              <PriceProduct>Valor Total: {formatCoinBR(product?.price)}</PriceProduct>
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
