import * as React from 'react';

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import '../styles.css'
import "normalize.css";

import { Provider, rootStore } from '../stores/root';
import ButtonAppBar from '../components/AppBar';

import { AppProps } from 'next/app';
import { Classes } from '@blueprintjs/core';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={rootStore}>
      <ButtonAppBar />
      <div className={Classes.DARK}>
        <div className='content'>
          <div className='container'>
            <Component {...pageProps} />
          </div>
        </div>
      </div>
      
    </Provider>
  );
}

export default App;