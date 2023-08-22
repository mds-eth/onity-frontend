import type { NextPage } from 'next'

import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { CardsHome } from '../components/CardsHome'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <CardsHome />
      <Footer />
    </>
  )
}

export default Home
