import { Fetcher } from "lib/api"
// import { P2PProvider } from "./bank"
//
// export enum CurrencyCode {
//   INR = "INR",
// }
// export enum Notification {
//   true = 1,
//   false = 0,
// }

export default class RCClient {
  private fetcher: Fetcher
  private login: string
  private password: string

  constructor(baseURL: string, client_email: string, client_password: string) {
    // probably most logic could be moved here, but it ocomplicated things that some of it was async
  }

  async init() {
    // NONE OF THIS WORKS!

    // this could come from .env or parameters
    const rc_hostname = "http://sandbox.rupeecircle.com"
    const rc_version = "v3"
    const url = rc_hostname + "/api/" + rc_version + "/clientSecretDetails"
    const credentials = { email: "nupur.0905@gmail.com", password: "Abcd@1234" }

    // get client id & secret
    const formdata = new FormData()
    formdata.append("email", credentials.email)
    formdata.append("password", credentials.password)
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formdata,
      // headers:  { Accept: "application/json" },
      // body: {email: credentials.email, password: credentials.password}
    })
    const tmp = await resp.json()
    console.log(tmp)

    // now use them to get an oauth token
    const res = await resp.json()
    if (res.flag) {
      const formdata2 = new FormData()
      formdata2.append("grant type", "client_credentials")
      formdata2.append("client_id", res.data._id)
      formdata2.append("client_secret", res.data.secret)
      // formdata2.append('client_id', "5fad33c1763cc26b330c8632")
      // formdata2.append('client_secret', "x7lDrM3PYZfJmOL1fqIZSZd1YAGM1cpFAnwaGRED")
      const resp2 = await fetch(rc_hostname + "/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formdata2,
      })
      console.log("oauth call", await resp2.json())

      const token = (await resp2.json()).access_token
      this.fetcher = new Fetcher(
        {
          Authorization: "Bearer " + token,
        },
        rc_hostname
      )
    } else {
      console.log(res)
      throw "Invalid Credentials ERROR"
    }
  }
}

export const rc_client = new RCClient(
  "sandbox.rupeecircle.com",
  "nupur.0905@gmail.com",
  "Abcd@1234"
)
