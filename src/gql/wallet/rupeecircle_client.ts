import { Fetcher } from "lib/api"
import { fileURLToPath } from "url"
// import { Bank, KYCProvider } from "./bank"
import FormData from "form-data"

// export enum KYCDocumentType {
//   VOTERID = "VOTERID",
//   ADHAAR = "ADHAAR",
//   PAN = "PAN",
//   DRIVING_LICENSE = "DRIVING_LICENSE",
// }

// export enum KYCPurpose {
//   BORROWER = "apply for loan on arboreum platform",
//   LENDER = "register as lender on arboreum platform",
// }

// export enum KYCStatus {
//   KYC_CHECK_SUCCESS = "KYC_CHECK_SUCCESS",
//   KYC_CHECK_FAILED = "KYC_CHECK_FAILED",
// }

export default class RupeeCircleClient {
  private headers: Record<string, string>

  constructor(private baseUrl: string, private email, private password) {
    // TODO get auth token from endpoint with password & email
    this.headers = {
      Authorization: "Bearer ",
    }
  }

  async registerLender(formdata: FormData) {
    //   "https://in.staging.decentro.tech/kyc/scan_extract/ocr",
    const resp = await fetch(this.baseUrl + "/registration/borrower", {
      method: "POST",
      headers: this.headers,
      // @ts-ignore
      body: formdata,
    })
    return resp.json()
  }

  //   async getStatus(formdata: FormData) {
  //     //   "https://in.staging.decentro.tech/kyc/scan_extract/ocr",
  //     const resp = await fetch(
  //       "http://localhost:3002/mock/rc/user",
  //       {
  //         method: "GET",
  //         headers: this.headers,
  //         // @ts-ignore
  //         body: formdata,
  //       }
  //     )
  //     return resp.json()
  //   }

  //   async doKYCOnIDNumber(params: {
  //     userId: string
  //     idNumber: string
  //     document_type: KYCDocumentType
  //     purpose: KYCPurpose
  //   }) {
  //     const endpoint = "/scan_extract/ocr/kyc/public_registry/validate"
  //     const req = {
  //       reference_id: params.userId + "-" + Date.now(),
  //       id_number: params.idNumber,
  //       document_type: params.document_type,
  //       consent_purpose: params.purpose,
  //       consent: "Y",
  //       kyc_validate: 1,
  //     }
  //     const fetcher = new Fetcher(this.headers, this.baseURL)
  //     return fetcher.post(endpoint, req)
  //   }
}

export const rupeeCircleClient = new RupeeCircleClient(
  //   process.env.DECENTRO_KYC_BASE_URL,
  "http://localhost:3002/mock/rc",
  "TODO",
  "TODO"
)
