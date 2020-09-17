import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps, NextWebVitalsMetric } from "next/app"
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/core"
import { ANALYTICS_WEBSITE_IDS } from "../lib/constant"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>Arboreum</title>
        <meta name="description" content="Invest. Borrow."></meta>
        {typeof window !== "undefined" && (
          <script
            async
            defer
            data-website-id={
              window.location.hostname == "app.arboreum.dev"
                ? ANALYTICS_WEBSITE_IDS.production
                : ANALYTICS_WEBSITE_IDS.preview
            }
            src="https://analytics.arboreum.dev/umami.js"
          />
        )}
      </Head>

      <div>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </ChakraProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default App
