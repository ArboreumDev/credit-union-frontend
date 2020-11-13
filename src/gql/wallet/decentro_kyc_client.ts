import { Fetcher } from "lib/api"
import { fileURLToPath } from "url"
import { Bank, KYCProvider } from "./bank"
import FormData from "form-data"

export enum KYCDocumentType {
  VOTERID = "VOTERID",
  ADHAAR = "ADHAAR",
  PAN = "PAN",
  DRIVING_LICENSE = "DRIVING_LICENSE",
}

export enum KYCPurpose {
  BORROWER = "apply for loan on arboreum platform",
  LENDER = "register as lender on arboreum platform",
}

export enum KYCStatus {
  KYC_CHECK_SUCCESS = "KYC_CHECK_SUCCESS",
  KYC_CHECK_FAILED = "KYC_CHECK_FAILED",
}

export default class DecentroKYCClient {
  constructor(private baseURL, private headers) {}

  async doKYCOnImage(formdata: FormData) {
    const resp = await fetch(
      "https://in.staging.decentro.tech/kyc/scan_extract/ocr",
      {
        method: "POST",
        headers: this.headers,
        // @ts-ignore
        body: formdata,
      }
    )
    return resp.json()
  }

  async doKYCOnIDNumber(params: {
    userId: string
    idNumber: string
    document_type: KYCDocumentType
    purpose: KYCPurpose
  }) {
    const endpoint = "/scan_extract/ocr/kyc/public_registry/validate"
    const req = {
      reference_id: params.userId + "-" + Date.now(),
      id_number: params.idNumber,
      document_type: params.document_type,
      consent_purpose: params.purpose,
      consent: "Y",
      kyc_validate: 1,
    }
    const fetcher = new Fetcher(this.headers, this.baseURL)
    return fetcher.post(endpoint, req)
  }
}

export const decentroKYCClient = new DecentroKYCClient(
  process.env.DECENTRO_KYC_BASE_URL,
  {
    module_secret: "csnlWlPHXnfDxEporJP9qzksYqtG37iC",
    client_id: "arboreum_staging",
    client_secret: "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
  }
)
