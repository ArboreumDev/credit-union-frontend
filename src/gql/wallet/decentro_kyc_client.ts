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

export default class DecentroKYCClient {
  private fetcher: Fetcher

  constructor(
    baseURL: string,
    client_id: string,
    client_secret: string,
    module_secret: string
  ) {
    this.fetcher = new Fetcher(
      {
        "Content-Type": "application/json",
        client_id: client_id,
        client_secret: client_secret,
        module_secret: module_secret,
      },
      baseURL
    )
  }

  async doKYCOnImage(formdata: FormData) {
    const resp = await fetch(
      "https://in.staging.decentro.tech/kyc/scan_extract/ocr",
      {
        method: "POST",
        headers: {
          module_secret: "csnlWlPHXnfDxEporJP9qzksYqtG37iC",
          client_id: "arboreum_staging",
          client_secret: "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
        },
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
    const endpoint = "/kyc/public_registry/validate"
    const req = {
      reference_id: params.userId + "-" + Date.now(),
      id_number: params.idNumber,
      document_type: params.document_type,
      consent_purpose: params.purpose,
      consent: "Y",
      kyc_validate: 1,
    }
    console.log(req)
    return this.fetcher.post(endpoint, req)
  }
}
