import { ChakraProvider } from "@chakra-ui/core"
import { AppProps, NextWebVitalsMetric } from "next/app"
import Head from "next/head"
import * as React from "react"
import { LAST_REDIRECT_PAGE, LogEventTypes } from "../lib/constant"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>Arboreum</title>
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
  const event = {
    eventType: LogEventTypes.ClientWebVitals,
    data: { metric: metric, url: location.href, page: location.pathname },
  }

  // Uncomment to send metrics to server
  // captureLog(event)
}

export default App
