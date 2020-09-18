import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps, NextWebVitalsMetric } from "next/app"
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/core"
import { ANALYTICS_WEBSITE_IDS, LogEventTypes } from "../lib/constant"
import { LogEvent } from "lib/types"

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
  const event: LogEvent = {
    eventType: LogEventTypes.ClientWebVitals,
    data: { metric: metric, url: location.href, page: location.pathname },
  }

  console.log(event)

  fetch("/api/health/log", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
}

export default App
