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
      <div className="content">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  )
}
export default App
