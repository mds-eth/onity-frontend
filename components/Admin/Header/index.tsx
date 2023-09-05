import React from 'react';

import { Container } from './styles';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/router';

export const HeaderAdmin: React.FC = () => {

  const { nameUser } = useAuth();

  const router = useRouter();

  return (
    <Container>
      <button onClick={() => router.push('/admin/dashboard')}>Dashboard</button>
      <h1>Ola {nameUser}</h1>
    </Container>
  )
}