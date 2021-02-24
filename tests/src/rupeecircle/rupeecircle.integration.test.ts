import RupeeCircleClient from "gql/wallet/rupeecircle_client"
import FormData from "form-data"

global.fetch = require("node-fetch")

export const rupeeCircle = new RupeeCircleClient(
  "http://localhost:3002/mock/rc",
  "https://in.staging.decentro.tech",
  "arboreum_staging"
)

describe("RupeeCircle tests", () => {
  test("register user", async () => {
    const formdata = new FormData()
    // formdata.append("reference_id", "arbo" + new Date())
    formdata.append("user_name", "julius")
    // formdata.append("consent", "Y")
    // formdata.append("consent_purpose", "for bank account purpose only")
    // formdata.append("document", Buffer.from(uploadRequest.data, "base64"), {
    // filename: uploadRequest.file_name,
    // contentType: uploadRequest.ctype,
    // })
    const resp = await rupeeCircle.registerLender(formdata)
    expect(resp.flag)
  })

  test.skip("get user status", async () => {
    // TODO figure out how to to get request with formdata (or change endpoint)
    // const formdata = new FormData()
    // formdata.append("reference_id", "arbo" + new Date())
    // formdata.append("user_id", "julius")
    // const resp = await rupeeCircle.getStatus(formdata)
    // console.log(resp)
    // expect(resp.flag)
    // expect(resp.status).toBe("processing")
  })
})
