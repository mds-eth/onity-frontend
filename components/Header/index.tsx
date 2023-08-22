import React from 'react';

import Image from 'next/image'

import { Container, TextTopHeader } from './styles';

import router from 'next/router';

export const Header: React.FC = () => {

  return (
    <Container>
      <Image onClick={() => router.push('/')} src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="Logo Onity" width={180} height={40} />
      <TextTopHeader>Feira Equipotel</TextTopHeader>
    </Container>
  )
}