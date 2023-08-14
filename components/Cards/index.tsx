import React from 'react';

import { Container, ContainerListOffers, ContainerLi, ContentTextOffer, TextOffer } from './styles';

import Image from 'next/image';

export const Cards: React.FC = () => {

  return (
    <Container>
      <ContainerListOffers>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Ola mundo
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Ola mundo
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Ola mundo
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
        <ContainerLi onClick={() => window.location.href = `/ce/offers/`}>
          <Image src="https://images.carriercms.com/image/upload/v1646838227/common/logos-svg/Onity-logo.svg" alt="oi" width={120} height={120} />
          <ContentTextOffer>
            <TextOffer>
              Ola mundo
            </TextOffer>
          </ContentTextOffer>
        </ContainerLi>
      </ContainerListOffers>
    </Container>
  )
}