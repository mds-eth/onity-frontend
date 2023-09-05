import React from 'react';

import { Container } from './styles';
import { useAuth } from '../../../contexts/AuthContext';

export const HeaderAdmin: React.FC = () => {

  const { nameUser } = useAuth();

  return (
    <Container>
      <h1>Ola {nameUser}</h1>
    </Container>
  )
}