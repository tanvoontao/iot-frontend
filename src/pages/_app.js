import '@/styles/globals.css';
import '@/styles/nprogress.css';

import { Router } from 'next/router';
import NProgress from 'nprogress';
import Providers from '@/components/Providers/Providers';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps, emotionCache }) {
  return (
    <Providers emotionCache={emotionCache}>

      <Component {...pageProps} />

    </Providers>
  );
}
