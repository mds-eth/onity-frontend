import React from 'react';

import { Container, AlertPrivate } from './styles';

const Footer: React.FC = () => {
  return (
    <Container>
      <div className="message">
        <span>Aviso de Privacidade</span>
        <span>Termos de uso</span>
      </div>
      <AlertPrivate href='#'>© {new Date().getFullYear()} Todos os direitos reservados.</AlertPrivate>
    </Container>
  )
}

export default Footer;