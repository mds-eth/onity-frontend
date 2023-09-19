import type { NextPage } from 'next'

import { useRouter } from 'next/router';

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'

import { AiFillCheckCircle } from "react-icons/ai";

import { Container, ContentSuccess, ContentMessage } from '../../pageStyles/success/styles';

const PageSuccess: NextPage = () => {

  const router = useRouter();

  const { event } = router.query;

  return (
    <>
      <Header />
      <Container>
        <ContentSuccess>
          <ContentMessage>
            <AiFillCheckCircle />
            <p>Seu pedido foi criado com sucesso. Em breve chegará em seu e-mail o seu orçamento conforme solicitado.</p>
            <button onClick={() => router.push('/')}>Voltar ao início</button>
          </ContentMessage>
        </ContentSuccess>
      </Container>
      <Footer />
    </>
  )
}

export default PageSuccess
