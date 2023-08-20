import React from 'react';

import { Container, ContainerListOffers, ContainerLi, ContentTextOffer, TextOffer } from './styles';

import Image from 'next/image';

import AdvanceTrillium from '../../assets/img/advance-trillium-rfid.jpg';
import HTStin from '../../assets/img/ht-626-satin.jpg';
import Serene from '../../assets/img/serene.jpg';
import TrilliumRfid from '../../assets/img/trillium-rfid.jpg';

export const Cards: React.FC = () => {

  return (
    <Container>
      <ContainerListOffers>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src={AdvanceTrillium} alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Advance Trillium
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src={HTStin} alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              HT Stin
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src={Serene} alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Serene
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src={TrilliumRfid} alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Trillium RFID
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
      </ContainerListOffers>
    </Container>
  )
}