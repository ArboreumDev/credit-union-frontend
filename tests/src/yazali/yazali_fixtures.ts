const DEFAULT_TENOR = 6

// to be stored on yazali.data
export type FarmerData = {
  info: FarmerBaseInfo
  kyc: boolean
  terms: LoanTerms
}

// minimal Info to define a farmer
export type FarmerBaseInfo = {
  name: string
  phone: string
  acres: number
}

export type LoanTerms = {
  principal: number
  interest: number
  tenor: number
}

export const acresToLoanTerms = (acres: number) => {
  const principal = acres * 5000
  const interest = principal * 0.1
  return {
    principal,
    interest,
    tenor: DEFAULT_TENOR,
  } as LoanTerms
}

export const get_otp = () => {
  return Math.floor(Math.random() * 1000000000).toString()
}

export const FARMER1: FarmerBaseInfo = {
  name: "f1",
  phone: "1234567",
  acres: 6,
}

export const FARMER2: FarmerBaseInfo = {
  name: "f2",
  phone: "2345678",
  acres: 8,
}
