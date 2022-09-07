import { User_Insert_Input } from "../../src/gql/sdk"
import { EDGE_STATUS, UserType, RiskParams } from "../../src/lib/types"
import { DEFAULT_RECOMMENDATION_RISK_PARAMS } from "../../src/lib/constant"
import { CircleFixtures } from "./exampleCircleAccounts"

type User = User_Insert_Input
type EdgeTuple = [string, string, number]

// REFACTOR to user-input type
export const LENDER1: User = {
  id: CircleFixtures.registeredUserIds[1],
  phone: "1234",
  first_name: "rick",
  last_name: "sanchez",
  email: "rick@galaxy.io",
  user_type: "lender",
  kyc_approved: true,
  demographic_info: {
    education_years: 50,
    income: 400000.0,
    credit_score: 1200,
    address: {
      line1: "somePlace 8",
      line2: "",
      postalCode: "40000",
      city: "Berlin",
      district: "MA",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 1000,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "DE31100400480532013000",
      bankAddress: {
        city: "Berlin",
        country: "DE",
        line1: "",
        line2: "",
        district: "MA",
        postalCode: "01234",
      },
    },
    circle: CircleFixtures.accounts[CircleFixtures.registeredUserIds[1]],
  },
}

export const LENDER2: User = {
  id: CircleFixtures.registeredUserIds[2],
  first_name: "summer",
  last_name: "smith",
  phone: "1234",
  email: "summer@highschool.io",
  user_type: "lender",
  kyc_approved: true,
  demographic_info: {
    education_years: 5,
    income: 400.0,
    credit_score: 500,
    address: {
      line1: "somePlace 8",
      line2: "",
      postalCode: "40000",
      district: "MA",
      city: "Boston",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "BE71096123456769",
      bankAddress: {
        city: "Brussels",
        country: "BE",
        line1: "",
        line2: "",
        district: "MA",
        postalCode: "01234",
      },
    },
    circle: CircleFixtures.accounts[CircleFixtures.registeredUserIds[2]],
  },
  balance: 200,
}

export const BORROWER1: User = {
  id: CircleFixtures.registeredUserIds[0],
  phone: "1234",
  first_name: "morty",
  last_name: "smith",
  email: "morty@galaxy.io",
  user_type: "borrower",
  kyc_approved: true,
  demographic_info: {
    education_years: 3,
    income: 300,
    credit_score: 450,
    address: {
      line1: "somePlace 8",
      line2: "",
      postalCode: "40000",
      district: "MA",
      city: "Boston",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 10,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "DE89370400440532013000",
      bankAddress: {
        city: "Kassel",
        country: "DE",
        line1: "street 1",
        line2: "",
        district: "",
        postalCode: "01234",
      },
    },
    circle: CircleFixtures.accounts[CircleFixtures.registeredUserIds[0]],
    // THIS WOULD BE THERE IF THE USER HAS OPTED IN TO OUR CREDIT PROFILE APP
    // algorand: {
    //   address: "SOMEADDRESS"
    // }
  },
}

export const SUPPORTER1: User = {
  id: "970dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "noobnoob",
  email: "noob@galaxy.io",
  phone: "1234",
  user_type: "lender",
  kyc_approved: true,
  demographic_info: {
    education_years: 10,
    income: 400.0,
    credit_score: 800,
    address: {
      line1: "somePlace 8",
      line2: "",
      postalCode: "40000",
      city: "Boston",
      district: "MA",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 200,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "AT483200000012345864",
      bankAddress: {
        city: "Vienna",
        country: "AT",
        line1: "",
        line2: "",
        district: "MA",
        postalCode: "01234",
      },
    },
    rcAccount: {
      investor_id: "INDV-22136",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}

export const SUPPORTER2: User = {
  id: "988dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "birdperson",
  email: "birdperson@galaxy.io",
  phone: "4321",
  user_type: "lender",
  kyc_approved: true,
  demographic_info: {
    education_years: 10,
    income: 600.0,
    credit_score: 800,
    address: {
      line1: "somePlace 8",
      line2: "",
      postalCode: "40000",
      city: "Boston",
      district: "MA",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 400,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "FI1410093000123458",
      bankAddress: {
        city: "Helsinki",
        country: "FI",
        line1: "",
        line2: "",
        district: "MA",
        postalCode: "01234",
      },
    },
    rcAccount: {
      investor_id: "INDV-22137",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}

export const SUPPORTER3: User = {
  id: "880dca39-f591-4ad4-b5fd-d1ba4fe55954",
  first_name: "scrunchy",
  last_name: "Scrunch",
  email: "scrunchy@galaxy.io",
  phone: "4321scrunch",
  user_type: "lender",
  kyc_approved: true,
  demographic_info: {
    education_years: 1,
    income: 100.0,
    credit_score: 300,
    address: {
      line1: "somePlace 8",
      line2: "",
      city: "Boston",
      postalCode: "40000",
      district: "MA",
      country: "US",
    },
    gender: "MALE",
    dob: "",
    father: {
      firstName: "dad",
      lastName: "DY",
    },
    aadharPassword: "123",
  },
  balance: 400,
  account_details: {
    bankDetails: {
      bankName: "TESTBANK",
      accountNumber: "123",
      branchCode: "ifsc-code",
      routingNumber: "",
      accountType: "CURRENT",
      iban: "EE471000001020145685",
      bankAddress: {
        city: "Tallin",
        country: "EE",
        line1: "",
        line2: "",
        district: "MA",
        postalCode: "01234",
      },
    },
    rcAccount: {
      investor_id: "INV-22348",
      accountNumber: "",
      branchCode: "FIXED",
    },
  },
}
