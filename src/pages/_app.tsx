import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps } from "next/app"

import { ChakraProvider } from "@chakra-ui/core"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ChakraProvider resetCSS>
        <div>
          <div className="content">
            <Component {...pageProps} />
          </div>
        </div>
      </ChakraProvider>
    </Provider>
  )
}

export default App
