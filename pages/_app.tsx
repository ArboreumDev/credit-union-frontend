
import * as React from 'react';
import { Provider, rootStore } from '../stores/root';

import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;