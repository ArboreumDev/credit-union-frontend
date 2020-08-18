import * as React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import '../styles.css'
import "normalize.css";
import { Provider } from 'next-auth/client'

import { AppProps } from 'next/app';
import { Classes } from '@blueprintjs/core';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <div className={Classes.DARK}>
        <div className="content">
          <div className="container">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;