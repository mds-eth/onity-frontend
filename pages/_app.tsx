import type { AppContext, AppProps } from 'next/app';
import GlobalStyles from '../styles/globalStyles';
import CartProvider from '../contexts/CartContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ServerResponse } from 'http';
import nookies from 'nookies';
import { decryptData } from '../utils/Utils';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  if (pageProps?.isAdminRoute) {
    return (
      <AuthProvider isAuth={pageProps.isAuth} userName={pageProps.user.user_name} tokenSession={pageProps.user.access_token}>
        <GlobalStyles />
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    );
  }
  return (
    <CartProvider>
      <GlobalStyles />
      <ToastContainer />
      <Component {...pageProps} />
    </CartProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {

  if (ctx.err) {
    const res = ctx.res as ServerResponse;
    res.writeHead(302, {
      Location: '/',
      'Content-Type': 'text/html; charset=utf-8',
    });
    res.end();

    return {
      props: {},
    };
  }

  const isAdminRoute = ctx.pathname.startsWith('/admin');

  if (isAdminRoute) {

    const user = nookies.get(ctx)['[@auth:user]'];

    return {
      pageProps: {
        isAdminRoute: true,
        isAuth: user ? true : false,
        user: user ? await decryptData(JSON.parse(user)) : false,
      },
    };
  }

  return {};
};

export default MyApp;
