import React from 'react';

import { Container, ContainerListOffers, ContainerLi, ContentTextOffer, TextOffer } from './styles';

import Image from 'next/image';

import ImageEvent from '../../assets/img/image-event.png';

export const CardsHome: React.FC = () => {

  return (
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
      </ContainerListOffers>
    </Container>
  )
}