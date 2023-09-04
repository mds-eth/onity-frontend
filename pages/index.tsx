import type { NextPage, GetServerSideProps } from 'next';

import Image from 'next/image';

import ImageEvent from '../assets/img/image-event.png';

import { Header } from '../components/Header';
import Footer from '../components/Footer';

import {
  Container,
  ContainerListOffers,
  ContainerLi,
  ContentTextOffer,
  TextOffer,
} from './styles';

import ApiService from '../services/api.service';
import { EventsType } from '../@types/events-type';

interface HomeProps {
  events: EventsType[];
}

const Home: NextPage<HomeProps> = ({ events }) => {
  return (
    <>
      <Header />
      <Container>
        <ContainerListOffers>
          {events?.map((event) => (
            <ContainerLi key={event.id}>
              <Image src={ImageEvent} alt="oi" width={120} height={120} />
              <ContentTextOffer>
                <TextOffer>{event.event_name}</TextOffer>
              </ContentTextOffer>
            </ContainerLi>
          ))}
        </ContainerListOffers>
      </Container>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {

    const response = await ApiService.get('/events');

    const events = response.data;

    return {
      props: { events },
    };
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);

    return {
      redirect: {
        destination: '/erro',
        permanent: false,
      },
    };
  }
};

export default Home;