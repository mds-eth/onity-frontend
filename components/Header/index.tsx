import React from 'react';

import Image from 'next/image';

import { AiOutlineShoppingCart } from "react-icons/ai";

import { Container, TextTopHeader, SpaceCart } from './styles';

import { useRouter } from 'next/router';
import { useCart } from '../../contexts/CartContext';

export const Header: React.FC = () => {

  const router = useRouter();

  const { countCart } = useCart();

  return (
    <Container>
      <Image onClick={() => router.push('/')} src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="Logo Onity" width={80} height={40} />

      <TextTopHeader>Feira Equipotel</TextTopHeader>
      <SpaceCart onClick={() => router.push('/cart')}>
        <AiOutlineShoppingCart />
        {countCart > 0 && (
          <div className="counter">{countCart}</div>
        )}
      </SpaceCart>
    </Container>
  )
}