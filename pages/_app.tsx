import { rootStore, Provider } from '../stores/root'

export default function App({ Component, pageProps }) {
  return (
      <Provider value={rootStore}>
        <Component {...pageProps} />
      </Provider>
  )
}
