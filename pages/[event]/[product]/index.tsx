import type { NextPage } from 'next'

import { useRouter } from 'next/router'

import { Header } from '../../../components/Header'
import Footer from '../../../components/Footer'

const EventSlug: NextPage = () => {
  const router = useRouter();

  const { event, product } = router.query;

  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

export default EventSlug
