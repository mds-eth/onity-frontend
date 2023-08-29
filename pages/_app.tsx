import type { AppContext, AppProps } from 'next/app'
import GlobalStyles from '../styles/globalStyles'
import CartProvider from '../contexts/CartContext'
import { parseCookies } from 'nookies';

export default function App({ Component, pageProps, cart }: AppProps & { cart: any }) {

  return (
    <CartProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </CartProvider>
  )
}

App.getInitialProps = ({ ctx }: AppContext) => {
  const cookies = parseCookies(ctx);

  return {};
};

