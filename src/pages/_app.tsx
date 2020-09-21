import * as React from "react"
import { Provider } from "next-auth/client"
import { AppProps } from "next/app"
import Head from "next/head"

import { ChakraProvider } from "@chakra-ui/core"
import { ANALYTICS_WEBSITE_IDS, LAST_REDIRECT_PAGE } from "../lib/constant"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS>
      <Head>
        <title>Arboreum</title>
        <meta name="description" content="Invest. Borrow."></meta>
        {/* {typeof window !== "undefined" && (
          <script
            async
            defer
            data-website-id={
              window.location.hostname == "app.arboreum.dev"
                ? ANALYTICS_WEBSITE_IDS.production
                : ANALYTICS_WEBSITE_IDS.preview
            }
            data-host-url="https://analytics.arboreum.dev/"
            src="/umami.js"
          />
        )} */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `
        lastRedirect = localStorage.getItem('` +
              LAST_REDIRECT_PAGE +
              `');
        currentPage = location.pathname;
        if (lastRedirect && lastRedirect != currentPage) {
          console.log('redirect',currentPage, lastRedirect)
          window.location.href = lastRedirect
        }
        `,
          }}
        />
      </Head>

      <div>
        <div className="content">
          <Component {...pageProps} />
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
