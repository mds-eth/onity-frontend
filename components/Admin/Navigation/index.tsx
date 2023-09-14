import React from 'react';

import { ContainerOptions, OptionMenu } from './styles';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {

  const router = useRouter();

  return (
    <ContainerOptions>
      <OptionMenu onClick={() => router.push('/admin/events')}>Eventos</OptionMenu>
      <OptionMenu onClick={() => router.push('/admin/products')}>Produtos</OptionMenu>
      <OptionMenu onClick={() => router.push('/admin/services')}>Itens adicionais</OptionMenu>
      <OptionMenu onClick={() => router.push('/admin/orders')}>Pedidos</OptionMenu>
      <OptionMenu onClick={() => router.push('/admin/users')}>Usuários</OptionMenu>
    </ContainerOptions>
  )
}

export default Navigation;