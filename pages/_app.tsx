import * as React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import '../styles.css'
import "normalize.css";
import { Provider } from 'next-auth/client'
import ButtonAppBar from '../components/AppBar';

import { AppProps } from 'next/app';
import { Classes } from '@blueprintjs/core';
import { ApolloProvider, ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { useApollo } from "../utils/graphql_client";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider>
      <ApolloProvider client={apolloClient}>
        <div className={Classes.DARK}>
          <div className="content">
            <Component {...pageProps} />
          </div>
        </div>
      </ApolloProvider>
    </Provider>
  );
}

export default App;