import type { NextPage } from 'next'

import Image from 'next/image';

import ImageEvent from '../assets/img/image-event.png';

import { Header } from '../components/Header'
import Footer from '../components/Footer'

import { Container, ContainerListOffers, ContainerLi, ContentTextOffer, TextOffer } from './styles';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Container>
        <ContainerListOffers>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
          <ContainerLi onClick={() => window.location.href = `/feira-equipotel`}>
            <Image src={ImageEvent} alt="oi" width={120} height={120} />
            <ContentTextOffer>
              <TextOffer>
                Feira Equipotel
              </TextOffer>
            </ContentTextOffer>
          </ContainerLi>
        </ContainerListOffers>
      </Container>
      <Footer />
    </>
  )
}

export default Home
