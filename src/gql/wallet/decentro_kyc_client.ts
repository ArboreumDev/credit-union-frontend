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

  async doKYCOnImage(file: File) {
    return true
  }
}
