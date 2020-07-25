import * as React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import '../styles.css'
import "normalize.css";
import { Provider } from 'next-auth/client'
import ButtonAppBar from '../components/AppBar';

import { AppProps } from 'next/app';
import { Classes } from '@blueprintjs/core';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://right-thrush-43.hasura.app/v1/graphql',
  cache: new InMemoryCache()
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ApolloProvider client={client}>
        <div className={Classes.DARK}>
          <div className='content'>
              <Component {...pageProps} />
          </div>
        </div>
      </ApolloProvider>
    </Provider>
  );
}

export default App;