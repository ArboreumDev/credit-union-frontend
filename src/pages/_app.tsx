import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps } from "next/app"
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/core"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        <script
          async
          defer
          data-website-id={process.env.UMAMI_WEBSITE_ID}
          src="https://analytics-umami.vercel.app/umami.js"
        ></script>
      </Head>
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
