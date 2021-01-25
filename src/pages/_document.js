import Document, { Html, Head, Main, NextScript } from "next/document"

import { LAST_REDIRECT_PAGE, GA_TRACKING_ID } from "../lib/constant"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Invest. Borrow."></meta>
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
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
