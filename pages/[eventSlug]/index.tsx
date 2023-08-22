import type { NextPage } from 'next'

import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { Cards } from '../../components/Cards'

const EventSlug: NextPage = () => {
  const router = useRouter();

  const { eventSlug } = router.query;

  console.log(eventSlug);
  return (
    <>
      <Header />
      <Cards />
      <Footer />
    </>
  )
}

export default EventSlug
