import FormData from "form-data"
import { readFileSync } from "fs"
import {
  decentroKYCClient,
  KYCDocumentType,
  KYCPurpose,
} from "gql/wallet/decentro_kyc_client"

global.fetch = require("node-fetch")

describe("Decentro tests", () => {
  test.skip("do kyc on image", async () => {
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
    // console.log(res)
    expect(res.kycStatus).toBe("SUCCESS")
    expect(res.kycResult.name).toBe("DURAISAMY MANIKANDAN")
    expect(res.kycResult.idStatus).toBe("VALID")
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
