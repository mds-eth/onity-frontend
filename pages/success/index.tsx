import type { NextPage } from 'next'

import { useRouter } from 'next/router';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import { AiFillCheckCircle } from "react-icons/ai";

import { Container, ContentSuccess, TitleEvent, ContentMessage } from '../../pageStyles/success/styles';

const PageSuccess: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentSuccess>
          <TitleEvent>Feira Equipotel - 18/09/2023 - 22/09/2023</TitleEvent>
          <ContentMessage>
            <AiFillCheckCircle />
            <p>Seu pedido foi criado com sucesso. Acompanhe seu e-mail para maiores informações.</p>
            <button onClick={() => router.push('/')}>Voltar ao início</button>
          </ContentMessage>
        </ContentSuccess>
      </Container>
      <Footer />
    </>
  )
}

export default PageSuccess
