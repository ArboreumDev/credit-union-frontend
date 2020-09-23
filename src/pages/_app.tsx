import { ChakraProvider } from "@chakra-ui/core"
import { AppProps, NextWebVitalsMetric } from "next/app"
import Head from "next/head"
import * as React from "react"
import {
  ANALYTICS_WEBSITE_IDS,
  LAST_REDIRECT_PAGE,
  LogEventTypes,
} from "../lib/constant"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>Arboreum</title>
        <meta name="description" content="Invest. Borrow."></meta>
        {typeof window !== "undefined" && (
          <>
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
          </>
        )}
        {typeof window !== "undefined" && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  `
        lastRedirect = localStorage.getItem('` +
                  LAST_REDIRECT_PAGE +
                  `');
        currentPage = location.pathname;
        if (currentPage==="/" && lastRedirect && lastRedirect != currentPage && lastRedirect === "/dashboard") {
          console.log('redirect',currentPage, lastRedirect)
          window.location.href = lastRedirect
        }
        `,
              }}
            />
          </>
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
  const event = {
    eventType: LogEventTypes.ClientWebVitals,
    data: { metric: metric, url: location.href, page: location.pathname },
  }

  // Uncomment to send metrics to server
  // captureLog(event)
}

export default App
