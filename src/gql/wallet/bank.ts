export abstract class Bank {
  abstract createAccount(params: any)
  abstract getBalance(params: any)
}

export abstract class KYCProvider {
  abstract doKYCOnImage(f: File)
}
