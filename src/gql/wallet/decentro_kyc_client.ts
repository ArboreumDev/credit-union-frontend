import { Fetcher } from "lib/api"
import { fileURLToPath } from "url"
import { Bank, KYCProvider } from "./bank"

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

export default class DecentroKYCClient extends KYCProvider {
  private fetcher: Fetcher

  constructor(
    baseURL: string,
    client_id: string,
    client_secret: string,
    module_secret: string
  ) {
    super()
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

  async doKYCOnImage(params: {
    file: File
    userId: string
    document_type: KYCDocumentType
    purpose: KYCPurpose
  }) {
    const form = new FormData()
    form.append("reference_id", "arbo-" + Date.now())
    form.append("document_type", "pan")
    form.append("consent", "Y")
    form.append("consent_purpose", "for bank account purpose only")
    form.append("document", params.file)
    form.append("kyc_validate", "1")

    return fetch("https://in.staging.decentro.tech/kyc/scan_extract/ocr", {
      method: "POST",
      body: form,
      headers: {
        module_secret: "csnlWlPHXnfDxEporJP9qzksYqtG37iC",
        client_id: "arboreum_staging",
        client_secret: "5aoTBWhjzeOz4GNI7zocGXV3XgozyejA",
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error)
      })
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
