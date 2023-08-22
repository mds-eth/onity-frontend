import React from 'react';

import Image from 'next/image'

import { Container, AlertPrivate, Copy } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="Logo Onity" width={180} height={40} />
      <Copy>© {new Date().getFullYear()}. Todos direitos reservados à Mobi Aplicativos</Copy>
      <AlertPrivate href='#'>Aviso de Privacidade</AlertPrivate>
    </Container>
  )
}

export default Footer;