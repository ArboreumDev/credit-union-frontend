// import { readFileSync } from "fs"
import { rc_client } from "gql/rc_client"

global.fetch = require("node-fetch")

describe("Rupee Cirle tests", () => {
  test("client has valid credentials to get oauth token", async () => {
    const res = await rc_client.init()
  })

  test.skip("get oauth-token", async () => {
    // const res = await rc_client.doKYCOnIDNumber(req)
    // console.log(res)
    // expect(res.kycResult.name).toBe("DURAISAMY MANIKANDAN")
  })
})
