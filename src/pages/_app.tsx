import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps } from "next/app"
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/core"
import { ANALYTICS_WEBSITE_IDS } from "../utils/constant"

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Head>
        {typeof window !== "undefined" && (
          <script
            async
            defer
            data-website-id={
              window.location.hostname == "app.arboreum.dev"
                ? ANALYTICS_WEBSITE_IDS.production
                : ANALYTICS_WEBSITE_IDS.preview
            }
            data-host-url="https://analytics-umami.vercel.app/"
            src="/umami.js"
          />
        )}
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
