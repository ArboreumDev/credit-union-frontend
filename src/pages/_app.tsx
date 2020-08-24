import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps } from "next/app"

import { ChakraProvider, CSSReset } from "@chakra-ui/core"
import theme from "@chakra-ui/theme"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ChakraProvider theme={theme}>
        <div>
          <div className="content">
            <div className="container">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </ChakraProvider>
    </Provider>
  )
}

export default App
