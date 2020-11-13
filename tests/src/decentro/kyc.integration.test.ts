import FormData from "form-data"
import { readFileSync } from "fs"
import DecentroKYCClient, {
  KYCDocumentType,
  KYCPurpose,
} from "gql/wallet/decentro_kyc_client"

global.fetch = require("node-fetch")

export const decentroKYCClient = new DecentroKYCClient(
  "https://in.staging.decentro.tech",
  "arboreum_staging",
  "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
  "csnlWlPHXnfDxEporJP9qzksYqtG37iC"
)
describe("Decentro tests", () => {
  test("do kyc on image", async () => {
    const path = require("path")
    const file = readFileSync(path.resolve(__dirname, "pan_mock.jpg"))

    const formdata = new FormData()
    formdata.append("reference_id", "arbo" + new Date())
    formdata.append("document_type", "pan")
    formdata.append("consent", "Y")
    formdata.append("consent_purpose", "for bank account purpose only")
    formdata.append("document", file, {
      filename: "bar.jpg",
      contentType: "image/jpeg",
    })
    formdata.append("kyc_validate", "1")
    const res = await decentroKYCClient.doKYCOnImage(formdata)
    console.log(res)
    expect(res.kycResult.name).toBe("DURAISAMY MANIKANDAN")
  })

  test("kyc from id number", async () => {
    const req = {
      userId: "someID",
      idNumber: "BNZPM2501F",
      document_type: KYCDocumentType.PAN,
      purpose: KYCPurpose.BORROWER,
    }
    const res = await decentroKYCClient.doKYCOnIDNumber(req)
    console.log(res)
    expect(res.kycResult.name).toBe("DURAISAMY MANIKANDAN")
  })
})
