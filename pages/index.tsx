import type { NextPage } from 'next'

import { Header } from '../components/Header'
import Footer from '../components/Footer'
import { Cards } from '../components/Cards'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Cards />
      <Footer />
    </>
  )
}

export default Home
