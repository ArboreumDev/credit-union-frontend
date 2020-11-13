import { CurrencyCode, Notification } from "gql/wallet/decentro_client"
import DecentroKYCClient, {
  KYCDocumentType,
  KYCPurpose,
} from "gql/wallet/decentro_kyc_client"
import DecentroClient from "gql/wallet/decentro_client"
import { readFileSync } from "fs"

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
    const file = readFileSync(path.resolve(__dirname, "pan_mock.jpg"), "utf-8")
    const req = {
      file, //mock_pan,
      userId: "someID",
      document_type: KYCDocumentType.PAN,
      purpose: KYCPurpose.BORROWER,
    }
    const res = await decentroKYCClient.doKYCOnImage(req)
    console.log(res)
    expect(res.kycResult.name).toBe("DURAISAMY MANIKANDAN")
  })

  test.skip("kyc from id number", async () => {
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
