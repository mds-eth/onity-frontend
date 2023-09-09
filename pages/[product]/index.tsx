import type { GetServerSidePropsContext, NextPage } from 'next'

import Image from 'next/image';

import { useRouter } from 'next/router';

import { BsCartPlus } from "react-icons/bs";

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import ApiService from '../../services/api.service';

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';

import { useCart } from '../../contexts/CartContext';
import { formatCoinBR } from '../../utils/Utils';
import { IProduct } from '../../types/ProductType';

import { Container, ContentHomeProducts, TitleEvent, ContentProducts, ProductItem, PriceProduct, ContentDetailtProduct, ButtonAddCart, NameProduct, DescriptionProduct } from './styles';

interface IProductDetail {
  product: IProduct;
}

const ProductDetail: NextPage<IProductDetail> = ({ product }) => {
  console.log(product)
  console.log(`aquiiiiii`)
  const router = useRouter();

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
                {product?.title}
              </DescriptionProduct>
              <PriceProduct>Valor Total: {formatCoinBR(product?.price_net)}</PriceProduct>
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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

  const { product: productSlug } = ctx.query;

  const response = await ApiService.get(`/products/slug/${productSlug}`);

  const product = response.data;

  return {
    props: { product },
  };
}


export default ProductDetail
