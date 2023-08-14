import React from 'react';

import Image from 'next/image'

import { Container, TextTopHeader } from './styles';

export const Header: React.FC = () => {

  return (
    <Container>
      <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="Logo Onity" width={180} height={80} />
      <TextTopHeader>Feira Equipotel</TextTopHeader>
    </Container>
  )
}