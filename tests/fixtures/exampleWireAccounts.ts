import { BankAccountDetails } from "gql/wallet/circle_client"

export const exampleWireAccounts = [
  {
    title: "US Bank Account",
    name: "Satoshi Nakamoto",
    billingAddress: {
      city: "Boston",
      country: "US",
      line1: "100 Money Street",
      line2: "Suite 1",
      district: "MA",
      postalCode: "01234",
    },
    bankDetails: {
      bankName: "",
      accountNumber: "11111111111",
      routingNumber: "121000248",
      branchCode: "",
      iban: "",
      bankAddress: {
        city: "",
        country: "US",
        line1: "",
        line2: "",
        district: "",
        postalCode: "",
      },
    },
  },
  {
    title: "German Bank Account",
    name: "Satoshi Nakamoto",
    billingAddress: {
      city: "Boston",
      country: "US",
      line1: "100 Money Street",
      line2: "Suite 1",
      district: "MA",
      postalCode: "01234",
    },
    bankDetails: {
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      iban: "DE31100400480532013000",
      bankAddress: {
        city: "Kassel",
        country: "DE",
        line1: "",
        line2: "",
        district: "",
        postalCode: "",
      },
    },
  },
  {
    title: "Mexican Bank Account",
    name: "Satoshi Nakamoto",
    billingAddress: {
      city: "Boston",
      country: "US",
      line1: "100 Money Street",
      line2: "Suite 1",
      district: "MA",
      postalCode: "01234",
    },
    bankDetails: {
      bankName: "Banco Nacional de México",
      accountNumber: "002010077777777771",
      routingNumber: "BDEMMXMF",
      iban: "",
      bankAddress: {
        city: "México DF",
        country: "MX",
        line1: "Isabel la Católica 165",
        line2: "Colonia Obrera",
        district: "México DF",
        postalCode: "06800",
      },
    },
  },
]
export const exampleDepositAccounts = [
  {
    owner: "CIRCLE INTERNET FINANCIAL INC",
    bankDetails: {
      bankName: "CRYPTO BANK",
      swiftCode: "CRYPTO99",
      routingNumber: "999999999",
      accountNumber: "1000000001",
      iban: "",
      branchCode: "",
      bankAddress: {
        line1: "1 MONEY STREET",
        line2: "",
        city: "NEW YORK",
        country: "US",
        district: "",
        postalCode: "1001",
      },
    },
  } as BankAccountDetails,
]
