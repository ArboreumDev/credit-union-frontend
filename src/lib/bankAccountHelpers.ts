import { BankDetails } from "../gql/wallet/circle_client"

export const instructionsToBankDetails = (beneficiaryBank) => {
  return {
    bankName: beneficiaryBank.name,
    swiftCode: beneficiaryBank.swiftCode,
    routingNumber: beneficiaryBank.routingNumber,
    accountNumber: beneficiaryBank.accountNumber,
    iban: "",
    branchCode: "",
    bankAddress: {
      line1: beneficiaryBank.address,
      line2: "",
      city: beneficiaryBank.city,
      country: beneficiaryBank.country,
      district: "",
      postalCode: beneficiaryBank.postalCode,
    },
  } as BankDetails
}
